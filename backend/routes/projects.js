const express = require("express");
const router = express.Router();

const { create, getProjects  ,setEmployeesInProject ,  getProjectWithEmployees , addEmployee , getEmployeesInProject} = require("../controllers/project");
const { requireSignin } = require("../controllers/user");
const { projectSignupValidator } = require("../validator");



router.get("/:userId",requireSignin, getProjects);
router.get("/project/:userId/:projectId",requireSignin, getProjectWithEmployees);


router.post("/employee/:userId", requireSignin,addEmployee);



router.post("/:userId",projectSignupValidator, requireSignin,create);
//router.put("/employees/:projectId", requireSignin,setEmployeesInProject);
module.exports = router;


  