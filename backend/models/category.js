const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  summary: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number,
    default: null,
  },
  sentToIndex: {
    type: Number,
    default: null
  },
  sentToWorkingOn: {
    type: Boolean,
    default: false,
  },
  workingOn: {
    type: Boolean,
    default: false,
  },
  taskWorkingOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  extraInfo: {
    type: String,
    default: null
  },
  accomplished: {
    type: Boolean,
    default: false,
  },
  isSentTask: {
    type: Boolean,
    default: false,
  },
  sentTaskOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sentTaskOwnerUsername: String,
  originalTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

categorySchema.pre('find', function (next) {
  this.populate('tasks')
  next()
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
