const User = require("../models/userModel");

//POST Request
exports.createUser = async (req, res) => {
  try {
    // Create a new user item using the request body
    const newUser = new User(req.body);
    const newUserData = await newUser.save();
    const userDataObject = newUserData.toObject();

    // Delete _id and __v properties from the plain JavaScript object
    delete userDataObject._id;
    delete userDataObject.__v;

    // Send a success response with the created user
    res.status(201).send({
      message: "User successfully created",
      data: userDataObject,
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
