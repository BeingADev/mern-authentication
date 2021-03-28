const crypto = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	lastName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
		maxlength: 255,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	confirmPassword: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	date: {
		type: Date,
		defualt: Date.now,
	},
	isAdmin: Boolean,
	passwordResetToken: String,
	passwordResetEx: Date,
});

userSchema.methods.generateAuth = function () {
	const token = jwt.sign(
		{
			_id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			isAdmin: this.isAdmin,
		},
		process.env.JWT_PRIVATEKEY
	);
	return token;
};

userSchema.methods.generateReset = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetEx = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

function Validate(data) {
	const schema = Joi.object({
		firstName: Joi.string().min(3).max(50).required().trim(),
		lastName: Joi.string().min(3).max(50).required().trim(),
		email: Joi.string().min(8).max(100).required().email(),
		password: Joi.string().min(8).max(1000).required(),
		confirmPassword: Joi.any()
			.equal(Joi.ref("password"))
			.required()
			.label("Confirm password")
			.options({ messages: { "any.only": "{{#label}} does not match" } }),
	});
	return schema.validate(data);
}

exports.User = User;
exports.Validate = Validate;
