const { Event } = require("../model/eventSchema");

const deletedEventsController = async (req, res) => {
  const event = new Event();
  console.log("made it into controller");
  // const {
  //   name,
  //   startDate,
  //   eventLength,
  //   maxVolunteers,
  //   numberOfTrees,
  //   treePrice,
  //   description,
  //   image,
  // } = req.body;
  // console.log(
  //   name,
  //   startDate,
  //   eventLength,
  //   maxVolunteers,
  //   numberOfTrees,
  //   treePrice,
  //   description,
  //   image
  // );

  try {
    const response = await Event.find({ active: false });
    console.log("event done sending");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports.deletedEventsController = deletedEventsController;
