const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all packages
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM packages');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new package
router.post('/', async (req, res) => {
  const { name, features } = req.body;
  try {
    const [result] = await db.query('INSERT INTO packages (name, features) VALUES (?, ?)', [name, features]);
    res.status(201).json({ id: result.insertId, name, features });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a package
router.put('/:id', async (req, res) => {
  const { name, features } = req.body;
  try {
    await db.query('UPDATE packages SET name = ?, features = ? WHERE id = ?', [name, features, req.params.id]);
    res.json({ id: req.params.id, name, features });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a package
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM packages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
