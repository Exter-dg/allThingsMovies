import React, { useEffect, useRef, useState } from "react";
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
	const inputRef = useRef();

	useEffect(() => {
		console.log("ActiveL: ", activeOtpIndex);
		console.log(inputRef);
		inputRef.current?.focus();
	}, [activeOtpIndex]);

	const focusNextInputField = (index) => {
		setActiveOtpIndex(index + 1);
	};

	const focusPreviousInputField = (index) => {
		console.log("Called with", index - 1);
		if (index > 0) setActiveOtpIndex(index - 1);
	};

	const handleOtpChange = (e, index) => {
		console.log("Changed");
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

	return (
		<FormContainer>
			<Container>
				<form className={commonModalClasses}>
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
