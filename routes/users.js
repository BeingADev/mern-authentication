const { User } = require("../models/signup");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
	const user = await User.find().select("firstName lastName email");
	res.send(user);
});

router.delete("/:id", [auth, admin], async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	if (!user) return res.status(400).send("Given ID is not valid");
	res.send(user);
});

module.exports = router;
