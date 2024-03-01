const Developer = require("../models/developerModel");

//GET Request
exports.getAllDevelopers = async (req, res) => {
  let message = "";
  try {
    //find all the developers without _id __v properties
    const allDevelopers = await Developer.find().select("-_id -__v");

    // Send a success response with fetching all developers
    res.status(200).send(allDevelopers);
    
    // Send an error response if the fetching developers fails
  } catch (error) {
    res.status(500).send({
      message: "Developers fetch failed",
      error: error.message,
    });
  }
};
