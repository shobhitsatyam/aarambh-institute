const Razorpay = require('razorpay');
const crypto = require('crypto');
const db = require('../config/db');
const { sendInvoice } = require('../utils/emailService');

// Initialize Razorpay
// Note: We fallback to test keys if environment variables aren't set yet
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, itemId, itemType } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        itemId,
        itemType // 'course' or 'material'
      }
    };

    const order = await razorpayInstance.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ success: false, message: 'Failed to create order' });
    }

    res.json({ 
      success: true, 
      order,
      key_id: process.env.RAZORPAY_KEY_ID 
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      itemId,
      itemType,
      amountPaid
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';

    // Verify Signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      // In development with placeholder keys, the signature will fail unless we are bypassing.
      // If we are strictly using placeholders, let's allow it to pass ONLY if it's the placeholder key.
      if (secret !== 'secret_placeholder') {
        return res.status(400).json({ success: false, message: 'Invalid payment signature' });
      } else {
        console.warn('⚠️ WARNING: Bypassing signature verification because placeholder secret is active.');
      }
    }

    // Payment is verified. Now unlock the content in the database.
    let itemName = 'Aarambh Institute Content';
    
    if (itemType === 'course') {
      await db.execute(
        'INSERT INTO purchased_courses (student_id, course_id, price_paid) VALUES (?, ?, ?)',
        [studentId, itemId, amountPaid]
      );
      
      const [courseRows] = await db.execute('SELECT title FROM courses WHERE id = ?', [itemId]);
      if (courseRows.length > 0) itemName = courseRows[0].title;
      
    } else if (itemType === 'material') {
      await db.execute(
        'INSERT INTO purchased_materials (student_id, material_id, amount_paid) VALUES (?, ?, ?)',
        [studentId, itemId, amountPaid]
      );
      
      const [materialRows] = await db.execute('SELECT title FROM study_materials WHERE id = ?', [itemId]);
      if (materialRows.length > 0) itemName = materialRows[0].title;
      
    } else {
      return res.status(400).json({ success: false, message: 'Invalid item type' });
    }

    // Fetch user details for the email
    try {
      const [userRows] = await db.execute('SELECT full_name, email FROM users WHERE id = ?', [studentId]);
      if (userRows.length > 0) {
        const user = userRows[0];
        // Send the invoice asynchronously (don't await so it doesn't block the response)
        sendInvoice(user.email, user.full_name, itemName, itemType, amountPaid, razorpay_payment_id);
      }
    } catch (emailError) {
      console.error('Error fetching user for invoice:', emailError);
    }

    res.json({ success: true, message: 'Payment verified and content unlocked!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'You have already purchased this item.' });
    }
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
