import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import Actors from "../components/admin/Actors";
import NavBar from "../components/admin/NavBar";
import Header from "../components/admin/Header";

export default function AdminNavigator() {
	return (
		<div className="flex dark:bg-primary bg-white">
			<NavBar></NavBar>
			<div className="flex-1 p-2 max-w-screen-xl">
				<Header></Header>
				<Routes>
					<Route path="/" element={<Dashboard></Dashboard>}></Route>
					<Route path="/movies" element={<Movies></Movies>}></Route>
					<Route path="/actors" element={<Actors></Actors>}></Route>
				</Routes>
			</div>
		</div>
	);
}
