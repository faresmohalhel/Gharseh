const mongoose = require('mongoose');
const FormVolunteer = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "please enter your full Name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },
    age: {  
      type:Number,
      required: [true, "please enter your age"],
    },
    gender: {
      type: String,
      required: [true, "please enter your gender"],
    },
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model("Volunteer", FormVolunteer);

module.exports = Volunteer;
