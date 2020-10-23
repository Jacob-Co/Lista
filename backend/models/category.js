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
  index: {
    type: Number,
    default: null,
  },
  workingOn: {
    type: Boolean,
    default: false,
  }
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
