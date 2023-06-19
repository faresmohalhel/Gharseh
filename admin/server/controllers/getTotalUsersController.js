const { User } = require("../model/userSchema");

const getTotalUsersController = async (req, res) => {
  const user = new User();
  console.log("made it into controller");
  try {
    const response = await User.find({});
    console.log("done finding");
    res.json(response);
  } catch (error) {
    console.log("get users error");
    console.log(error);
  }
};

module.exports.getTotalUsersController = getTotalUsersController;
