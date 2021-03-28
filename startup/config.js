const config = require("dotenv").config();

module.exports = function () {
	if (!process.env.JWT_PRIVATEKEY)
		return console.log("please define your private key");
};
