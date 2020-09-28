const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => console.log('Connected to MongoDB'));

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;