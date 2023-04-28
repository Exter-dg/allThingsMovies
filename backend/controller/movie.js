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

const updateMovieWithoutPoster = async (req, res) => {
	const movieId = req.params.movieId;

	if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!!!");

	const movie = await Movie.findById(movieId);
	if (!movie) return sendError(res, "Movie not found!!!");

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

	movie.title = title;
	movie.storyLine = storyLine;
	movie.releaseDate = releaseDate;
	movie.status = status;
	movie.genres = genres;
	movie.type = type;
	movie.tags = tags;
	movie.cast = cast;
	movie.trailer = trailer;
	movie.language = language;

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

	await movie.save();
	res.json({ message: "Movie Updated Successfully!", movie });
};

const updateMovieWithPoster = async (req, res) => {
	const movieId = req.params.movieId;
	const { file } = req;
	if (!file) return sendError(res, "Poster not found!!!");

	if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!!!");

	const movie = await Movie.findById(movieId);
	if (!movie) return sendError(res, "Movie not found!!!");

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

	movie.title = title;
	movie.storyLine = storyLine;
	movie.releaseDate = releaseDate;
	movie.status = status;
	movie.genres = genres;
	movie.type = type;
	movie.tags = tags;
	movie.cast = cast;
	movie.trailer = trailer;
	movie.language = language;

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

	// Delete existing Poster - which will always exist ?
	const existingPosterId = movie.poster?.public_id;
	if (existingPosterId) {
		const { result } = await cloudinary.uploader.destroy(existingPosterId);
		if (result !== "ok")
			return sendError(res, "Unable to delete the file from cloud!");
	}

	if (file) {
		// Upload new poster
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
	}

	await movie.save();
	res.json({ message: "Movie Updated Successfully!", movie });
};

const deleteMovie = async (req, res) => {
	const movieId = req.params.movieId;

	if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!!!");

	const movie = await Movie.findById(movieId);
	if (!movie) return sendError(res, "Movie not found!!!");

	// Delete poster
	const existingPosterId = movie.poster?.public_id;
	if (existingPosterId) {
		const { result } = await cloudinary.uploader.destroy(existingPosterId);
		if (result !== "ok")
			return sendError(res, "Unable to delete the poster from cloud!");
	}

	// Delete Trailer
	const existingTrailerId = movie.trailer?.public_id;
	if (!existingTrailerId)
		return sendError(res, "Something went wrong. Trailer not found!!!");
	const { result } = await cloudinary.uploader.destroy(existingTrailerId, {
		resource_type: "video",
	});
	if (result !== "ok")
		return sendError(res, "Unable to delete the trailer from cloud!");

	await Movie.findByIdAndDelete(movieId);
	res.json({ message: "Movie Deleted Successfully" });
};

module.exports = {
	uploadTrailer,
	createMovie,
	updateMovieWithoutPoster,
	updateMovieWithPoster,
	deleteMovie,
};
