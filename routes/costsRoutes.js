const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { getReport, addCostItem } = require("../controllers/costController");
const {
  getAllDevelopers,
  createDeveloper,
} = require("../controllers/developerController");
const { validateRequest } = require("../helper");

//GET Routes
router.get("/about", getAllDevelopers);
router.get("/report", getReport);

//POST Routes
router.post("/addcost",validateRequest,addCostItem);
router.post("/createUser", createUser);//TO REMOVE
router.post("/createDeveloper", createDeveloper);//TO REMOVE

module.exports = router;
