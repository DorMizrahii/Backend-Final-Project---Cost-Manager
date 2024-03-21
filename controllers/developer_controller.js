// Developers:
// First name: Nir, Dor, Yamit
// Last name: Katz, Mizarhi, Segev
// ID:   206361883 , 315429175 , 206776486

const Developer = require("../models/developer_model");

// GET Request
exports.getAllDevelopers = async (req, res) => {
  try {
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
