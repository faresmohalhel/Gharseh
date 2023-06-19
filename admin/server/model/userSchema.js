const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter your name"],
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
    role: {  
      type:String,
      required: [true, "please enter your role"],
    },
    phoneNumber:{type:Number,},
    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    volunteering: [{ eventName: String }],
    payment: [{ date: String, amount: Number, eventName: String }],
    active: {type: Boolean, default: true }
  },
  
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);

module.exports.User = User;
