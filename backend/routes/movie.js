const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const {
	uploadTrailer,
	createMovie,
	updateMovie,
	deleteMovie,
	getMovies,
	getMovieForUpdate,
} = require("../controller/movie");
const {
	movieValidator,
	validate,
	validateTrailer,
} = require("../middlewares/validator");
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
	validateTrailer,
	validate,
	createMovie
);

// router.patch(
// 	"/update-movie-without-poster/:movieId",
// 	isAuth,
// 	isAdmin,
// 	// parseMovieData,
// 	movieValidator,
// 	validate,
// 	updateMovieWithoutPoster
// );

router.patch(
	"/update/:movieId",
	isAuth,
	isAdmin,
	uploadImage.single("poster"),
	parseMovieData,
	movieValidator,
	validate,
	updateMovie
);

router.delete("/:movieId", isAuth, isAdmin, deleteMovie);
router.get("/movies", isAuth, isAdmin, getMovies);
router.get("/for-update/:movieId", isAuth, isAdmin, getMovieForUpdate);

module.exports = router;
