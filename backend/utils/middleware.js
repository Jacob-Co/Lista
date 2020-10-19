const jsonwebtoken = require('jsonwebtoken')

const errorHandler = (e, req, res, next) => {
  console.log(e.message)
  
  res.status(400).json({ "error": e.message })

  next(e);
};

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.lowerCase().startWith('bearer ')) {
    return authorization.subString(7);
  }

  return null
}

const tokenExtractor = (req, res) => {
  const encodedToken = getTokenFrom(req)
  if (!encodedToken) next();
  const decodedToken = jsonwebtoken.verify(encodedToken, process.env.SECRET);
  req.token = decodedToken;
  next();
}

module.exports = { errorHandler, tokenExtractor }