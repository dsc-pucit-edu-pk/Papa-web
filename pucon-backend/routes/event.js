const router = require("express").Router();
const Event = require("../models/Event");
const { verifyToken } = require("./verifyToken");

router.post("/createEvent", verifyToken, (req, res) => {
  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    poster_url: req.body.poster_url,
    userId: req.user.id,
    duration: req.body.duration,
  });

  try {
    const savedEvent = newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});
