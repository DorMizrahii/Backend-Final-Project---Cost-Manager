const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { getReport, addCostItem } = require("../controllers/costController");
const {
  getAllDevelopers,
  createDeveloper,
} = require("../controllers/developerController");

//GET Routes
router.get("/about", getAllDevelopers);
router.get("/report", getReport);

//POST Routes
router.post("/addcost", addCostItem);
router.post("/createUser", createUser);
router.post("/createDeveloper", createDeveloper);

module.exports = router;
