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
  },
  overdue: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: null,
  },
  recurring: new mongoose.Schema({
    isDate: {
      type: Boolean,
      default: null
    },
    isInstructional: {
      type: Boolean,
      default: null
    },
    value: [{
      type: Number // if isDate [date], if is Instructional [day, week, month]
    }],
  }),
  updateNotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UpdateNote'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  index: {
    type: Number,
    default: null
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
