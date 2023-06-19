const { Event } = require("../model/eventSchema");

const deleteEventController = async (req, res) => {
  const event = new Event();
  console.log("made it into delete controller");
  try {
    const response = await Event.findOneAndUpdate(
      {
        name: req.params.name,
      },
      {
        active: false,
      }
    );
    console.log("done finding");
    res.json(response);
  } catch (error) {
    console.log("get events error");
    console.log(error);
  }
};

module.exports.deleteEventController = deleteEventController;
