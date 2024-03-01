const CostItem = require("../models/costsItemModel");
const User = require("../models/userModel");
const { Categories } = require('../const'); // Adjust the path as necessary

//POST Request
exports.addCostItem = async (req, res) => {
  try {
    // Find the first user matches the user_id
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

    //Error Handling
    } catch (error) {
    // Distinguish between validation errors (400) and other unexpected errors (500)
    if (error.name === 'ValidationError') {
      // This assumes the error is a Mongoose validation error
      return res.status(400).send({
        message: "Validation error",
        error: error.message,
      });
    } else {
      // For other kinds of errors, send a 500 Internal Server Error response
      return res.status(500).send({
        message: "Internal server error",
        error: "An unexpected error occurred",
      });
    }
  }
};


//GET Request
exports.getReport = async (req, res) => {
  try {
    // Requesting params
    const { user_id, year, month } = req.query;

        // Find the first user matches the user_id
        const userExist = await User.findOne({
          id: req.query.user_id
        });

        // User not exist
        if (!userExist) {
          return res.status(404).send({
            message: "User not found",
          });
        }

    // Validation checks
    if (!user_id || !year || !month) {
      return res.status(400).send({
        message: "Missing required parameters. Please provide user_id, year, and month.",
      });
    }

    if (!/^\d{4}$/.test(year)) {
      return res.status(400).send({
        message: "Invalid year format. Please provide a valid year (YYYY).",
      });
    }

    if (month < 1 || month > 12) {
      return res.status(400).send({
        message: "Invalid month. Please provide a valid month.",
      });
    }

    //user_id should be a numeric ID
    if (!/^\d+$/.test(user_id)) {
      return res.status(400).send({
        message: "Invalid user_id format. Please provide a numeric user_id.",
      });
    }

    // Retrieve costs for a specific user, year, and month, then organize them into a report grouped by category.
    const costs = await CostItem.find({ user_id, year, month });
    const reports = Categories.reduce((acc, category) => {
      acc[category] = costs
          .filter((cost) => cost.category === category)
          .map(({ day, description, sum }) => ({ day, description, sum }));
      return acc;
    }, {});

    // Send a success response with the report cost item
    res.status(201).send(reports);

    //Error Handling
    } catch (error) {
    // Distinguish between validation errors (400) and other unexpected errors (500)
    if (error.name === 'ValidationError') {
      // This assumes the error is a Mongoose validation error
      return res.status(400).send({
        message: "Validation error",
        error: error.message,
      });
    } else {
      // For other kinds of errors, send a 500 Internal Server Error response
      return res.status(500).send({
        message: "Internal server error",
        error: "An unexpected error occurred",
      });
    }
  }
};

