const nodemailer = require("nodemailer");

const generateOtp = (otpLength = 6) => {
	const OTP = Math.floor(10**otpLength + Math.random() * (9 * 10**otpLength)).toString();
	return OTP;
}

const createMailTransport = async () => {
	const transport = await nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "86ba03979090e4",
			pass: "54748fbcb621e3",
		},
	});
	return transport;
}

module.exports = {
	generateOtp,
	createMailTransport
}