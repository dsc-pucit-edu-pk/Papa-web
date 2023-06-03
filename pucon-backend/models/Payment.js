const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    card_number: { type: Number, required: true },
    exp_year: { type: Number, required: true },
    exp_month: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
