const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');

const categoryRouter = require('./controllers/categories')
const taskRouter = require('./controllers/tasks')
const updateNoteRouter = require('./controllers/updateNotes')
const dateRouter = require('./controllers/dates');
const loginRouter = require('./controllers/login');
const config = require('./utils/config')
const { errorHandler } = require('./utils/middleware');

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
app.use('/api/categories', categoryRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/updateNotes', updateNoteRouter)
app.use('/api/dates', dateRouter)
app.use('/api/login', loginRouter);
app.use(errorHandler)

module.exports = app;