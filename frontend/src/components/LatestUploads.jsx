import React from "react";
import MovieListItem from "./MovieListItem";

export default function LatestUploads() {
	return (
		<div className="bg-white shadow dark:bg-secondary p-5 rounded col-span-2">
			<h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
				Recent Uploads
			</h1>
			<MovieListItem
				movie={{
					movie: "",
					title: "lorem ipsum dolor",
					status: "public",
					genres: ["Action", "Comedy"],
				}}></MovieListItem>
		</div>
	);
}
