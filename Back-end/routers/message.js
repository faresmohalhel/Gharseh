const express = require("express");
const router = express.Router();
const  messageData  = require("../models/message");

router.post("/message", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newMessage =  new messageData ({
      name: name,
      email: email,
      phoneNumber: phone,
      message: message,
    });
    const add = await newMessage.save()
    res.json(add)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
