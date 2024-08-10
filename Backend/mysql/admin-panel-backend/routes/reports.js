const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all reports
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reports');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new report
router.post('/', async (req, res) => {
  const { date, registrations, requests_sent, requests_accepted, requests_rejected } = req.body;
  try {
    const [result] = await db.query('INSERT INTO reports (date, registrations, requests_sent, requests_accepted, requests_rejected) VALUES (?, ?, ?, ?, ?)', 
      [date, registrations, requests_sent, requests_accepted, requests_rejected]);
    res.status(201).json({ id: result.insertId, date, registrations, requests_sent, requests_accepted, requests_rejected });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
