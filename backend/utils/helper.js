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

const parseMovieData = async (req, res, next) => {
	const { genres, tags, cast, writers, trailer } = req.body;
	if (trailer) req.body.trailer = JSON.parse(trailer);
	if (genres) req.body.genres = JSON.parse(genres);
	if (tags) req.body.tags = JSON.parse(tags);
	if (cast) req.body.cast = JSON.parse(cast);
	if (writers) req.body.writers = JSON.parse(writers);
	next();
};

const formatActor = (actor) => {
	const { name, gender, about, _id, avatar } = actor;
	return {
		id: _id,
		name,
		about,
		gender,
		avatar: avatar?.url,
	};
};

module.exports = {
	sendError,
	handleNotFound,
	uploadImageToCloud,
	parseMovieData,
	formatActor,
};
