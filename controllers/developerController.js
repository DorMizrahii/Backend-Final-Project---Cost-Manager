const Developer = require("../models/developerModel");

//POST Request
exports.createDeveloper = async (req, res) => {
  try {
    // Create a new developer using the request body
    const newDeveloper = new Developer(req.body);
    await newDeveloper.save();

    // Send a success response with the created developer
    res.status(201).send({
      message: "Developer successfully created",
      data: newDeveloper,
    });

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
exports.getAllDevelopers = async (req, res) => {
  let message = "";
  try {
    //find all the developers without _id __v properties
    const AllDevelopers = await Developer.find().select("-_id -__v");

    if (!AllDevelopers) message = "No developers found!";
    else message = "Developers fetched successfully";

    // Send a success response with fetching all developers
    res.status(200).send({
      message,
      data: AllDevelopers,
    });
    // Send an error response if the fetching developers fails
  } catch (error) {
    res.status(500).send({
      message: "Developers fetch failed",
      error: error.message,
    });
  }
};
