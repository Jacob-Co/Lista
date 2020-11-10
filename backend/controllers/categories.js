const categoryRouter = require('express').Router();
const { json } = require('express');
const Category = require('../models/category');
const Task = require('../models/task');
const User = require('../models/users');

const fixDisplayedCategories = async (categories, message) => {
  categories = categories.sort((category1, category2) => {
    return category1.index - category2.index
  });

  if (!categories[0] || !categories[0].workingOn || categories[0].index != 0) {
    const nullCategory = new Category({ 
      name: `--${message}--`,
      index: 0,
      extraInfo: 'placeHolder'
    });
    categories = [nullCategory].concat(categories)
  };

  let returnCategories = [];
  for (const category of categories) {
    if (category.taskWorkingOn) await category.populate('taskWorkingOn').execPopulate();
    category.tasks = category.tasks.sort((task1, task2) => task1.index - task2.index);
    returnCategories = returnCategories.concat(category);
  }

  return returnCategories;
}

categoryRouter.get('/', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});

  let categories = await Category.find({ user: token.id})
  const returnCategories = await fixDisplayedCategories(categories, 'Double click an item to place here');

  res.status(200).json(returnCategories);
});

categoryRouter.get('/friend/:id', async (req,res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});
  
  const friend = await User.findById(req.params.id);
  if (!friend.friends.some(id => id.toString() === token.id)) return res.status(400).json({ error: 'You are not friends' });
  
  let friendCategories = await Category.find({ user: friend._id});
  friendCategories = await fixDisplayedCategories(friendCategories, 'none');
  res.status(200).json(friendCategories)
})

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
  const categoryToDelete = await Category.findById(req.params.id);
  for (const taskId of categoryToDelete.tasks) {
    await Task.findByIdAndDelete(taskId);
  }
  await categoryToDelete.delete();
  res.status(204).end();
})

categoryRouter.patch('/name/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const { body } = req;

  const categoryToUpdate = await Category.findById(req.params.id);
  if (!categoryToUpdate) return res.status(400).json({ "error": "No Category found"});
  if (categoryToUpdate.user.toString() !== token.id) return res.status(401).json({ "error": "Invalid access" });

  categoryToUpdate.name = body.name;
  const returnedCategory = await categoryToUpdate.save();
  return res.json(returnedCategory);
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
  const returnCategory = await updatedCategory.populate('tasks').execPopulate();
  return res.json(returnCategory);
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

  const returnCategory = await newWorkingOn.populate('tasks').execPopulate();
  return res.json(returnCategory);
})

categoryRouter.patch('/taskWorkingOn/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const { taskId } = req.body;

  const categoryToUpdate = await Category.findById(req.params.id);

  if (!categoryToUpdate) return json.status(400).json({ "error": "No Category found"})

  if (taskId === null) {
    categoryToUpdate.taskWorkingOn = null;
    const returnCategory = await categoryToUpdate.save();
    return res.json(returnCategory);
  } else if (categoryToUpdate.tasks.find(task => task._id.toString() === taskId)) {
    categoryToUpdate.taskWorkingOn = taskId;
    const returnCategory = await categoryToUpdate.save();
    return res.json(returnCategory);
  }

  return res.status(400).json({'error': 'taskId not found'});
})

categoryRouter.patch('/accomplished/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const { body } = req;

  const categoryToUpdate = await Category.findById(req.params.id);
  if (!categoryToUpdate) return res.status(400).json({ "error": "No Category found"});
  if (categoryToUpdate.user.toString() !== token.id) return res.status(401).json({ "error": "Invalid access" });

  categoryToUpdate.accomplished = body.accomplished;
  const returnCategory = await categoryToUpdate.save();

  return res.json(returnCategory);
});

categoryRouter.patch('/sentTo/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const { body } = req;

  const categoryToUpdate = await Category.findById(req.params.id);
  if (!categoryToUpdate) return res.status(400).json({ "error": "No Category found"});
  if (categoryToUpdate.user.toString() !== token.id) return res.status(401).json({ "error": "Invalid access" });

  categoryToUpdate.sentTo = body.sentTo;
  const returnCategory = await categoryToUpdate.save();

  return res.json(returnCategory);
});

module.exports = categoryRouter