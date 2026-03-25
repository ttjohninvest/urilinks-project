const nodemailer = require('nodemailer');

// Create a transporter object using 100webspace's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'mail.gmx.com',
  port: 587,
  secure: false,
  auth: {
    user: 'john.mcgovern@gmx.com',
    pass: '123ZXc12%$%$%'
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false // Use only for testing; avoid in production
  }
});

// Email options
const mailOptions = {
  from: 'john.mcgovern@gmx.com',
  to: 'johmcg64@gmail.com',
  subject: 'Test Email from Node.js',
  text: 'Hello, this is a test email sent via Node.js using 100webspace.com.',
  // Use 'html' instead of 'text' for HTML content
  // html: '<h1>Hello</h1><p>This is an HTML email.</p>',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});   