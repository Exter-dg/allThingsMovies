import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
	return (
		<FormContainer>
			<Container>
				<form className={"w-96 " + commonModalClasses}>
					<Title>Enter new password</Title>
					<FormInput
						label="New Password"
						name="password"
						placeholder="********"
						type="password"></FormInput>
					<FormInput
						label="Confirm Password"
						name="confirmPassword"
						placeholder="********"
						type="password"></FormInput>
					<Submit value="Confirm Password"></Submit>
				</form>
			</Container>
		</FormContainer>
	);
}
