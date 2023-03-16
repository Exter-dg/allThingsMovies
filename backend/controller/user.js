const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const { isValidObjectId } = require("mongoose");
const { generateOtp, createMailTransport } = require("../utils/mail");
const { sendError } = require("../utils/helper");

const create = async (req, res) => {
	const { name, email, password } = req.body;
	// Check if user already exists
	const oldUser = await User.findOne({ email });
	if (oldUser) {
		return sendError(res, "Email already Registered!!!", 401);
	}
	// Create a new record
	const newUser = new User({ name, email, password });
	// Save the new user to database
	await newUser.save();

	// Generate 6 digit otp
	const OTP = generateOtp();
	const newEmailVerificationToken = new EmailVerificationToken({
		owner: newUser._id,
		token: OTP,
	});
	await newEmailVerificationToken.save();

	// Send verification email to user email
	const transport = await createMailTransport();

	await transport.sendMail({
		from: "verification@allThingsMovies.com",
		to: newUser.email,
		subject: "Email Verification",
		html: `
		<p>Your Verification OTP is</p>
		<h1>${OTP}</h1>`,
	});
	res
		.status(201)
		.json({ message: "Please verify your email. An OTP has been sent." });
};

const verifyEmail = async (req, res) => {
	const { userObjId, OTP } = req.body;
	if (!isValidObjectId(userObjId)) return sendError(res, "Invalid User Id", 401);

	const user = await User.findById(userObjId);
	if (!user) return sendError(res, "User not found", 401);

	console.log(user);
	if (user.isVerified) return sendError(res, "User already verified", 401);

	const token = await EmailVerificationToken.findOne({ owner: userObjId });
	if (!token) return sendError(res, "Token not found", 401);
	
	console.log(token);
	const isMatched = await token.compareToken(OTP);
	if (!isMatched) return sendError(res, "Invalid OTP", 401);

	user.isVerified = true;
	await Promise.all([
		user.save(),
		EmailVerificationToken.findByIdAndDelete(token._id)
	]);

	// Send welcome email
	const transport = await createMailTransport();

	await transport.sendMail({
		from: "verification@allThingsMovies.com",
		to: user.email,
		subject: "Welcome to allThingsMovies",
		html: `
		<h1>We are excited to serve you at All Things Movies</h1>`,
	});
	
	res
		.status(201)
		.json({ message: "Verification Successful" });
}

const resendEmailVerificationToken = async (req, res) => {
	const { userObjId } = req.body;
	if (!isValidObjectId(userObjId)) sendError(res, "Invalid User Id", 401);

	const user = await User.findById(userObjId);
	if (!user) return sendError(res, "User not found", 401);

	if (user.isVerified) return sendError(res, "User already verified", 401);

	const existingToken = await EmailVerificationToken.findOne({ owner: userObjId });
	if (existingToken) return sendError(res, "Only one OTP allowed per hour", 401);

	// Generate 6 digit otp
	const OTP = generateOtp();
	const newEmailVerificationToken = new EmailVerificationToken({
		owner: user._id,
		token: OTP,
	});
	await newEmailVerificationToken.save();

	// Send verification email to user email
	const transport = await createMailTransport();

	await transport.sendMail({
		from: "verification@allThingsMovies.com",
		to: user.email,
		subject: "Email Verification",
		html: `
		<p>Your Verification OTP is</p>
		<h1>${OTP}</h1>`,
	});

	res
		.status(201)
		.json({ message: "Please verify your email. An OTP has been resent." });
}

module.exports = {
	create,
	verifyEmail,
	resendEmailVerificationToken
};
