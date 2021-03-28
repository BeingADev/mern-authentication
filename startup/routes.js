const exprss = require("express");
const signup = require("../routes/signup");
const auth = require("../routes/auth");
const forget = require("../routes/forget");
const resetPassword = require("../routes/resetPassword");
const users = require("../routes/users");
const updatePassword = require("../routes/updatePassword");

module.exports = function (app) {
	app.use(exprss.json());
	app.use("/signup", signup);
	app.use("/auth", auth);
	app.use("/forget", forget);
	app.use("/reset-password/", resetPassword);
	app.use("/update-password/", updatePassword);
	app.use("/users", users);
};
