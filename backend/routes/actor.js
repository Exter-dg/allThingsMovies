const express = require("express");
const {
	create,
	update,
	deleteActor,
	searchActor,
	getLatestActors,
	getSingleActor,
} = require("../controller/actor");
const uploadImage = require("../middlewares/multer");
const { actorValidator, validate } = require("../middlewares/validator");
const router = express.Router();

router.post(
	"/create",
	uploadImage.single("avatar"),
	actorValidator,
	validate,
	create
);

router.post(
	"/update/:actorId",
	uploadImage.single("avatar"),
	actorValidator,
	validate,
	update
);

router.post("/delete/:actorId", deleteActor);
router.get("/search", searchActor);
router.get("/latest-uploads", getLatestActors);
router.get("/single/:id", getSingleActor);

module.exports = router;
