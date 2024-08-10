const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, status } = req.body;
  try {
    const [result] = await db.query('INSERT INTO users (name, email, status) VALUES (?, ?, ?)', [name, email, status]);
    res.status(201).json({ id: result.insertId, name, email, status });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { name, email, status } = req.body;
  try {
    await db.query('UPDATE users SET name = ?, email = ?, status = ? WHERE id = ?', [name, email, status, req.params.id]);
    res.json({ id: req.params.id, name, email, status });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
