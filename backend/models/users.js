const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  cateogries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  updateNotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UpdateNote',
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // returnedObject.friends = returnedObject.friends.map(toString);
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
