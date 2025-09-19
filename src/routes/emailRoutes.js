const express = require('express');
const { sendEmail } = require('../controllers/emailController');
const { validateEmail } = require('../middleware/validation');
const emailRateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/contact', emailRateLimiter, validateEmail, sendEmail);

router.post('/test', (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  
  // Check if body is parsed
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Body not parsed',
      headers: req.headers,
      rawBody: req.rawBody // This might not exist, but trying
    });
  }
  
  res.json({
    receivedBody: req.body,
    headers: req.headers
  });
});
module.exports = router;