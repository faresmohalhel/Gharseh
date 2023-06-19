
// import event model
const { Event } = require("../models/eventSchema");
const getEvents = async (req, res) => {
  try {
    const event = await Event.find({ active: true });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getEventsByVolunteer = async (req, res) => {

  try {
      const email = req.user.email
      const events = await Event.find({ "volunteers.email": email });
      res.json(events) ;
    } catch (error) {
      // Handle error
      console.error("Error retrieving volunteered events:", error);
      throw error;
    }

}
const getEventsByDoner = async (req, res) => {

  try {
    const email = req.user.email
      const events = await Event.find({ "donators.email": email });
      res.json(events) ;

    } catch (error) {
      // Handle error
      console.error("Error retrieving donators events:", error);
      throw error;
    }

}



module.exports = {
  getOneEvent,
  getEvents,
  getEventsByVolunteer,
  getEventsByDoner

};
