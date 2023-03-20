import React from "react";
import { Routes, Route } from "react-router-dom";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Navbar from "./components/user/Navbar";

export default function App() {
	return (
		<div>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
				<Route path="/auth/signin" element={<Signin></Signin>}></Route>
				<Route path="/auth/signup" element={<Signup></Signup>}></Route>
				<Route
					path="/auth/verification"
					element={<EmailVerification></EmailVerification>}></Route>
				<Route
					path="/auth/forget-password"
					element={<ForgetPassword></ForgetPassword>}></Route>
				<Route
					path="/auth/confirm-password"
					element={<ConfirmPassword></ConfirmPassword>}></Route>
			</Routes>
		</div>
	);
}
