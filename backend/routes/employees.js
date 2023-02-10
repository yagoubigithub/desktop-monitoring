const express = require("express");
const { create, getEmployees , signin  ,getEmployee , getProjects} = require("../controllers/employee");
const { requireSignin } = require("../controllers/user");
const { employeeSignupValidator } = require("../validator");
const router = express.Router();


router.get("/:userId",requireSignin, getEmployees);
router.get("/employee/:employeeId",requireSignin, getEmployee);

router.get("/projects/:employeeId/:email",requireSignin, getProjects);




router.post("/:userId",employeeSignupValidator, requireSignin,create);

router.post("/employee/signin", signin);
module.exports = router;