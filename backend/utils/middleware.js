const errorHandler = (e, req, res, next) => {
  console.log(e.message)
  
  res.sendStatus(400).json({ "error": e.message })

  next(e);
};

module.exports = { errorHandler }