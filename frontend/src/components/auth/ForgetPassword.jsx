import React from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ForgetPassword() {
	return (
		<FormContainer>
			<Container>
				<form className="bg-secondary rounded p-6 w-96 space-y-6">
					<Title>Please enter your email</Title>
					<FormInput
						label="Email"
						name="email"
						placeholder="john.doe@email.com"></FormInput>
					<Submit value="Send Link"></Submit>
					<div className="flex justify-between">
						<CustomLink to="/auth/signin">Sign in</CustomLink>
						<CustomLink to="/auth/signup">Sign up</CustomLink>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
}
