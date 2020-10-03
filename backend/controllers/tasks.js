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

// taskRouter.patch('/endDate/:id', async (req, res) => {
//   const filter = { _id: req.params.id }
//   const modifier = { endDate: req.body.endDate }
//   const options = { new: true }
//   const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
//   res.status(202).json(updatedTask)
// })

// taskRouter.patch('/recurring/:id', async(req, res) => {
//   const filter = { _id: req.params.id }
//   const modifier = { recurring: req.body.recurring }
//   const options = { new: true }
//   const updatedTask = await Task.findOneAndUpdate(filter, modifier, options)
//   res.status(202).json(updatedTask)
// })

module.exports = taskRouter
