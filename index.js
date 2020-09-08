let express =require('express');
let app=express();
let bodyParser=require('body-parser');
let mongoose=require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port=5000;


mongoose.connect("mongodb://localhost:27017/Tasks-mongoose",(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb");
    
});

app.get('/',(req,res)=>{
    res.send("And now you are in Home Page");
});

// Require Users routes
const taskRoutes = require('./task.router')
// using as middleware
app.use('/api/tasks', taskRoutes);

const projectRoutes = require('./project.router');
app.use('/api/projects', projectRoutes)

app.listen(port,()=>{
    console.log("App is running on port ",port);
});