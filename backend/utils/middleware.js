const jsonwebtoken = require('jsonwebtoken')

const errorHandler = (e, req, res, next) => {
  console.log(e.message)
  
  res.status(400).json({ "error": e.message })

  next(e);
};

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null
}

const tokenExtractor = (req, res, next) => {
  const encodedToken = getTokenFrom(req)
  if (!encodedToken) return next();
  const decodedToken = jsonwebtoken.verify(encodedToken, process.env.SECRET);
  req.token = decodedToken;
  next();
}

module.exports = { errorHandler, tokenExtractor }