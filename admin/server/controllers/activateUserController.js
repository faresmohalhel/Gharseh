const { User } = require("../model/userSchema");

const activateUserController = async (req, res) => {
  const user = new User();
  console.log("made it into controller");
  try {
    const response = await User.findOneAndUpdate(
      {
        email: req.params.email,
      },
      {
        active: true,
      }
    );
    console.log("done finding");
    res.json(response);
  } catch (error) {
    console.log("get users error");
    console.log(error);
  }
};

module.exports.activateUserController = activateUserController;
