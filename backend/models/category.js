const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
  },
  summary: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  superCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
