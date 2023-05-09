const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const {
	uploadTrailer,
	createMovie,
	updateMovieWithoutPoster,
	updateMovieWithPoster,
	deleteMovie,
	getMovies,
} = require("../controller/movie");
const { movieValidator, validate } = require("../middlewares/validator");
const { parseMovieData } = require("../utils/helper");
const router = express.Router();

router.post(
	"/upload-trailer",
	isAuth,
	isAdmin,
	uploadVideo.single("video"),
	uploadTrailer
);

router.post(
	"/create",
	isAuth,
	isAdmin,
	uploadImage.single("poster"),
	parseMovieData,
	movieValidator,
	validate,
	createMovie
);

router.patch(
	"/update-movie-without-poster/:movieId",
	isAuth,
	isAdmin,
	// parseMovieData,
	movieValidator,
	validate,
	updateMovieWithoutPoster
);

router.patch(
	"/update-movie-with-poster/:movieId",
	isAuth,
	isAdmin,
	uploadImage.single("poster"),
	parseMovieData,
	movieValidator,
	validate,
	updateMovieWithPoster
);

router.delete("/:movieId", isAuth, isAdmin, deleteMovie);
router.get("/movies", isAuth, isAdmin, getMovies);

module.exports = router;
