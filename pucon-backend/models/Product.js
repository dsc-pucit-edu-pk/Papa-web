const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    cost_price: { type: Number, required: true },
    market_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product_type: { type: String, required: true },
    minimum_age: { type: String, required: true },
    company_name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
