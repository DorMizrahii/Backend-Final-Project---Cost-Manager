const Developer = require("../models/developer_model");

//GET Request
exports.getAllDevelopers = async (req, res) => {
  try {
    //find all the developers without _id __v properties
    const allDevelopers = await Developer.find().select("-_id -__v");

    // Send a success response with fetching all developers
    res.status(307).send(allDevelopers);

    // Send an error response if the fetching developers fails
  } catch (error) {
    res.status(500).send({
      message: "Developers fetch failed",
      error: error.message,
    });
  }
};
