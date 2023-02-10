const express = require("express");
const router = express.Router();

const { create  , getTasks , getTask} = require("../controllers/task");
const { requireSignin } = require("../controllers/user");
const { taskSignupValidator } = require("../validator");


router.get("/:employee_id/:projectId", requireSignin,getTasks);
router.get("/:taskId", requireSignin,getTask);



router.post("/:employee_id",taskSignupValidator, requireSignin,create);

module.exports = router;
