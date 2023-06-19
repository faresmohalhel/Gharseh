const { User } = require("../model/userSchema");

const addUserController = async (req, res) => {
  const user = new User();
  console.log("made it into controller");
  const { name, email, password, role } = req.body;
  console.log(name, email, password, role);

  try {
    const response = await User.create({
      name,
      email,
      password,
      role,
    });
    console.log("done adding");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports.addUserController = addUserController;
