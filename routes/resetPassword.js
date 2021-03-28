const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User } = require("../models/signup");
const express = require("express");
const router = express.Router();

router.patch("/:token", async (req, res) => {
	const hashedResetToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedResetToken,
		passwordResetEx: { $gt: Date.now() },
	});

	if (!user) return res.status(400).send("Token Expired!");
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);

	user.passwordResetToken = undefined;
	user.passwordResetEx = undefined;
	await user.save();

	const token = user.generateAuth();

	res.send(token);
});

module.exports = router;
