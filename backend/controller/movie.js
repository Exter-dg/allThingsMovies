const { isValidObjectId } = require("mongoose");
const cloudinary = require("../cloud");
const Movie = require("../models/movie");
const { sendError } = require("../utils/helper");

const uploadTrailer = async (req, res) => {
	const { file } = req;
	if (!file) return sendError(res, "File not found!!!");

	const { secure_url: url, public_id } = await cloudinary.uploader.upload(
		file.path,
		{
			resource_type: "video",
		}
	);

	res.json({ url, public_id });
};

const createMovie = async (req, res) => {
	const { file } = req;
	const {
		title,
		storyLine,
		director,
		releaseDate,
		status,
		genres,
		type,
		tags,
		cast,
		writers,
		trailer,
		language,
	} = req.body;
	const movie = new Movie({
		title,
		storyLine,
		releaseDate,
		status,
		genres,
		type,
		tags,
		cast,
		trailer,
		language,
	});

	if (director) {
		if (!isValidObjectId(director))
			return sendError(res, "Director id is invalid!!!");
		movie.director = director;
	}

	if (writers) {
		console.log(typeof writers);
		writers.forEach((writer) => {
			if (!isValidObjectId(writer))
				return sendError(res, "Writer id is invalid!!!");
		});
		movie.writers = writers;
	}

	const {
		secure_url: url,
		public_id,
		responsive_breakpoints,
	} = await cloudinary.uploader.upload(file.path, {
		transformation: {
			width: 1280,
			height: 720,
		},
		responsive_breakpoints: {
			create_derived: true,
			max_width: 640,
			max_images: 3,
		},
	});
	movie.poster = {
		url,
		public_id,
		responsive: [],
	};
	responsive_breakpoints[0].breakpoints.forEach((img) => {
		const { secure_url } = img;
		movie.poster.responsive.push(secure_url);
	});
	await movie.save();
	res.json("ok");
};

module.exports = {
	uploadTrailer,
	createMovie,
};
