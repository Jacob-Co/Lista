const errorHandler = (e, req, res, next) => {
  console.log(e.message)
  
  res.status(400).json({ "error": e.message })

  next(e);
};

module.exports = { errorHandler }