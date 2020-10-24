const categoryRouter = require('express').Router();
const Category = require('../models/category');

categoryRouter.get('/', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});

  let categories = await Category.find({ user: token.id})
  categories = categories.sort((category1, category2) => {
    return category1.index - category2.index
  });

  if (!categories[0] || !categories[0].workingOn) {
    const nullCategory = new Category({ 
      name: 'Place category that you are currently working on here',
      index: 0,
    });
    categories = [nullCategory].concat(categories)
  };
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

  const { name, summary, index } = req.body;
  
  const newCategory = new Category({ name, summary, user: token.id, index });
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

categoryRouter.patch('/index/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const categoryId = req.params.id;
  const newIndex = req.body.index;
  const filter = { user: token.id, _id: categoryId };
  const modify = { index: newIndex };
  const options = { new: true };
  const updatedCategory = await Category.findOneAndUpdate(filter, modify, options);
  if (!updatedCategory) return res.status(401).json({ error: "No category found"});
  return res.json(updatedCategory);
})

categoryRouter.patch('/workingOn/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});
  
  const filter2 = { user: token.id, workingOn: true };
  const modify2 = { index: 1, workingOn: false };
  const options = { new: true };
  const oldWorkingOn = await Category.findOneAndUpdate(filter2, modify2, options);

  const filter = { user: token.id, _id: req.params.id };
  const modify = { index: 0, workingOn: true };
  const newWorkingOn = await Category.findOneAndUpdate(filter, modify, options);

  res.json({ newWorkingOn, oldWorkingOn });
})

module.exports = categoryRouter