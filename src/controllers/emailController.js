const { validationResult } = require('express-validator');
const emailService = require('../services/emailService');

const sendEmail = async (req, res, next) => {
  // console.log("req::::::::::::::::::", req);
  
  try {
    // Check for validation errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Validation failed' 
      });
    }

    const { name, email, subject, message } = req.body;
console.log("name, email, subject, message :::::::::::::::::::::::: ", name, email, subject, message);
    // Send email
    await emailService.sendContactEmail(name, email, subject, message);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendEmail
};