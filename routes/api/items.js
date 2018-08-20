const express = require('express');
const router = express.Router();

// Item model
const Item = require("../../models/item");

// @route GET api/items
// @des  Get All Items
// @access  Public
router.get('/', (req, res) => {
   Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route Post api/items
// @des  Create an Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
      name: req.body.name
  });
  
  newItem.save().then(item => res.json(item));
});


// @route Delete api/items/:id
// @desc  Delete an Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;