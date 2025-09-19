const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Nodemailer error
  if (err.code === 'ECONNECTION' || err.code === 'EAUTH') {
    return res.status(500).json({
      success: false,
      message: 'Email service temporarily unavailable. Please try again later.'
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  });
};

module.exports = errorHandler;