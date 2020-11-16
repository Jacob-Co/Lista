const serverSERouter = require('express').Router();

const User = require('../models/users');

// Store open connections here
const userIds = {};

serverSERouter.get('/stream', async (req, res) => {
  const token = req;
  if (!token) return res.status(400).json({ error: "requirs token" });
  const user = User.findById(token.id);
  if (!user) return res.status(400).json({ error: 'user not found' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.socket.on('end', e => {
    delete userIds[user.id]
    console.log(`Remaining: ${Object.keys(userIds)}`)
  });
  userIds[user.id] = res;
  console.log(Object.keys(userIds))
  return res.status(200).json({ success: 'Server side connection established' });
})

module.exports = serverSERouter;