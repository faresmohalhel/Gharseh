const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PaymentSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: [true, "Please enter your card number"],
      unique: true,
      minlength: [12, "Card number should be at least 12 characters"],
      match: [/^\d{12,}$/, "Card number should contain only digits"],
    },
    cardHolder: {
      type: String,
      required: [true, "Please enter your card holder"],
      unique: true,
    },
    expiryDate: {  
      type: String,
      required: [true, "Please enter the expiry date"],
      match: [/^\d{2}\/\d{2}$/, "Expiry date should be in the format MM/YY"],
    },
    cvc: {
      type: String,
      required: [true, "Please enter your CVC"],
      minlength: [3, "CVC should be at least 3 characters"],
      match: [/^\d{3,}$/, "CVC should contain only digits"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

PaymentSchema.pre('save', async function (next) {
  if (this.isModified('cardNumber') || this.isModified('cvc')) {
    const salt = await bcrypt.genSalt(10);
    this.cardNumber = await bcrypt.hash(this.cardNumber, salt);
    this.cvc = await bcrypt.hash(this.cvc, salt);
  }
  next();
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
