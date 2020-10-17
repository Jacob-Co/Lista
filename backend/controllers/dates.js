const dateRouter = require("express").Router();

dateRouter.get("/", (req, res) => {
  const UNIX = Date.now();
  res.status(200).json({ UNIX })
})

module.exports = dateRouter;