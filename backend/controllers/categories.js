const categoryRouter = require('express').Router();
const Category = require('../models/category');

categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find({})
  res.status(201).json(categories);
});

categoryRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const returnedCategory = await Category.findById(id);
  res.status(201).json(returnedCategory);
})

categoryRouter.post('/', async (req, res) => {
  // Create a new Category
  const { body } = req;
  const newCategory = new Category({ ...body });
  const returnedCategory = await newCategory.save();

  // Add to new Cateogry to is superCateogy's subCategory
  if ( body.superCategory ) {
    const parentCategory = await Category.findById(body.superCategory);
    console.log(parentCategory.id)
    const parentSubCategories = parentCategory.subCategories;
    console.log(parentSubCategories)
    const modify = { subCategories: parentSubCategories.concat(returnedCategory.id)}
    await Category.findByIdAndUpdate(body.superCategory, modify)
  }

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
  res.status(201).json(returnedCategory);
})

categoryRouter.patch('/summary/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modify = { summary: req.body.summary }
  const options = { new: true }
  const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
  res.status(201).json(returnedCategory);
})

// categoryRouter.patch('/superCategory/:id', async (req, res) => {
//   const filter = { _id: req.params.id }
//   const modify = { superCategory: req.body.superCategory }
//   const options = { new: true }
//   const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
//   res.status(201).json(returnedCategory);
// })

module.exports = categoryRouter