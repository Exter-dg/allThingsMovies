const sendError = (res, error, statusCode = 401) => {
	return res.status(statusCode).json({ error });
};

const handleNotFound = (req, res) => {
	sendError(res, "Not Found", 404);
};

module.exports = {
	sendError,
	handleNotFound,
};
