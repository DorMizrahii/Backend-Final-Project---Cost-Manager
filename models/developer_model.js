// Developers:
// First name: Nir, Dor, Yamit
// Last name: Katz, Mizrahi, Segev
// ID:   206361883 , 315429175 , 206776486

const mongoose = require("mongoose");
const { isValidEnglishName } = require("../helper");

// Creating a new Schema(collection) of developers
const developerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Developer property must include first name!"],
    validate: {
      validator: isValidEnglishName,
      message: (props) => `${props.value} is not a valid first name!`,
    },
  },

  lastname: {
    type: String,
    required: [true, "Developer property must include last name!"],
    validate: {
      validator: isValidEnglishName,
      message: (props) => `${props.value} is not a valid first name!`,
    },
  },

  id: {
    type: Number,
    required: [true, "Developer property must include ID!"],
  },

  email: {
    type: String,
    required: [true, "Developer property must include email!"],
    match: [
      // Check if the value is valid email
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
});

const Developer = mongoose.model("Developer", developerSchema);
module.exports = Developer;
