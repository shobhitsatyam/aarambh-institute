const Razorpay = require('razorpay');
const crypto = require('crypto');
const db = require('../config/db');
const { sendInvoice } = require('../utils/emailService');

// Lazy initializer for Razorpay SDK to handle missing env variables gracefully
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) must be set in environment variables.');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};

/**
 * @desc    Create Razorpay Order with server-side price validation
 * @route   POST /api/payment/create-order
 * @access  Private (Authenticated Students)
 */
exports.createOrder = async (req, res) => {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Student ID missing from token.' });
    }

    const { itemId, itemType, receipt } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: 'Missing required field: itemId.' });
    }

    const parsedItemId = parseInt(itemId, 10);
    if (isNaN(parsedItemId) || parsedItemId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid itemId. Must be a positive integer.' });
    }

    if (!itemType || typeof itemType !== 'string') {
      return res.status(400).json({ success: false, message: 'Missing required field: itemType.' });
    }

    // Normalize itemType
    let normalizedItemType = itemType.trim().toLowerCase();
    if (normalizedItemType === 'fee') {
      normalizedItemType = 'fee_installment';
    }

    const validItemTypes = ['course', 'material', 'fee_installment'];
    if (!validItemTypes.includes(normalizedItemType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid itemType "${itemType}". Allowed types: course, material, fee_installment.`
      });
    }

    let itemPrice = 0;
    let itemName = '';

    // 1. Server-side price lookup and ownership/eligibility checks
    if (normalizedItemType === 'course') {
      const [courseRows] = await db.execute(
        'SELECT id, title, price, is_free FROM courses WHERE id = ?',
        [parsedItemId]
      );

      if (courseRows.length === 0) {
        return res.status(404).json({ success: false, message: 'Course not found.' });
      }

      const course = courseRows[0];
      if (course.is_free) {
        return res.status(400).json({ success: false, message: 'This course is free. No purchase required.' });
      }

      const [purchased] = await db.execute(
        'SELECT id FROM purchased_courses WHERE student_id = ? AND course_id = ?',
        [studentId, parsedItemId]
      );

      if (purchased.length > 0) {
        return res.status(400).json({ success: false, message: 'You have already purchased this course.' });
      }

      itemPrice = Number(course.price);
      itemName = course.title;

    } else if (normalizedItemType === 'material') {
      const [materialRows] = await db.execute(
        'SELECT id, title, price, is_free FROM study_materials WHERE id = ?',
        [parsedItemId]
      );

      if (materialRows.length === 0) {
        return res.status(404).json({ success: false, message: 'Study material not found.' });
      }

      const material = materialRows[0];
      if (material.is_free) {
        return res.status(400).json({ success: false, message: 'This study material is free. No purchase required.' });
      }

      const [purchased] = await db.execute(
        'SELECT id FROM purchased_materials WHERE student_id = ? AND material_id = ?',
        [studentId, parsedItemId]
      );

      if (purchased.length > 0) {
        return res.status(400).json({ success: false, message: 'You have already purchased this study material.' });
      }

      itemPrice = Number(material.price);
      itemName = material.title;

    } else if (normalizedItemType === 'fee_installment') {
      const [installmentRows] = await db.execute(
        'SELECT id, amount, status, student_id FROM fee_installments WHERE id = ? AND student_id = ?',
        [parsedItemId, studentId]
      );

      if (installmentRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Fee installment not found or does not belong to the authenticated student.'
        });
      }

      const installment = installmentRows[0];
      if (installment.status === 'Paid') {
        return res.status(400).json({ success: false, message: 'This fee installment has already been paid.' });
      }

      itemPrice = Number(installment.amount);
      itemName = `Fee Installment #${installment.id}`;
    }

    if (isNaN(itemPrice) || itemPrice <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid item price configured on server.' });
    }

    // Convert INR price to paise (1 INR = 100 paise)
    const amountPaise = Math.round(itemPrice * 100);
    const orderReceipt = receipt ? String(receipt).slice(0, 40) : `rcpt_${studentId}_${Date.now()}`;

    // 2. Create Razorpay order with server-calculated amount
    const razorpay = getRazorpayInstance();
    const orderOptions = {
      amount: amountPaise,
      currency: 'INR',
      receipt: orderReceipt,
      notes: {
        studentId: String(studentId),
        itemId: String(parsedItemId),
        itemType: normalizedItemType,
        itemName: itemName.slice(0, 40)
      }
    };

    const order = await razorpay.orders.create(orderOptions);
    if (!order || !order.id) {
      return res.status(500).json({ success: false, message: 'Failed to create order with payment gateway.' });
    }

    // 3. Record order intent in payments audit table
    try {
      const [userRows] = await db.execute('SELECT email FROM users WHERE id = ?', [studentId]);
      const studentEmail = userRows.length > 0 ? userRows[0].email : (req.user?.email || null);

      await db.execute(
        `INSERT INTO payments
         (student_id, user_email, razorpay_order_id, item_type, item_id, amount, amount_paise, currency, status, receipt)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'INR', 'created', ?)`,
        [studentId, studentEmail, order.id, normalizedItemType, parsedItemId, itemPrice, amountPaise, orderReceipt]
      );
    } catch (insertError) {
      // Log orphan Razorpay order ID and sanitized error details for audit & reconciliation without raw SQL or unnecessary details
      const safeErrorCode = (typeof insertError?.code === 'string' && /^[A-Z0-9_]+$/i.test(insertError.code))
        ? insertError.code
        : 'UNKNOWN_DB_ERROR';
      console.error(
        `[ORPHAN ORDER AUDIT] Razorpay order created but failed to persist in payments table. OrderID: "${order.id}", ErrorCode: "${safeErrorCode}", Error: "Database insertion failure"`
      );
      throw insertError;
    }

    return res.json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('[DATABASE SCHEMA ERROR] Missing table during order creation:', error.sqlMessage);
      return res.status(503).json({
        success: false,
        message: 'Payment service unavailable: required database tables are not initialized. Please run database migrations.',
        errorDetail: error.sqlMessage
      });
    }

    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error creating payment order.' });
  }
};

