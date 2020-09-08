const express = require('express')
const router = express.Router()
const projectController = require('./project.controller');
// Retrieve all users
router.get('/', projectController.findAll);
// Create a new user
router.post('/', projectController.create);
// Retrieve a single user with id
router.get('/:id', projectController.findOne);
// Update a user with id
router.put('/:id', projectController.update);
// Delete a user with id
router.delete('/:id', projectController.delete);

module.exports = router;