const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: [{ lat: Number, lng: Number }],
  },
  locationName: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  eventLength: {
    type: Number,
  },
  maxVolunteers: {
    type: Number,
  },
  numberOfTrees: {
    type: Number,
  },
  treePrice: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  donations: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  donators: {
    type: [{ email: String, amount: Number }],
  },
  volunteers: {
    type: [{ email: String }],
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports.Event = Event;