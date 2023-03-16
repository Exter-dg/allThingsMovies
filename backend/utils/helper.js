const sendError = (res, error, statusCode) => {
	return res
		.status(statusCode)
		.json({ error });
}

module.exports = {
	sendError
}