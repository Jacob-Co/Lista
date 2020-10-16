const dateRouter = require("express").Router();

dateRouter.get("/", (req, res) => {
  const date = Date.now();
  res.status(200).json({ date })
})

module.exports = dateRouter;