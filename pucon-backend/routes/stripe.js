const router = require("express").Router();
const Payment = require("../models/Payment");
const Order = require("../models/Order");
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  console.log(req.body);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    async (stripeErr, stripeRes) => {
      console.log(stripeRes);
      if (stripeErr) {
        console.log(stripeErr);
        res.status(500).json(stripeErr);
      } else {
        const payment = new Payment({
          card_number: 4242424242424242,
          exp_month: stripeRes.payment_method_details.card.exp_month,
          exp_year: stripeRes.payment_method_details.card.exp_year,
          status: "success",
        });
        const p = await payment.save();
        const order = new Order({
          userId: req.body.userId,
          productId: req.body.productId,
          paymentId: p._id,
          amount: req.body.amount,
          address: req.body.address,
          status: "success",
        });
        await order.save();
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
