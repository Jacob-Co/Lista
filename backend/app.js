const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const categoryRouter = require('./controllers/categories')
const taskRouter = require('./controllers/tasks')
const updateNoteRouter = require('./controllers/updateNotes')
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
app.use('/api/categories', categoryRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/updateNotes', updateNoteRouter)

module.exports = app;