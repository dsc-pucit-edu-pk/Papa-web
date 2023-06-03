const router = require("express").Router();
const Event = require("../models/Event");
const { verifyToken } = require("./verifyToken");
const { sendMail } = require("../helpers/helper");
const FavouriteEvent = require("../models/FavouriteEvent");

const eventMap = {};
const sendNotification = async (eventId, subject, mail) => {
	console.log("sendNotification");
	const event = await Event.findById(eventId);
	const participants = event.participants;
	console.log(participants);
	for (let i = 0; i < participants.length; i++) {
		sendMail(participants[i], subject, mail);
	}
	let interval;
	switch (event.type) {
		case "once":
			interval = 0;
			break;
		case "day":
			interval = 24 * 60 * 60 * 1000;
			break;
		case "week":
			interval = 7 * 24 * 60 * 60 * 1000;
			break;
		case "month":
			interval = 30 * 24 * 60 * 60 * 1000;
			break;
	}
	if (interval !== 0) {
		const cronId = setTimeout(() => {
			sendNotification(eventId, subject, mail);
		}, interval);
		eventMap[eventId] = cronId;
	}
};
router.post("/createEvent", verifyToken, async (req, res) => {
	const newEvent = new Event({
		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		poster_url: req.body.poster_url,
		userId: req.user.id,
		duration: req.body.duration,
		tags: req.body.tags,
		participants: [req.user.email],
		type: req.body.type,
		limit: req.body.limit,
	});

	try {
		const savedEvent = await newEvent.save();
		const mailSubject = "Event Reminder";
		const mailBody = `Your event ${savedEvent.title} is happening now
    Description : ${savedEvent.description}
    Date : ${savedEvent.date.toDateString()}`;
		const triggerTime = new Date(req.body.date) - new Date();
		console.log(triggerTime);
		const cronId = setTimeout(() => {
			sendNotification(savedEvent._id, mailSubject, mailBody);
		}, triggerTime);
		eventMap[savedEvent._id] = cronId;
		res.status(200).json(savedEvent);
	} catch (err) {
		res.status(500).json(err);
	}
});

// edit an event

router.post("/editEvent/:id", verifyToken, async (req, res) => {
	const event = await Event.findById(req.params.id);
	console.log(req.body);
	if (event.userId == req.user.id) {
		const updatedEvent = await event.updateOne({ $set: req.body });
		// send email to all participants
		let mailSubject = "Event Change";
		let mailBody = `The event ${event.title} has been changed
    New Title: ${req.body.title}
    New Description: ${req.body.description}
    New Date: ${new Date(req.body.date).toDateString()}
    `;
		for (let i = 0; i < event.participants.length; i++) {
			sendMail(event.participants[i], mailSubject, mailBody);
		}
		const triggerTime = new Date(req.body.date) - new Date();
		clearTimeout(eventMap[req.params.id]);
		mailSubject = "Event Reminder";
		mailBody = `Your event ${req.body.title} is happening now
    Description : ${req.body.description}
    Date : ${new Date(req.body.date).toDateString()}`;
		const cronId = setTimeout(() => {
			sendNotification(req.params.id, mailSubject, mailBody);
		}, triggerTime);
		eventMap[req.params.id] = cronId;
		res.status(200).json("the event has been updated");
	} else {
		res.status(403).json("you can update only your event");
	}
});

// delete an event

router.delete("/deleteEvent/:id", verifyToken, async (req, res) => {
	const event = await Event.findById(req.params.id);
	if (event.userId == req.user.id) {
		await event.deleteOne();
		clearTimeout(eventMap[req.params.id]);
		// send cancellation email to all participants
		let mailSubject = "Event Cancellation";
		let mailBody = `The event ${event.title} has been cancelled`;
		for (let i = 0; i < event.participants.length; i++) {
			sendMail(event.participants[i], mailSubject, mailBody);
		}
		res.status(200).json("the event has been deleted");
	} else {
		res.status(403).json("you can delete only your event");
	}
});

// search event based upon title and description

router.get("/searchEvent", verifyToken, async (req, res) => {
	const title = req.query.title;
	const description = req.query.description;
	const tags = req.query.tags;
	const date = req.query.date;
	try {
		const query = {};

		if (title) {
			query.title = { $regex: title, $options: "i" };
		}

		if (description) {
			query.description = { $regex: description, $options: "i" };
		}

		if (tags) {
			query.tags = { $in: tags.split(",") };
		}

		if (date) {
			query.date = new Date(date);
		}

		const events = await Event.find(query);
		res.status(200).json(events);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get all events
router.get("/allEvents", verifyToken, async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json(events);
	} catch (err) {
		res.status(500).json(err);
	}
});

// add event to favourite
router.post("/addFavouriteEvent", verifyToken, async (req, res) => {
	const newFavouriteEvent = new FavouriteEvent({
		eventId: req.body.eventId,
		userId: req.user.id,
	});
	try {
		const savedFavouriteEvent = await newFavouriteEvent.save();
		res.status(200).json(savedFavouriteEvent);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get favourite events of a user
router.get("/getFavouriteEvents", verifyToken, async (req, res) => {
	try {
		const favouriteEvents = await FavouriteEvent.find({
			userId: req.user.id,
		}).populate("eventId");
		res.status(200).json(favouriteEvents);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete favourite event
router.delete("/deleteFavouriteEvent/:id", verifyToken, async (req, res) => {
	try {
		await FavouriteEvent.deleteOne({
			eventId: req.params.id,
			userId: req.user.id,
		});
		res.status(200).json("the favourite event has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});

// join an event
router.post("/joinEvent/:id", verifyToken, async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		const participants = event.participants;
		if (participants.length >= event.limit) {
			res.status(403).json("the event is full");
			return;
		}
		if (!participants.includes(req.user.email)) participants.push(req.user.email);
		await event.updateOne({ $set: { participants: participants } });
		res.status(200).json("the participant has been added");
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
