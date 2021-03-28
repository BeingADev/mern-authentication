const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, Validate } = require("../models/signup");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = Validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User Already Registered!.");

	user = new User(req.body, [
		"firstName",
		"lastName",
		"email",
		"password",
		"confirmPassword",
	]);

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);

	const token = user.generateAuth();

	await user.save();
	res
		.header("x-auth-header", token)
		.header("access-control-expose-header", "x-auth-header")
		.send(token);
});

module.exports = router;
