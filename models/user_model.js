const mongoose = require("mongoose");
const { isValidEnglishName } = require("../helper");
const { getIntegerValidator } = require("../helper");

// Creating a new Schema(collection) of developers
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "User property must include ID!"],
    validate: getIntegerValidator,
  },

  first_name: {
    type: String,
    required: [true, "User property must include first name!"],
    validate: {
      validator: isValidEnglishName,
      message: (props) => `${props.value} is not a valid first name!`,
    },
  },

  last_name: {
    type: String,
    required: [true, "User property must include last name!"],
    validate: {
      validator: isValidEnglishName,
      message: (props) => `${props.value} is not a valid first name!`,
    },
  },

  birthday: {
    type: String,
    required: [true, "User property must include birthday!"],
  },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
