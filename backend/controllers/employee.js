
const Employee = require("../models/Employee")
const User = require("../models/user")
const {errorHandler} = require('../helpers/dbErrorHandler')

const jwt = require("jsonwebtoken") //to generate sign token
const expressJwt = require("express-jwt") // for authorization
const Project = require("../models/Project")


exports.create = (req, res) => {
   const userId = req.params.userId


   if(Employee .find({userId ,username  : req.body.username } ).length > 0){
      //return alredy exist

      return res.status(400).json({
         error : "username alredy  exist "
      })
   }else{

      const employee = new Employee({...req.body, userId});
   
  
   employee.save((err,employee)=>{
      if(err) {
         return res.status(400).json({
            err : errorHandler(err)
         })
      }

      employee.salt = undefined;
      employee.hashed_password = undefined;

      res.status(200).json({
         employee 
      })

   })
   }
   
}

exports.getEmployees =  async (req, res)=>{
    try {
   
        const employee = await Employee .find({userId : req.params.userId} )
        res.status(200).json(employee );
      } catch (err) {
         console.log(err)
        res.status(500).json(err);
      }
}

exports.getEmployee =  async (req, res)=>{
    try {
   
        const employee = await Employee .findOne({_id : req.params.employeeId} ).populate("tasks")
        res.status(200).json(employee );
      } catch (err) {
         console.log(err)
        res.status(500).json(err);
      }
}


exports.signin = (req, res) => {

//find employee based on email
const {email, password  , username} = req.body;

User.findOne({email } ,  (err , user)=>{
   if(err || !user){
      return res.status(400).json({
         error : "User with that  email doesn't exist "
      })
   }else{

      Employee.findOne({username ,  email}, (err, employee)=>{
         if(err || !employee){
            return res.status(400).json({
               error : "employee with that username doesn't exist "
            })
         }
      
         //if user is found make sure the email and password match
      
       
        
      
         if(!employee.authenticate(password)){
            return res.status(401).json({
               error : "Username and password don't match"
            });
      
         }
         // generate a signed token with employee id and secret
         const token  = jwt.sign({_id : employee._id}, process.env.JWT_SECRET);
      
         //pressist the token as 't' in cookiewith ewpiry date
         res.cookie("t", token, {expire : new Date() + 9999})
         // return token and employee to frontend client
      
         const {_id, name,username} = employee;
         return res.json({token ,email, employee: {_id,name,username } })
      
      
      
      
      
      })
   }


   
});


}



exports.getProjects =  async (req, res)=>{
   console.log(req.params)
  
   try {
  
      User.findOne({email : req.params.email } , async (err , user)=>{



         if(err || !user){
            return res.status(400).json({
               error : "User with that  email doesn't exist "
            })
         }else{

           const projects = await Project.find({userId : user._id ,  employees : {$in : [  req.params.employeeId]}})
           res.status(200).json(projects );
            

         }

      })

     
     } catch (err) {
        console.log(err)
       res.status(500).json(err);
     }
}

