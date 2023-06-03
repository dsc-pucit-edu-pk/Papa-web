const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FavouriteSchema = new mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favourite", FavouriteSchema);
