const bcrypt = require("bcrypt");
const { User } = require("../models/signup");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = Validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid Email");

	const pass = await bcrypt.compare(req.body.password, user.password);
	if (!pass) return res.status(400).send("Wrong Password");

	const token = user.generateAuth();
	res.send(token);
});

function Validate(data) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required(),
	});
	return schema.validate(data);
}

module.exports = router;
