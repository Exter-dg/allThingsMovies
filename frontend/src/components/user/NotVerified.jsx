import React from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Container from "../Container";

export default function NotVerified() {
	const { authInfo } = useAuth();
	const { isLoggedIn } = authInfo;
	const isVerified = authInfo.profile?.isVerified;
	const navigate = useNavigate();

	const navigateToVerification = () => {
		navigate("/auth/verification", {
			state: {
				user: authInfo.profile,
			},
		});
	};

	if (isLoggedIn && !isVerified) {
		return (
			<Container className="border-opacity-30">
				<p className="bg-blue-100 text-center p-2 mt-4">
					Looks like you have not verified your account.{" "}
					<button
						onClick={navigateToVerification}
						className="text-blue-400 font-semibold">
						Click here to verify your account.
					</button>
				</p>
			</Container>
		);
	}
	return <div>Home</div>;
}
