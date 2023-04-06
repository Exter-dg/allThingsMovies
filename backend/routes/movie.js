const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { uploadTrailer, createMovie } = require("../controller/movie");
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

module.exports = router;
