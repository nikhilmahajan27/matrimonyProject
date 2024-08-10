const express = require('express');
const router = express.Router();
const MasterData = require('../models/MasterData');

// Get all master data entries
router.get('/:category', async (req, res) => {
  try {
    const data = await MasterData.find({ category: req.params.category });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new master data entry
router.post('/', async (req, res) => {
  const masterData = new MasterData(req.body);
  try {
    const newMasterData = await masterData.save();
    res.status(201).json(newMasterData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a master data entry
router.put('/:id', async (req, res) => {
  try {
    const masterData = await MasterData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(masterData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a master data entry
router.delete('/:id', async (req, res) => {
  try {
    await MasterData.findByIdAndDelete(req.params.id);
    res.json({ message: 'Master data entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
