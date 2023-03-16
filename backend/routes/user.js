const express = require("express");
const { create, verifyEmail, resendEmailVerificationToken } = require("../controller/user");
const { userValidator, validate } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendEmailVerificationToken)

module.exports = router;
