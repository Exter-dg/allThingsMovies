const cloudinary = require("../cloud");

const sendError = (res, error, statusCode = 401) => {
	return res.status(statusCode).json({ error });
};

const handleNotFound = (req, res) => {
	sendError(res, "Not Found", 404);
};

const uploadImageToCloud = async (path) => {
	const { secure_url: url, public_id } = await cloudinary.uploader.upload(
		path,
		{ gravity: "face", height: 500, width: 500, crop: "thumb" }
	);
	return { url, public_id };
};

module.exports = {
	sendError,
	handleNotFound,
	uploadImageToCloud,
};
