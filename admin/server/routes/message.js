const express = require("express");
const router = express.Router();
const  messageData  = require("../model/message");

router.get("/message", async (req, res) => {
  try {
    const add = await messageData.find()
    res.json(add)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/message/:id", async (req, res) => {
  try {
    const {id} = req.params.id
    console.log(id);
    const deletemessage = await messageData.deleteOne(id)
    res.json(deletemessage)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;