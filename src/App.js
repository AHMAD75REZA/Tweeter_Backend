const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRouts');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);

const PORT = process.env.PORT || 5000;

// Remove deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error('Database connection error:', err));
