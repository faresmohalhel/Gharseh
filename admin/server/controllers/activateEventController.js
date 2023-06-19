const { Event } = require("../model/eventSchema");

const activateEventController = async (req, res) => {
  const event = new Event();
  console.log("made it into controller");
  try {
    const response = await Event.findOneAndUpdate(
      {
        name: req.params.name,
      },
      {
        active: true,
      }
    );
    console.log("done finding");
    res.json(response);
  } catch (error) {
    console.log("get events error");
    console.log(error);
  }
};

module.exports.activateEventController = activateEventController;
