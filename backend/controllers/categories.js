const categoryRouter = require('express').Router();
const Category = require('../models/category');

categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find({})
  res.json(categories);
});

categoryRouter.post('/', async (req, res) => {
  const { body } = req;
  const newCategory = new Category({ ...body });
  const returnedCategory = newCategory.save();
  res.json(returnedCategory);
})