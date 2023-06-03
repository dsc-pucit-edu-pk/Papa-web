const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    poster_url: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    tags: { type: Array, required: true },
    participants: { type: Array, required: true },
    type: { type: String, required: true }, // once, day, week, month
    limit: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
