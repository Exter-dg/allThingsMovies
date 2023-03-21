import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LENGTH = 6;
let currentOtpIndex = 0;

export default function EmailVerification() {
	const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
	const [activeOtpIndex, setActiveOtpIndex] = useState(0);
	const { updateNotification } = useNotification();
	const inputRef = useRef();
	const navigate = useNavigate();
	const { state } = useLocation();
	const user = state?.user;

	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOtpIndex]);

	useEffect(() => {
		if (!user) navigate("/not-found");
	}, [navigate, user]);

	const focusNextInputField = (index) => {
		setActiveOtpIndex(index + 1);
	};

	const focusPreviousInputField = (index) => {
		if (index > 0) setActiveOtpIndex(index - 1);
	};

	const isValidOtp = (otp) => {
		otp.forEach((val) => {
			if (isNaN(parseInt(val))) return false;
		});
		return true;
	};

	const handleOtpChange = (e, index) => {
		const { value } = e.target;
		const newOtp = [...otp];
		newOtp[currentOtpIndex] = value.substring(value.length - 1, value.length);
		value
			? focusNextInputField(currentOtpIndex)
			: focusPreviousInputField(currentOtpIndex);
		setOtp(newOtp);
	};

	const handleKeyDown = (e, index) => {
		currentOtpIndex = index;
		if (e.key === "Backspace") focusPreviousInputField(index);
	};

	const handleOtpFocus = (index) => {
		setActiveOtpIndex(index);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// check if otp is valid
		if (!isValidOtp(otp)) return updateNotification("error", "Invalid OTP!!!");
		const { error } = await verifyEmail({
			OTP: otp.join(""),
			userObjId: user.id,
		});

		if (error) return updateNotification("error", error);
		updateNotification("success", "User Verified!!!");
		navigate("/auth/signin");
	};

	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModalClasses}>
					<div>
						<Title>Please enter the OTP to verify your account</Title>
						<p className="text-center dark:text-dark-subtle text-light-subtle">
							OTP has been sent to your email
						</p>
					</div>
					<div className="flex justify-center items-center space-x-4">
						{otp.map((_, index) => {
							return (
								<input
									ref={activeOtpIndex === index ? inputRef : null}
									key={index}
									type="number"
									value={otp[index]}
									onChange={(e) => {
										handleOtpChange(e, index);
									}}
									onFocus={() => handleOtpFocus(index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									className="w-12 h-12 border-2 rounded bg-transparent
										dark:border-dark-subtle dark:focus:border-white outline-none
										text-center dark:text-white font-semibold text-xl
										spin-button-none border-light-subtle
										focus:border-primary text-primary"></input>
							);
						})}
					</div>
					<Submit value="Verify"></Submit>
				</form>
			</Container>
		</FormContainer>
	);
}
