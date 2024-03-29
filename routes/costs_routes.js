// Developers:
// First name: Nir, Dor, Yamit
// Last name: Katz, Mizrahi, Segev
// ID:   206361883 , 315429175 , 206776486

const express = require("express");
const router = express.Router();
const { getReport, addCostItem } = require("../controllers/cost_controller");
const { getAllDevelopers } = require("../controllers/developer_controller");
const { validateRequest, validateRequestParams } = require("../helper");

// GET Routes
router.get("/about", getAllDevelopers);
router.get("/report", validateRequestParams, getReport);

// POST Routes
router.post("/addcost", validateRequest, addCostItem);

module.exports = router;
