const config = require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_KEY);

module.exports = function sendMail(to, from, subject, text) {
	const msg = { to, from, subject, html: text };

	(async () => {
		try {
			await sgMail.send(msg);
		} catch (err) {
			console.error(err);
		}
	})();
};
