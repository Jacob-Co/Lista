const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  content: String,
  accomplished: {
    type: Boolean,
    default: false,
    required: true,
  },
  overdue: {
    type: Boolean,
    default: false,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  endDate: Date,
  content: String,
  reminderAvailable: {
    type: Boolean,
    default: false,
  },
  reminder_time: Date,
  recurringDateAvailable: {
    type: Boolean,
    default: false,
  },
  recurringInstructionsAvailable: {
    type: Boolean,
    default: false,
  },
  recurringValue: [{
    type: Number
  }],
  updateNotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UpdateNote'
  }
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
