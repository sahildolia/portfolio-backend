const rateLimit = require('express-rate-limit');

const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 3 requests per window
  message: {
    success: false,
    message: 'Too many contact attempts. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = emailRateLimiter;