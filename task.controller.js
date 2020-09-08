const Task = require('./task');
let mongoose=require('mongoose');
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
Task.find()
  .then(tasks => {
  res.send(tasks);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of Tasks."
});
});
};

// Create and Save a new User
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}

// Create a new User
const task = new Task({
    "task_name":req.body.task_name,
    "description":req.body.description,
    "project_id":new mongoose.Types.ObjectId(),
    "createAt":req.body.createAt
});

// Save user in the database
task.save()
  .then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new Task."
});
});
};

// Find a single User with a id
exports.findOne = (req, res) => {
 Task.findById(req.params.id)
  .then(task => {
  if(!task) {
   return res.status(404).send({
   message: "Task not found with id " + req.params.id
 });
}
 res.send(task);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "Task not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting Task with id " + req.params.id
});
});
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}

// Find user and update it with the request body
Task.findByIdAndUpdate(req.params.id, {
    "task_name":req.body.task_name,
    "description":req.body.description,
    "project_id":new mongoose.Types.ObjectId(),
    "createAt":req.body.createAt
}, {new: true})
.then(task => {
 if(!task) {
   return res.status(404).send({
   message: "Task not found with id " + req.params.id
 });
}
res.send(task);
}).catch(err => {
if(err.kind === 'ObjectId') {
  return res.status(404).send({
  message: "Task not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Error updating Task with id " + req.params.id
});
});
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
Task.findByIdAndRemove(req.params.id)
.then(task => {
if(!task) {
  return res.status(404).send({
  message: "Task not found with id " + req.params.id
});
}
res.send({message: "Task deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "Task not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete Task with id " + req.params.id
});
});
};