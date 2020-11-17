const serverSERouter = require('express').Router();
const User = require('../models/users');
const userIds = require('../utils/SSEUserIds')

// Store open connections here
let accessCodes = [];

const generateRandomCode = () => {
  const randomCodes = [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
  ]

  let code = '';
  for ( let i = 0; i < 8; i++) {
    const rand1 = Math.floor(Math.random() * 3);
    const rand2 = Math.floor(Math.random() * 10);
    code += randomCodes[rand1][rand2];
  }

  return code;
}

serverSERouter.get('/requestStream', async (req, res) => {
  const token = req;
  if (!token) return res.status(400).json({ error: "requires token" });
  const user = User.findById(token.id);
  if (!user) return res.status(400).json({ error: 'user not found' });

  const code = generateRandomCode()
  accessCodes = accessCodes.concat(code)

  return res.status(200).json({ success: 'Server side connection established', code });
})

serverSERouter.get('/stream/:code/:username', (req, res) => {
  const code = req.params.code;
  let isCorrectCode = false;
  accessCodes = accessCodes.filter(accessCode => {
    if (accessCode !== code) return true;
    isCorrectCode = true;
    return false
  });

  if (!isCorrectCode) return res.status(400).json({ error: 'wrong code'});

  const username = req.params.username;

  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  }
  res.writeHead(200, headers);
  res.socket.on('end', e => {
    delete userIds[username]
    console.log(`Remaining: ${Object.keys(userIds)}`)
  });
  userIds[username] = res;
  console.log(Object.keys(userIds))
})

module.exports = serverSERouter;