const taskRouter = require('express').Router();
const Task = require('../models/task');
const Category = require('../models/category');
const User = require('../models/users');
const SSEUserIds = require('../utils/SSEUserIds');
const utils = require('./utils');
const { update } = require('../models/task');

const genericPatchHelper = async (propertyToUpdate, req) => {
  const { token } = req;
  if (!token) return { error: "Requires a token"};

  const { body } = req;

  const taskToUpdate = await Task.findById(req.params.id);
  const categoryOfTask = await Category.findById(taskToUpdate.category)
  if (!taskToUpdate) return { "error": "No Task found"};
  if (taskToUpdate.user.toString() !== token.id &&
      categoryOfTask.sentTo.toString() !== token.id) {
      return { "error": "Invalid access" }
  }

  taskToUpdate[propertyToUpdate] = body[propertyToUpdate];
  const returnCategory = await taskToUpdate.save();

  return returnCategory;
}

taskRouter.post('/', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: 'Requires Token'});

  const { name, content, category, endDate, recurring, index } = req.body;
  const newTask = new Task({ name, content, category, endDate, recurring, user: token.id, index });
  const returnedTask = await newTask.save();

  if (category) {
    const categoryToUpdate = await Category.findById(category);
    categoryToUpdate.tasks = categoryToUpdate.tasks.concat(returnedTask.id);
    await categoryToUpdate.save();
  }

  // const user = await User.findById(token.id);
  // user.tasks = user.tasks.concat(returnedTask.id);
  // await user.save();

  res.status(201).json(returnedTask);
})

taskRouter.get('/', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});

  const allTasks = await Task.find({user: token.id});
  res.status(200).json(allTasks)
})

taskRouter.patch('/index/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});

  const taskToUpdate = await Task.findById(req.params.id);
  if (!taskToUpdate || taskToUpdate.user.toString() !== token.id) return res.status(400);

  taskToUpdate.index = req.body.index;
  const returnTask = await taskToUpdate.save();
  return res.status(200).json(returnTask);
})

taskRouter.patch('/endDate/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modifier = { endDate: req.body.endDate }
  const options = { new: true }
  const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
  res.status(202).json(updatedTask)
})

taskRouter.patch('/recurring/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modifier = { recurring: req.body.recurring }
  const options = { new: true }
  const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
  res.status(202).json(updatedTask)
})

taskRouter.patch('/name/:id', async (req, res) => {
  const returnTask = await genericPatchHelper('name', req);
  if (returnTask.error) return res.status(400).json(returnTask);
  return res.json(returnTask);
})

taskRouter.patch('/content/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modifier = { content: req.body.content }
  const options = { new: true }
  const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
  res.status(202).json(updatedTask)
})

taskRouter.patch('/accomplished/:id', async (req, res) => {
  const returnTask = await genericPatchHelper('accomplished', req);
  if (returnTask.error) return res.status(400).json(returnTask);
  const returnCategory = await Category.findById(returnTask.category);

  if (returnCategory.sentTo) {
    await returnCategory.populate({ path: 'user', select: 'username' }).execPopulate();
    const username = returnCategory.user.username;
    if (SSEUserIds[username]) {
      const sentToRes = SSEUserIds[username];
      sentToRes.write(`data: re-initialize\n\n`);
      sentToRes.flush();
    }
  }

  return res.json(returnTask);
})

taskRouter.patch('/overdue/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modifier = { overdue: req.body.overdue }
  const options = { new: true }
  const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
  res.status(202).json(updatedTask)
})

taskRouter.patch('/category/:id', async (req, res) => {
  const taskToUpdate = await Task.findById(req.params.id)
  const newCategoryId = req.body.category;

  // check if there is a prev category
  if (taskToUpdate.category) {
    // return a 406 status if assigning to the same category
    if (taskToUpdate.category.toString() === newCategoryId) res.status(406).end();

    const prevCategory = await Category.findById(taskToUpdate.category);
    prevCategory.tasks = prevCategory.tasks
      .filter(taskId => taskId.toString() != taskToUpdate.id)
    await prevCategory.save();
  }

  // place task in new cateogry
  const newCategory = await Category.findById(newCategoryId);
  newCategory.tasks = newCategory.tasks.concat(taskToUpdate.id);
  await newCategory.save();

  taskToUpdate.category = newCategoryId;
  const updatedTask = await taskToUpdate.save()

  res.status(202).json(updatedTask)
})

taskRouter.patch('/sent/:id', async (req, res) => {
  const updatedTask = await genericPatchHelper('sentTo', req);
  if (updatedTask.error) return res.status(400).json(updatedTask);

  const { receiverId } = req.body;
  const receiverUser = await User.findById(receiverId);

  if (receiverUser) {
    await utils.incrementAllCategoriesByOne(receiverId);
    const { token } = req;
    const ownerUser = await User.findById(token.id);

    const newCategory = new Category({ 
      name: updatedTask.name,
      user: receiverId,
      index: 1,
      isSentTask: true,
      sentTaskOwnerId: token.id,
      sentTaskOwnerUsername: ownerUser.username,
      originalTaskId: req.params.id,
    });
    await newCategory.save();

    updatedTask.representativeCategoryId = newCategory._id;
    await updatedTask.save();

    const sentToRes = SSEUserIds[receiverUser.username];
    if (sentToRes) {
      sentToRes.write('data: re-initialize\n\n');
      sentToRes.flush();
    }
  } else {
    const representativeCategoryId = updatedTask.representativeCategoryId;
    const categoryToDelete = await Category.findById(representativeCategoryId)
      .populate('user');
    const receiverUsername = categoryToDelete.user.username;
    await Category.deleteOne({ _id: representativeCategoryId });
    const sentToRes = SSEUserIds[receiverUsername];

    if (sentToRes) {
      sentToRes.write('data: re-initialize\n\n');
      sentToRes.flush();
    }
    
    updatedTask.representativeCategoryId = null;
    await updatedTask.save();
  }

  return res.json(updatedTask);
});

taskRouter.delete('/:id', async (req, res) => {
  const taskToDelete = await Task.findById(req.params.id);
  
  if (taskToDelete.category) {
    const category = await Category.findById(taskToDelete.category)
    category.tasks = category.tasks.filter(task => task.toString() != taskToDelete.id)
    await category.save()
  }

  await Task.findByIdAndRemove(req.params.id);
  res.sendStatus(204).end()
})

module.exports = taskRouter
