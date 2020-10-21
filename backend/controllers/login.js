const loginRouter = require('express').Router();
const bycrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/users');

loginRouter.post('/', async (req, res) => {
  const { body } = req;
  const user = await User.findOne({ username: body.username});
  const passwordCorrect = user === null
    ? false
    : await bycrypt.compare(body.password, user.passwordHash);

  if (!user || !passwordCorrect) {
    return res.status(401).json({ error: "Invalid username or password"})
  }

  const userToken = {
    username: user.username,
    id: user.id,
  }

  const token = jsonwebtoken.sign(userToken, process.env.SECRET);
  res.send({ token, username: user.username, name: user.name});
})

module.exports = loginRouter;
