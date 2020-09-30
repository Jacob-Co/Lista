const mongoose = require('mongoose');

const updateNoteSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
  },
  date: {
    type: Date,
    required: true,
  }
});

updateNoteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const updateNote = mongoose.model('UpdateNote', updateNoteSchema);

module.exports = updateNote;
