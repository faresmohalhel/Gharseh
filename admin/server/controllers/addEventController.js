const { Event } = require("../model/eventSchema");

const addEventController = async (req, res) => {
  const event = new Event();
  console.log("made it into controller");
  const {
    name,
    startDate,
    eventLength,
    maxVolunteers,
    numberOfTrees,
    treePrice,
    description,
    image,
    location,
    locationName,
  } = req.body;
  console.log(
    name,
    startDate,
    eventLength,
    maxVolunteers,
    numberOfTrees,
    treePrice,
    description,
    // image,
    location,
    locationName
  );
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
    const response = await Event.create({
      name,
      startDate,
      eventLength,
      maxVolunteers,
      numberOfTrees,
      treePrice,
      description,
      image,
      location,
      locationName,
    });
    console.log("event done adding");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports.addEventController = addEventController;
