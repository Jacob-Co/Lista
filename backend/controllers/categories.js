const categoryRouter = require('express').Router();
const Category = require('../models/category');

categoryRouter.get('/', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});

  const categories = await Category.find({ user: token.id})
  res.status(200).json(categories);
});

categoryRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const returnedCategory = await Category.findById(id);
  res.status(201).json(returnedCategory);
})

categoryRouter.post('/', async (req, res) => {
  const { token } = req;

  if (!token) return res.status(401).json({ error: "Requires a token"})

  const { name, summary } = req.body;
  
  const newCategory = new Category({ name, summary, user: token.id });
  const returnedCategory = await newCategory.save();

  res.status(201).json(returnedCategory);
})

categoryRouter.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
  res.status(204).end();
})

categoryRouter.patch('/name/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modify = { name: req.body.name }
  const options = { new: true }
  const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
  res.status(202).json(returnedCategory);
})

categoryRouter.patch('/summary/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modify = { summary: req.body.summary }
  const options = { new: true }
  const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
  res.status(201).json(returnedCategory);
})

module.exports = categoryRouter