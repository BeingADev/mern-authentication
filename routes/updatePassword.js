const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/signup");
const auth = require("../middleware/auth");

router.put("/:id", [auth], async (req, res) => {
	const { error } = Validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findByIdAndUpdate(req.params.id, {
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	});
	if (!user) return res.status(400).send("Given ID is not valid!.");

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);

	await user.save();

	res.send("Password Udpated");
});

function Validate(data) {
	const schema = Joi.object({
		password: Joi.string().min(8).max(1000).required(),
		confirmPassword: Joi.any()
			.equal(Joi.ref("password"))
			.required()
			.label("Confirm password")
			.options({ messages: { "any.only": "{{#label}} does not match" } }),
	});
	return schema.validate(data);
}

module.exports = router;
