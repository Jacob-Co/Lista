const updateNoteRouter = require('express').Router()
const UpdateNote = require('../models/updateNote')
const Task = require('../models/task')

updateNoteRouter.post('/', async (req, res) => {
  const { body } = req

  const newNote = new UpdateNote({ ...body });
  const returnedNote = await newNote.save();

  if (body.task) {
    const task = await Task.findById(body.task)
    task.updateNotes = task.updateNotes.concat(returnedNote.id)
    await task.save()
  }

  res.status(201).json(returnedNote)
})

updateNoteRouter.delete('/:id', async (req, res) => {
  const updateNoteToDelete = await UpdateNote.findById(req.params.id)

  if (updateNoteToDelete.task) {
    const task = await Task.findById(updateNoteToDelete.task)
    task.updateNotes = task.updateNotes.filter(updateNote => {
      return updateNote.toString() != updateNoteToDelete.id
    });
    await task.save()
  }

  const deletedUpdateNote = await UpdateNote.findByIdAndRemove(req.params.id)
  res.sendStatus(204).end();
})

updateNoteRouter.get('/', async (req, res) => {
  const allNotes = await UpdateNote.find({})
  res.status(200).json(allNotes);
})

module.exports = updateNoteRouter
