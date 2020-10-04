const updateNoteRouter = require('express').Router()
const UpdateNote = require('../models/updateNote')
const Task = require('../models/task')

updateNoteRouter.post('/', async (req, res) => {
  const { body } = req

  if (body.task) {
    const task = await Task.findById(body.task)
    task.updateNotes = task.updateNotes.concat(body.task)
    await task.save()
  }

  const newNote = new UpdateNote({ ...body });
  const returnedNote = await newNote.save();
  res.status(201).json(returnedNote)
})

updateNoteRouter.get('/', async (req, res) => {
  const allNotes = await UpdateNote.find({})
  res.status(200).json(allNotes);
})

module.exports = updateNoteRouter
