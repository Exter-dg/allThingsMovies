import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";

export default function Navbar() {
	const { toggleTheme } = useTheme();
	const { authInfo, handleLogout } = useAuth();
	const { isLoggedIn } = authInfo;
	return (
		<div className="bg-secondary shadow-sm shadow-gray-500 p-2">
			<Container className="p-2">
				<div className="flex justify-between items-center">
					<Link to="/">
						<img src="./logo.png" alt="" className="h-10"></img>
					</Link>
					<ul className="flex items-center space-x-4">
						<li>
							<button
								onClick={toggleTheme}
								className="bg-dark-subtle dark:bg-white p-1 rounded">
								<BsFillSunFill
									className="text-secondary"
									size={24}></BsFillSunFill>
							</button>
						</li>
						<li>
							<input
								type="text"
								className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl 
								outline-none focus:border-white transition text-white"
								placeholder="Search..."></input>
						</li>
						<li className="text-white font-semibold text-lg">
							{isLoggedIn ? (
								<button onClick={handleLogout}>Log out</button>
							) : (
								<Link to="/auth/signin">Login</Link>
							)}
						</li>
					</ul>
				</div>
			</Container>
		</div>
	);
}
