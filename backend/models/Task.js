const mongoose = require("mongoose");

const     ObjectId =  mongoose.Schema.ObjectId;
const TaskSchema = new mongoose.Schema({
   
    name : {
        type : String,
        required : true,
    },
    time_spent : {

        type :  "Number",
        default : 0
    },

    desc : {
        type : String ,
        max : 500
    },
   
    status : {
        type : String ,
        default :  "To Do",
       
    },
    priority : {
        type : String 
        
    },
    index :  {
        type  : Number,
        default : 0
    },
    employee_id : { type : ObjectId, ref: 'Employee' },
    
    times : [ { type : ObjectId, ref: 'Time' }]
    
   
}, {timestamps : true})




module.exports = mongoose.model("Task", TaskSchema)
