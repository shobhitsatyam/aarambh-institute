const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendOTP = async (toEmail, otp, type) => {
  try {
    let subject = 'Your Aarambh Institute OTP';
    let text = `Your OTP is ${otp}. It will expire in 10 minutes.`;

    if (type === 'register') {
      subject = 'Welcome to Aarambh Institute - Verification OTP';
      text = `Thank you for registering! Your OTP is ${otp}. It is valid for 10 minutes.`;
    } else if (type === 'forgot_password') {
      subject = 'Aarambh Institute - Password Reset OTP';
      text = `You requested a password reset. Your OTP is ${otp}. It is valid for 10 minutes.`;
    }

    const mailOptions = {
      from: `"Aarambh Institute" <${process.env.EMAIL_USER || 'no-reply@aarambhinstitute.com'}>`,
      to: toEmail,
      subject: subject,
      text: text,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Aarambh Institute - OTP</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; color: #333333;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); max-width: 600px;">
                  
                  <!-- Header Area -->
                  <tr>
                    <td align="center" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 20px;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">Aarambh Institute</h1>
                      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Your Pathway to Excellence</p>
                    </td>
                  </tr>

                  <!-- Body Area -->
                  <tr>
                    <td style="padding: 40px 40px 30px 40px; text-align: center;">
                      <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px;">Authentication Required</h2>
                      <p style="margin: 0 0 30px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                        ${text.replace(otp, '')}
                      </p>
                      
                      <!-- OTP Box -->
                      <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; margin: 0 auto 30px auto; max-width: 300px;">
                        <span style="display: block; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Your Secure OTP</span>
                        <span style="display: block; font-size: 36px; font-weight: 900; color: #4f46e5; letter-spacing: 8px;">${otp}</span>
                      </div>

                      <p style="margin: 0; color: #ef4444; font-size: 14px; font-weight: bold;">
                        ⏱️ Valid for 10 minutes only
                      </p>
                    </td>
                  </tr>

                  <!-- Footer Area -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                      <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">If you didn't request this code, please ignore this email or contact support if you feel your account is at risk.</p>
                      <p style="margin: 0; color: #94a3b8; font-size: 12px;">&copy; ${new Date().getFullYear()} Aarambh Institute. All rights reserved.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    // Proceed to send the actual email via SMTP
    console.log(`[EMAIL DISPATCH] Sending OTP to ${toEmail}`);

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

const sendInvoice = async (toEmail, studentName, itemName, itemType, amount, transactionId) => {
  try {
    const date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    
    const mailOptions = {
      from: `"Aarambh Institute" <${process.env.EMAIL_USER || 'no-reply@aarambhinstitute.com'}>`,
      to: toEmail,
      subject: `Payment Successful - Invoice for ${itemName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Invoice</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #334155;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1); max-width: 600px;">
                  
                  <!-- Header -->
                  <tr>
                    <td align="center" style="background: linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%); padding: 40px 30px;">
                      <div style="background-color: rgba(255,255,255,0.2); width: 60px; height: 60px; border-radius: 50%; display: inline-block; line-height: 60px; margin-bottom: 15px;">
                        <span style="font-size: 30px;">✅</span>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800;">Payment Successful!</h1>
                      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Thank you for your purchase, ${studentName}.</p>
                    </td>
                  </tr>

                  <!-- Bill Details -->
                  <tr>
                    <td style="padding: 40px;">
                      
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                        <tr>
                          <td style="padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                            <p style="margin: 0; font-size: 12px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Transaction ID</p>
                            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #334155;">#${transactionId}</p>
                          </td>
                          <td align="right" style="padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                            <p style="margin: 0; font-size: 12px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">Date</p>
                            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #334155;">${date}</p>
                          </td>
                        </tr>
                      </table>

                      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px;">
                        <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px; border-bottom: 2px dashed #cbd5e1; padding-bottom: 15px;">Order Summary</h3>
                        
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding: 10px 0;">
                              <p style="margin: 0; font-size: 16px; color: #475569; font-weight: bold;">${itemName}</p>
                              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; text-transform: capitalize;">Type: ${itemType}</p>
                            </td>
                            <td align="right" style="padding: 10px 0; font-size: 16px; font-weight: bold; color: #1e293b;">
                              ₹${amount}
                            </td>
                          </tr>
                        </table>

                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-top: 2px solid #e2e8f0; padding-top: 15px;">
                          <tr>
                            <td style="font-size: 16px; font-weight: bold; color: #64748b;">Total Amount Paid</td>
                            <td align="right" style="font-size: 24px; font-weight: 900; color: #0ea5e9;">
                              ₹${amount}
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div style="margin-top: 30px; text-align: center;">
                        <a href="https://aarambhinstitute.com/student-dashboard" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);">Access Your Content</a>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                      <h2 style="margin: 0 0 5px 0; color: #334155; font-size: 18px; font-weight: 900; letter-spacing: 1px;">AARAMBH <span style="color: #4f46e5;">INSTITUTE</span></h2>
                      <p style="margin: 0 0 15px 0; color: #64748b; font-size: 13px;">Your Pathway to Excellence</p>
                      <p style="margin: 0; color: #94a3b8; font-size: 12px;">This is an auto-generated receipt. Please keep it for your records.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    console.log(`[EMAIL DISPATCH] Sending Invoice to ${toEmail}`);
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Invoice email sending failed:', error);
    return { success: false, error };
  }
};

module.exports = { sendOTP, sendInvoice };
