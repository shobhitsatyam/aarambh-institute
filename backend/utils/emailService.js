const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
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

module.exports = { sendOTP };
