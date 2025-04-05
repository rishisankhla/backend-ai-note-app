import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Note } from './models/note.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get notes for a specific user
app.get('/api/notes/:email', async (req, res) => {
  try {
    const notes = await Note.find({ userEmail: req.params.email });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new note
app.post('/api/notes', async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});