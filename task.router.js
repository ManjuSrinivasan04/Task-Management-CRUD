const express = require('express')
const router = express.Router()
const taskController = require('./task.controller');
// Retrieve all users
router.get('/', taskController.findAll);
// Create a new user
router.post('/', taskController.create);
// Retrieve a single user with id
router.get('/:id', taskController.findOne);
// Update a user with id
router.put('/:id', taskController.update);
// Delete a user with id
router.delete('/:id', taskController.delete);

module.exports = router;