const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    paymentId: { type: Schema.Types.ObjectId, required: true, ref: "Payment" },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
