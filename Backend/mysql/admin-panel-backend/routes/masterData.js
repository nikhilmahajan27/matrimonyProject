const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all master data entries
router.get('/:category', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM master_data WHERE category = ?', [req.params.category]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new master data entry
router.post('/', async (req, res) => {
  const { category, name, status } = req.body;
  try {
    const [result] = await db.query('INSERT INTO master_data (category, name, status) VALUES (?, ?, ?)', [category, name, status]);
    res.status(201).json({ id: result.insertId, category, name, status });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a master data entry
router.put('/:id', async (req, res) => {
  const { category, name, status } = req.body;
  try {
    await db.query('UPDATE master_data SET category = ?, name = ?, status = ? WHERE id = ?', [category, name, status, req.params.id]);
    res.json({ id: req.params.id, category, name, status });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a master data entry
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM master_data WHERE id = ?', [req.params.id]);
    res.json({ message: 'Master data entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
