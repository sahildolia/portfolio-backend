const rateLimit = require('express-rate-limit');

const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3, 
  message: {
    success: false,
    message: 'Too many contact attempts. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = emailRateLimiter;