/**
 * @desc    Verify Razorpay payment, enforce idempotency, and unlock content
 * @route   POST /api/payment/verify
 * @access  Private (Authenticated Students)
 */
exports.verifyPayment = async (req, res) => {
  let connection = null;

  try {
    const studentId = req.user?.id;
    if (!studentId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Student ID missing from token.' });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      itemId,
      itemType
    } = req.body;

    // Validate types and presence
    if (
      typeof razorpay_order_id !== 'string' ||
      typeof razorpay_payment_id !== 'string' ||
      typeof razorpay_signature !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment parameters: razorpay_order_id, razorpay_payment_id, and razorpay_signature must be non-empty strings.'
      });
    }

    const cleanOrderId = razorpay_order_id.trim();
    const cleanPaymentId = razorpay_payment_id.trim();
    const cleanSignature = razorpay_signature.trim();

    if (!cleanOrderId || !cleanPaymentId || !cleanSignature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required Razorpay parameters: razorpay_order_id, razorpay_payment_id, and razorpay_signature cannot be empty.'
      });
    }

    // Format validation: length limits and expected Razorpay prefixes/structures
    const orderIdRegex = /^order_[a-zA-Z0-9]{6,40}$/;
    if (!orderIdRegex.test(cleanOrderId)) {
      return res.status(400).json({
        success: false,
        message: 'Malformed razorpay_order_id: expected prefix "order_" followed by alphanumeric characters.'
      });
    }

    const paymentIdRegex = /^pay_[a-zA-Z0-9]{6,40}$/;
    if (!paymentIdRegex.test(cleanPaymentId)) {
      return res.status(400).json({
        success: false,
        message: 'Malformed razorpay_payment_id: expected prefix "pay_" followed by alphanumeric characters.'
      });
    }

    const signatureRegex = /^[a-fA-F0-9]{64}$/;
    if (!signatureRegex.test(cleanSignature)) {
      return res.status(400).json({
        success: false,
        message: 'Malformed razorpay_signature: expected 64-character hexadecimal HMAC-SHA256 digest.'
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'Server configuration error: Razorpay secret is not set.' });
    }

    // 1. Timing-safe Signature Verification
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${cleanOrderId}|${cleanPaymentId}`)
      .digest('hex');

    const signatureBuffer = Buffer.from(cleanSignature, 'utf8');
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature.' });
    }

    // 2. Fetch payment record from Razorpay API to verify status and amount
    const razorpay = getRazorpayInstance();
    let razorpayPayment;
    try {
      razorpayPayment = await razorpay.payments.fetch(cleanPaymentId);
    } catch (fetchError) {
      console.error('Error fetching payment from Razorpay API:', fetchError);
      return res.status(400).json({
        success: false,
        message: 'Unable to verify payment with Razorpay gateway.'
      });
    }

    if (!razorpayPayment) {
      return res.status(400).json({ success: false, message: 'Payment record not found on Razorpay.' });
    }

    if (razorpayPayment.order_id !== cleanOrderId) {
      return res.status(400).json({ success: false, message: 'Payment order ID does not match the verification request.' });
    }

    if (razorpayPayment.currency !== 'INR') {
      return res.status(400).json({ success: false, message: 'Payment currency mismatch.' });
    }

    if (razorpayPayment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: `Payment is not captured. Current gateway status: ${razorpayPayment.status}.`
      });
    }

    // 3. Begin MySQL transaction for atomic verification, ownership check & fulfillment
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 3a. Lock order record in payments table FOR UPDATE
    const [paymentRows] = await connection.execute(
      'SELECT * FROM payments WHERE razorpay_order_id = ? FOR UPDATE',
      [cleanOrderId]
    );

    if (paymentRows.length === 0) {
      await connection.rollback();
      connection.release();
      connection = null;
      return res.status(404).json({ success: false, message: 'Order record not found in system.' });
    }

    const paymentRecord = paymentRows[0];

    // Ownership check: Order must belong to authenticated student
    if (paymentRecord.student_id !== studentId) {
      await connection.rollback();
      connection.release();
      connection = null;
      return res.status(403).json({ success: false, message: 'Forbidden: Payment order does not belong to your account.' });
    }

    // Optional validation against payload if supplied
    if (itemType && typeof itemType === 'string') {
      let normalizedPayloadType = itemType.trim().toLowerCase();
      if (normalizedPayloadType === 'fee') normalizedPayloadType = 'fee_installment';
      if (normalizedPayloadType !== paymentRecord.item_type) {
        await connection.rollback();
        connection.release();
        connection = null;
        return res.status(400).json({ success: false, message: 'Item type mismatch for this order.' });
      }
    }

    if (itemId !== undefined && itemId !== null) {
      const parsedVerifyItemId = parseInt(itemId, 10);
      if (isNaN(parsedVerifyItemId) || parsedVerifyItemId !== paymentRecord.item_id) {
        await connection.rollback();
        connection.release();
        connection = null;
        return res.status(400).json({ success: false, message: 'Item ID mismatch for this order.' });
      }
    }

    // Check captured amount matches recorded order amount (in paise)
    if (Number(razorpayPayment.amount) !== Number(paymentRecord.amount_paise)) {
      await connection.rollback();
      connection.release();
      connection = null;
      return res.status(400).json({ success: false, message: 'Captured amount does not match recorded order price.' });
    }

    // Idempotency check 1: Has this order already been captured/fulfilled?
    if (paymentRecord.status === 'captured') {
      await connection.rollback();
      connection.release();
      connection = null;
      return res.json({
        success: true,
        message: 'Payment has already been verified and processed.',
        alreadyProcessed: true
      });
    }

    // Idempotency check 2: Has this payment ID already been credited to another order?
    const [existingPayment] = await connection.execute(
      'SELECT id FROM payments WHERE razorpay_payment_id = ? AND id != ? FOR UPDATE',
      [cleanPaymentId, paymentRecord.id]
    );

    if (existingPayment.length > 0) {
      await connection.rollback();
      connection.release();
      connection = null;
      return res.status(400).json({ success: false, message: 'This payment ID has already been credited to another transaction.' });
    }

    // 4. Fulfillment by item_type
    let itemName = 'Aarambh Institute Content';
    const targetItemId = paymentRecord.item_id;
    const verifiedAmount = Number(paymentRecord.amount);

    if (paymentRecord.item_type === 'course') {
      const [existingCourse] = await connection.execute(
        'SELECT id FROM purchased_courses WHERE student_id = ? AND course_id = ? FOR UPDATE',
        [studentId, targetItemId]
      );

      if (existingCourse.length === 0) {
        await connection.execute(
          'INSERT INTO purchased_courses (student_id, course_id, price_paid) VALUES (?, ?, ?)',
          [studentId, targetItemId, verifiedAmount]
        );
      }

      const [courses] = await connection.execute('SELECT title FROM courses WHERE id = ?', [targetItemId]);
      if (courses.length > 0) itemName = courses[0].title;

    } else if (paymentRecord.item_type === 'material') {
      const [existingMaterial] = await connection.execute(
        'SELECT id FROM purchased_materials WHERE student_id = ? AND material_id = ? FOR UPDATE',
        [studentId, targetItemId]
      );

      if (existingMaterial.length === 0) {
        await connection.execute(
          'INSERT INTO purchased_materials (student_id, material_id, amount_paid) VALUES (?, ?, ?)',
          [studentId, targetItemId, verifiedAmount]
        );
      }

      const [materials] = await connection.execute('SELECT title FROM study_materials WHERE id = ?', [targetItemId]);
      if (materials.length > 0) itemName = materials[0].title;

    } else if (paymentRecord.item_type === 'fee_installment') {
      const [installments] = await connection.execute(
        'SELECT id, amount, status FROM fee_installments WHERE id = ? AND student_id = ? FOR UPDATE',
        [targetItemId, studentId]
      );

      if (installments.length === 0) {
        await connection.rollback();
        connection.release();
        connection = null;
        return res.status(404).json({ success: false, message: 'Fee installment record not found.' });
      }

      const installment = installments[0];
      const receiptNo = `REC-${cleanPaymentId.slice(-8).toUpperCase()}`;

      if (installment.status !== 'Paid') {
        await connection.execute(
          'UPDATE fee_installments SET status = "Paid", receipt_no = ? WHERE id = ? AND student_id = ?',
          [receiptNo, targetItemId, studentId]
        );

        // Update student_fees balances
        const [feeResult] = await connection.execute(
          'UPDATE student_fees SET paid_amount = paid_amount + ?, pending_amount = GREATEST(0, pending_amount - ?) WHERE student_id = ?',
          [verifiedAmount, verifiedAmount, studentId]
        );

        // If student_fees record did not exist yet, insert a baseline record
        if (feeResult.affectedRows === 0) {
          await connection.execute(
            'INSERT INTO student_fees (student_id, total_fee, paid_amount, pending_amount) VALUES (?, ?, ?, 0)',
            [studentId, verifiedAmount, verifiedAmount]
          );
        }
      }

      itemName = `Fee Installment #${targetItemId}`;

    } else {
      await connection.rollback();
      connection.release();
      connection = null;
      return res.status(400).json({ success: false, message: 'Unsupported item type for fulfillment.' });
    }

    // 5. Update payments audit record to captured status
    await connection.execute(
      `UPDATE payments
       SET status = 'captured', razorpay_payment_id = ?, razorpay_signature = ?
       WHERE id = ?`,
      [cleanPaymentId, cleanSignature, paymentRecord.id]
    );

    // Commit transaction
    await connection.commit();
    connection.release();
    connection = null;

    // 6. Asynchronous Invoice Email (Email failure must NOT rollback payment)
    try {
      const [userRows] = await db.execute('SELECT full_name, email FROM users WHERE id = ?', [studentId]);
      if (userRows.length > 0) {
        const user = userRows[0];
        sendInvoice(user.email, user.full_name, itemName, paymentRecord.item_type, verifiedAmount, cleanPaymentId)
          .catch((emailErr) => {
            console.error('[EMAIL ERROR] Failed to send payment invoice email:', emailErr?.message || emailErr);
          });
      }
    } catch (emailFetchErr) {
      console.error('[EMAIL ERROR] Error fetching user profile for invoice email:', emailFetchErr);
    }

    return res.json({
      success: true,
      message: 'Payment verified and content unlocked!'
    });

  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rbError) {
        console.error('Error rolling back transaction:', rbError);
      }
      connection.release();
      connection = null;
    }

    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('[DATABASE SCHEMA ERROR] Missing table during payment verification:', error.sqlMessage);
      return res.status(503).json({
        success: false,
        message: 'Payment service unavailable: required database tables are not initialized. Please run database migrations.',
        errorDetail: error.sqlMessage
      });
    }

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'You have already purchased this item.' });
    }

    console.error('Error verifying payment:', error);
    return res.status(500).json({ success: false, message: 'Server Error verifying payment.' });
  }
};
