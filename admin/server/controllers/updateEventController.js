const { Event } = require("../model/eventSchema");

const updateEventController = async (req, res) => {
  const event = new Event();
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
  console.log("made it into update controller");
  try {
    const response = await Event.findOneAndUpdate(
      {
        name: req.params.name,
      },
      {
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
      }
    );
    console.log("done finding");
    res.json(response);
  } catch (error) {
    console.log("get events error");
    console.log(error);
  }
};

module.exports.updateEventController = updateEventController;
