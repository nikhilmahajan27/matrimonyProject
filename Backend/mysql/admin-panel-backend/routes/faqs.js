const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM faqs');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new FAQ
router.post('/', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const [result] = await db.query('INSERT INTO faqs (question, answer) VALUES (?, ?)', [question, answer]);
    res.status(201).json({ id: result.insertId, question, answer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a FAQ
router.put('/:id', async (req, res) => {
  const { question, answer } = req.body;
  try {
    await db.query('UPDATE faqs SET question = ?, answer = ? WHERE id = ?', [question, answer, req.params.id]);
    res.json({ id: req.params.id, question, answer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a FAQ
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
