const userRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/users');

const validPassword = (password) => {
  return (
    password.length >= 6 &&
    password.match(/\d/) &&
    !password.match(/\s/)
  )
}

userRouter.post('/', async (req, res) => {
  const { body } = req;

  if (!validPassword(body.password)) {
    return res.status(400).json({ error: 'invalid password, must be 6 characters, with a number and no space' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
})

module.exports = userRouter;