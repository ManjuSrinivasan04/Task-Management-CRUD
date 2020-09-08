const Project = require('./project');
let mongoose=require('mongoose');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
Project.find()
  .then(projects => {
  res.send(projects);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of Project."
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
const project = new Project({
    "project_name":req.body.project_name,
    "description":req.body.description,
    "project_id":new mongoose.Types.ObjectId()
});

// Save user in the database
project.save()
  .then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new Project."
});
});
};

// Find a single User with a id
exports.findOne = (req, res) => {
 Project.findById(req.params.id)
  .then(project => {
  if(!project) {
   return res.status(404).send({
   message: "Project not found with id " + req.params.id
 });
}
 res.send(project);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "Project not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting user with id " + req.params.id
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
Project.findByIdAndUpdate(req.params.id, {
    "project_name":req.body.project_name,
    "description":req.body.description,
    "project_id":new mongoose.Types.ObjectId()
}, {new: true})
.then(project => {
 if(!project) {
   return res.status(404).send({
   message: "Project not found with id " + req.params.id
 });
}
res.send(project);
}).catch(err => {
if(err.kind === 'ObjectId') {
  return res.status(404).send({
  message: "Project not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Error updating user with id " + req.params.id
});
});
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
Project.findByIdAndRemove(req.params.id)
.then(project => {
if(!project) {
  return res.status(404).send({
  message: "Project not found with id " + req.params.id
});
}
res.send({message: "Project deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "Project not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete project with id " + req.params.id
});
});
};