const { check, validationResult } = require("express-validator");

const userValidator = [
	check("name").trim().not().isEmpty().withMessage("Name cannot be empty!!!"),
	check("email").isEmail().withMessage("Email format invalid").normalizeEmail(),
	check("password")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Password cannot be empty!!!")
		.isLength({
			min: 8,
			max: 20,
		})
		.withMessage("Password must be of 8-20 characters"),
];

const passwordValidator = [
	check("password")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Password cannot be empty!!!")
		.isLength({
			min: 8,
			max: 20,
		})
		.withMessage("Password must be of 8-20 characters"),
];

const signInValidator = [
	check("email").isEmail().withMessage("Email format invalid").normalizeEmail(),
	check("password")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Password cannot be empty!!!")
];

const validate = (req, res, next) => {
	const errors = validationResult(req).array();
	if (errors.length > 0) {
		return res.json({error: errors[0].msg});
	}
	next();
}

module.exports = {
	userValidator,
	passwordValidator,
	signInValidator,
	validate
}