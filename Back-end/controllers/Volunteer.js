const Volunteer = require("../models/volunteer");
const { Event } = require("../models/eventSchema");
const auth = require("../middleware/auth");

exports.Volunteer = async (req, res, next) => {
  try {
    let duplicated = false
    const { fullName, email, age, gender } = req.body;
    const id = req.params.id;
    const event = await Event.findById(id);
    event.volunteers.map((ele) => {
      if (ele.email == email) {
         res.json({"duplicated":"انت بالفعل متطوع بهذه الفعالية"});
         duplicated = true
      }
    });
    if(!duplicated){
    const updatedVolunteers = [...event.volunteers, { email }];
    await Event.findByIdAndUpdate(id, { volunteers: updatedVolunteers });

    const volunteer = await Volunteer.create({
      fullName,
      email,
      age,
      gender,
    });
    res.json({"success":"get event done"});
  }
  } catch (error) {
    next(error);
  }
};
