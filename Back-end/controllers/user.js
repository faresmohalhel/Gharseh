const User = require('../models/User')


const getUser = async (req, res) => {
    if (!req?.user) return res.status(400).json({ "message": 'User is UnAuthorized' });
    const user = await User.findOne({ email: req.user.email }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User Email ${req.user.email} not found` });
    }
    res.json(user);
}

const updateUser= async (req, res) => {
    try {
      const {userId, userName, phoneNumber} = req.body
      const user = await User.findById(userId);
  
      if (!user) {
        console.log('User not found');
        return;
      }
  

      user.username = userName || user.username;
      user.phoneNumber = phoneNumber || user.phoneNumber

  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  }

// const updateUser = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     const user = await User.findOne({ _id: req.body.id }).exec();

//     if (!user) {
//         return res.status(204).json({ "message": `No User matches ID ${req.body.id}.` });
//     }

//     if (req.body?.userName) user.username = req.body.userName;
//     if (req.body?.phoneNumber) user.phonenumber = req.body.phoneNumber;
//     const result = await user.save();
//     res.json(result);
// }

// Retrieve specific user data
const getOneUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve user data',err });
    }
  };

module.exports = {
    getUser,
    updateUser,
    getOneUser
}

