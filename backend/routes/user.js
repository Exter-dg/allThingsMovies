const express = require("express");


const {
	create,
	verifyEmail,
	resendEmailVerificationToken,
	generateResetPasswordToken,
	resetPassword,
	signIn
} = require("../controller/user");

const { userValidator, validate, passwordValidator, signInValidator } = require("../middlewares/validator");

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

router.post("/sign-in",
	signInValidator,
	validate,
	signIn
)

module.exports = router;
