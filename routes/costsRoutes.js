const express = require("express");
const router = express.Router();
const { getReport, addCostItem } = require("../controllers/costController");
const { getAllDevelopers } = require("../controllers/developerController");
const { validateRequest, validateRequestParams } = require("../helper");

//GET Routes
router.get("/about", getAllDevelopers);
router.get("/report", validateRequestParams, getReport);

//POST Routes
router.post("/addcost", validateRequest, addCostItem);

module.exports = router;
