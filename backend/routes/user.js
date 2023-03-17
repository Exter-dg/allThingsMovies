const express = require("express");
const { create, verifyEmail, resendEmailVerificationToken, generateResetPasswordToken, resetPassword } = require("../controller/user");
const { userValidator, validate, passwordValidator } = require("../middlewares/validator");
const { isValidPasswordResetToken } = require("../middlewares/user");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendEmailVerificationToken);
router.post("/forget-password", generateResetPasswordToken);
router.post("/reset-password",
	isValidPasswordResetToken,
	passwordValidator,
	validate,
	resetPassword
);

module.exports = router;
