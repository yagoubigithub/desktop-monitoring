const mongoose = require("mongoose");
const     ObjectId =  mongoose.Schema.ObjectId;





const ProjectSchema = new mongoose.Schema({
    
   
   
   userId : { type : ObjectId, ref: 'User' },
  
    name : {
        type : String,
        required : true,
    },

    desc : {
        type : String ,
        max : 500
    }
  ,
    employees : [ { type : ObjectId, ref: 'Employee' }]

   
  
}, {timestamps : true})

module.exports = mongoose.model("Project", ProjectSchema)