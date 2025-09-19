const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const verifyTransporter = async (transporter) => {
  try {
    await transporter.verify();
    console.log('Server is ready to take messages');
  } catch (error) {
    console.error('Error with transporter configuration:', error);
    throw error;
  }
};

module.exports = {
  createTransporter,
  verifyTransporter
};