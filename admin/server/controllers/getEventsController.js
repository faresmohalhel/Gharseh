const { Event } = require("../model/eventSchema");

const getEventsController = async (req, res) => {
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
    const response = await Event.find({ active: true });
    console.log("event done sending");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports.getEventsController = getEventsController;
