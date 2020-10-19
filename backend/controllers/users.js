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

  if (!validPassword) {
    return res.status(400).json({ error: 'invalid password length' });
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