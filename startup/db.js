const mongoose = require("mongoose");
const config = require("dotenv").config();

module.exports = function () {
	mongoose
		.connect(process.env.DB_NAME, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("DB connected"));
};
