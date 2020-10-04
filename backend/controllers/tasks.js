const taskRouter = require('express').Router();
const Task = require('../models/task');
const Category = require('../models/category');

taskRouter.post('/', async (req, res) => {
  const { name, content, category, endDate, recurring } = req.body;
  const newTask = new Task({ name, content, category, endDate, recurring });
  const returnedTask = await newTask.save();

  if (category) {
    const categoryToUpdate = await Category.findById(category);
    categoryToUpdate.tasks = categoryToUpdate.tasks.concat(returnedTask.id);
    await categoryToUpdate.save();
  }

  res.status(201).json(returnedTask);
})

taskRouter.get('/', async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json(allTasks)
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
  const filter = { _id: req.params.id }
  const modifier = { name: req.body.name }
  const options = { new: true }
  const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
  res.status(202).json(updatedTask)
})

taskRouter.patch('/content/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modifier = { content: req.body.content }
  const options = { new: true }
  const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
  res.status(202).json(updatedTask)
})

taskRouter.patch('/accomplished/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modifier = { accomplished: req.body.accomplished }
  const options = { new: true }
  const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
  res.status(202).json(updatedTask)
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
