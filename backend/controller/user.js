const User = require("../models/user");

const create = async (req, res) => {
	const { name, email, password } = req.body;
	// Check if user already exists
	const oldUser = await User.findOne({ email });
	if (oldUser) {
		res.status(401).json({
			error: "Email already Registered!!!"
		});
		return;
	}
	// Create a new record
	const newUser = new User({name, email, password});
	// Save the new user to database
	await newUser.save();
	res.status(201).json({user: newUser});
};

module.exports = {
	create
}