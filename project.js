let mongoose = require('mongoose');
let projectSchema=new mongoose.Schema({     
   project_name:
   {
    type:String,
    required:true
   },
   description:
   {
       type:String,
       required:true
   },

  project_id:
  {
      type:mongoose.Schema.Types.ObjectId,
      required:true
  }
});

module.exports=mongoose.model("Project",projectSchema);
