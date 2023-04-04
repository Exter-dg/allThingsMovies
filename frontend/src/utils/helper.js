const isValidEmail = (email) => {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(email);
};

const isValidName = (name) => {
	const userRegex = /[A-Z a-z]+$/;
	return userRegex.test(name);
};

module.exports = {
	isValidEmail,
	isValidName,
};
