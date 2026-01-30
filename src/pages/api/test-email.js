const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  try {
    console.log('Testing nodemailer...');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.verify();
    res.status(200).json({ success: true, message: 'Nodemailer is working!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}