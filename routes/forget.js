const sendMail = require("../middleware/sendMail");
const { User } = require("../models/signup");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = Validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(404).send("User not found with given Email!");

	const resetToken = user.generateReset();
	await user.save({ validateBeforeSave: false });

	const from = process.env.EMAIL_FROM;
	const to = req.body.email;
	const subject = "Forget Password Email Update will Expire in 10m";
	const output = `
		<h1>Forget Password!</h1>
		<p>Please update your password click on following the link below which will expire in 10 minutes</p>
		<p>http://localhost:3001/reset-password/${resetToken}</p>
	`;

	await sendMail(to, from, subject, output);
	res.send("Please check your email");
});

function Validate(data) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
	});
	return schema.validate(data);
}

module.exports = router;
