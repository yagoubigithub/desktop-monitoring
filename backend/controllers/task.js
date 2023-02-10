const Task = require("../models/Task");

const Employee = require("../models/Employee")
const mongoose = require("mongoose");

const { errorHandler } = require("../helpers/dbErrorHandler");


exports.create = (req, res) => {
  const employee_id = req.params.employee_id;

  
  const _id =  new mongoose.Types.ObjectId();
  const task = new Task({_id, ...req.body, employee_id});
 
  task.save((err,task)=>{
     if(err) {
        return res.status(400).json({
           err : errorHandler(err)
        })
     }

  Employee.findOneAndUpdate({
        _id : req.params.employee_id
       } , {
         $push : {
           tasks : _id
         },
         returnNewDocument : true,
       }).then( async (employee)=>{
        res.status(200).json({
            employee 
         })
       }).catch(err=>{
           console.log(err)
       })

    

  })
};


exports.getTasks =  async (req, res)=>{
  try {
    const tasks = await Task.find({ employee_id:  req.params.employee_id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
  
}



exports.getTask =  async (req, res) => {
  console.log("🚀 ~ file: task.js:57 ~ exports.getTask= ~ req", req.params)
 
  
  try {
     Task.findOne({_id : req.params.taskId}).populate("times").
     exec(function (err, task) {
     
      if(err) {
        console.log("🚀 ~ file: task.js:65 ~ err", err)
        
 
  
        return res.status(400).json({
           err : errorHandler(err)
        })
     }
     console.log(task)
     res.status(200).json(task);


     });;
   
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
  
}



