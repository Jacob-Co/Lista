const taskRouter = require('express').Router();
const Task = require('../models/task');

// taskRouter.post('/', async (req, res) => {
//   const { body } = req;
//   const newTask = new Task({ ...body });
//   const returnedTask = await newTask.save();
//   res.status(201).json(returnedTask);
// })

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

module.exports = taskRouter
