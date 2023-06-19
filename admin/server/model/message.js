const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageData = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type:Number,
},
  message: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("messageData", messageData);