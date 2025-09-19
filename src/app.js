const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit  = require('express-rate-limit');
const errorHandler  = require('./middleware/errorHandler');

const emailRoutes   = require('./routes/emailRoutes');

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.Frontend_URL || 'http://localhost:5173/',
    credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many contact attempts. Please try again later.'
  }
});
app.use('/api/email', limiter); 

app.use('/api/email', emailRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;