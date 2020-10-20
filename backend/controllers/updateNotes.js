const updateNoteRouter = require('express').Router()
const UpdateNote = require('../models/updateNote')
const Task = require('../models/task')
const updateNote = require('../models/updateNote')

updateNoteRouter.post('/', async (req, res) => {
  const { token } = req;

  if (!token) return res.status(401).json({ error: "Requires a token"})

  const { body } = req

  const newNote = new UpdateNote({ ...body, user: token.id });
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

updateNoteRouter.patch('/content/id', async (req, res) => {
  const filter = { id: req.params.id }
  const modifier = { content: req.body.content }
  const options = { new: true }
  const modUpdateNote = await UpdateNote.findByIdAndUpdate(filter, modifier, options)
  res.send(203).json(modUpdateNote)
})

// updateNoteRouter.patch('/task/id', async (req, res) => {
//   const updateNoteToUpdate = await UpdateNote.findById(req.params.id)
//   const { body } = req

//   if (updateNoteToUpdate.task) {
//     if (updateNoteToUpdate.task.toString() === body.task) res.sendStatus(406).end()

//     const prevTask = await Task.findById(updateNoteToUpdate.task)
//     prevTask.updateNotes = prevTask.updateNotes.filter(updateNote => {
//       return updateNote.toString() != updateNoteToUpdate.id
//     })
//     await prevTask.save()
//   }

//   const newTask = await Task.findById(body.task)
//   newTask.updateNotes = newTask.updateNotes.concat(req.params.id)
//   await newTask.save()

//   updateNoteToUpdate.task = body.task
//   const returnedUpdateNote = updateNoteToUpdate.save()
//   res.send(203).json(returnedUpdateNote)
// })

module.exports = updateNoteRouter
