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

const validUsername = (username) => {
  return !username.match(/\s/)
}

userRouter.post('/', async (req, res) => {
  const { body } = req;

  if (!validPassword(body.password)) {
    return res.status(400).json({ error: 'invalid password, must be 6 characters, with a number and no space' });
  } else if (!validUsername(body.username)) {
    return res.status(400).json({ error: 'invalid username, must be unique and have no whitespaces'});
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

userRouter.post('/addFriend', async (req, res) => {
  const { body } = req;
  const { token } = req;
  if (!token) return res.status(401).json({ error: 'Invalid or missing token'});

  const friendUser = await User.findOne({username: body.username});
  if (!friendUser) return res.status(401).json({ error: 'No user found with that username'});

  const user = await User.findById(token.id);
  if (user.friends.includes(friendUser.id)) return res.status(401).json({ error: 'Already friends with that user'})
  user.friends = user.friends.concat(friendUser.id);
  friendUser.friends = friendUser.friends.concat(user.id);
  await user.save();
  await friendUser.save();

  res.json({ message: `${body.username} was successfully added`});
})

userRouter.get('/friends', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: 'Invalid or missing token'});

  const user = await User.findById(token.id)
    .populate('friends', {username: 1});
  res.json(user.friends)
})

module.exports = userRouter;