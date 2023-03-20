import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Signin() {
	return (
		<FormContainer>
			<Container>
				<form className={"w-72 " + commonModalClasses}>
					<Title>Sign in</Title>
					<FormInput
						label="Email"
						name="email"
						placeholder="john.doe@email.com"></FormInput>
					<FormInput
						label="Password"
						name="password"
						placeholder="********"></FormInput>
					<Submit value="Sign in"></Submit>
					<div className="flex justify-between">
						<CustomLink to="/auth/forget-password">Forget Password</CustomLink>
						<CustomLink to="/auth/signup">Sign up</CustomLink>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
}
