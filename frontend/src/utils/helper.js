const isValidEmail = (email) => {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(email);
};

const isValidName = (name) => {
	const userRegex = /[A-Z a-z]+$/;
	return userRegex.test(name);
};

const getToken = () => {
	const token = localStorage.getItem("auth-token");
	return token;
};

const catchError = (err) => {
	const { response } = err;
	if (response?.data) return response.data;
	return err.message || err;
};

export { isValidEmail, isValidName, getToken, catchError };
