const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FavouriteEventSchema = new mongoose.Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true, ref: "Event" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FavouriteEvent", FavouriteEventSchema);
