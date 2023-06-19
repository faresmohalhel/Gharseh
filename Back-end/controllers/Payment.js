const {Event} = require("../models/eventSchema");
const Payment = require("../models/Payment");
const User = require("../models/User");

exports.Payment = async (req, res, next) => {
  const {email, cardNumber, cardHolder, cvc, expiryDate ,amount} = req.body;
  console.log(email);
  const id = req.params.id;
  try {
    if(email){
      const event = await Event.findById(id);
      const updatedDonators = [...event.donators, { email, amount }];
      const updateDonatios = event.donations + Number(amount)
      await Event.findByIdAndUpdate(id, { donators: updatedDonators , donations:updateDonatios });
    }else{
      const event = await Event.findById(id);
      const updatedDonators = [...event.donators, { email:"anonmous", amount }];
      const updateDonatios = event.donations + Number(amount)
      await Event.findByIdAndUpdate(id, { donators: updatedDonators , donations:updateDonatios });
    }
    const payment = await Payment.create({
      cardNumber,
      cardHolder,
      cvc,
      expiryDate,
    });

    res.json("payment done");
  } catch (error) {
    next(error);
  }
};
