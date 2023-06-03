const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		productId: { type: String, required: true },
		reviewDesc: { type: String, required: true },
		rating: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
