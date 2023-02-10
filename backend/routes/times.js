const express = require("express");
const router = express.Router();

const { create } = require("../controllers/time");
const { requireSignin } = require("../controllers/user");




 router.post("/:employeeId/:taskId" ,requireSignin ,  create);

   
  
 

module.exports = router;