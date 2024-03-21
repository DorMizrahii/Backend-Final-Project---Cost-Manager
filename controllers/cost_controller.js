// Developers:
// First name: Nir, Dor, Yamit
// Last name: Katz, Mizarhi, Segev
// ID:   206361883 , 315429175 , 206776486

const CostItem = require("../models/cost_model");
const User = require("../models/user_model");
const categories = require("../const"); // Adjust the path as necessary

// POST Request
exports.addCostItem = async (req, res) => {
  try {
    const userExist = await User.findOne({ id: req.body.user_id });

    // User not exist
    if (!userExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Create a new cost item using the request body
    const newCostItem = new CostItem(req.body);
    await newCostItem.save();
    const newCostItemObject = newCostItem.toObject();

    // Delete _id and __v properties from the plain JavaScript object
    delete newCostItemObject._id;
    delete newCostItemObject.__v;

    // Send a success response with the created cost item
    res.status(201).send(newCostItemObject);

    // Error Handling
  } catch (error) {
    // Distinguish between validation errors (400) and other unexpected errors (500)
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error",
        error: error.message,
      });
    } else {
      // Internal Server Error response
      return res.status(500).send({
        message: "Internal server error",
        error: "An unexpected error occurred",
      });
    }
  }
};

// GET Request
exports.getReport = async (req, res) => {
  try {
    // Requesting params
    const { user_id, year, month } = req.query;

    // Find the first user matches the user_id
    const userExist = await User.findOne({
      id: req.query.user_id,
    });

    // User not exist
    if (!userExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Retrieve costs for a specific user, year, and month, then organize them into a report grouped by category.
    const costs = await CostItem.find({ user_id, year, month });
    const reports = categories.reduce((acc, category) => {
      acc[category] = costs
        .filter((cost) => cost.category === category)
        .map(({ day, description, sum }) => ({ day, description, sum }));
      return acc;
    }, {});

    // Send a success response with the report cost item
    res.status(200).send(reports);

    // Error Handling
  } catch (error) {
    // Distinguish between validation errors (400) and other unexpected errors (500)
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error",
        error: error.message,
      });
    } else {
      // Internal Server Error response
      return res.status(500).send({
        message: "Internal server error",
        error: "An unexpected error occurred",
      });
    }
  }
};
