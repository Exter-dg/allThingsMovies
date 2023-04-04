const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
	const token = req.headers?.authorization;
	if (!token) return sendError(res, "Token not found");

	const jwtToken = token.split("Bearer ")[1];
	if (!jwtToken) return sendError(res, "Token not found");

	const { userObjId } = jwt.verify(jwtToken, process.env.JWT_SECRET);

	const user = await User.findById(userObjId);
	if (!user) return sendError(res, "User not found/ Invalid Token");

	req.user = user;

	next();
};

module.exports = {
	isAuth,
};
