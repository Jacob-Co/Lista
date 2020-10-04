const updateNoteRouter = require('express').Router()
const UpdateNote = require('../models/updateNote');

updateNoteRouter.post('/', async (req, res) => {
  const { body } = req
  const newNote = new UpdateNote({ ...body });
  const returnedNote = await newNote.save();
  res.status(201).json(returnedNote)
})

updateNoteRouter.get('/', async (req, res) => {
  const allNotes = await UpdateNote.find({})
  res.status(200).json(allNotes);
})

module.exports = updateNoteRouter
