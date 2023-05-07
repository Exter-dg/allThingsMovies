import React from "react";
import { BsTrash, BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";

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

const MovieListItem = ({ movie }) => {
	const {
		poster,
		title,
		genres = [],
		status,
		onDeleteClick,
		onEditClick,
		onOpenClick,
	} = movie;
	return (
		<table className="w-full border-b ">
			<tbody>
				<tr>
					<td>
						<div className="w-24">
							<img
								className="w-full aspect-video"
								src={poster}
								alt={title}></img>
						</div>
					</td>
					<td className="w-full pl-5">
						<div>
							<h1 className="text-lg font-semibold text-primary dark:text-white">
								{title}
							</h1>
							<div className="space-x-1">
								{genres.map((genre, index) => (
									<span
										className="text-xs text-primary dark:text-white"
										key={index}>
										{genre}
									</span>
								))}
							</div>
						</div>
					</td>
					<td className="px-5">
						<p className="text-primary dark:text-white">{status}</p>
					</td>
					<td>
						<div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
							<button type="button" onClick={onDeleteClick}>
								<BsTrash></BsTrash>
							</button>
							<button type="button" onClick={onEditClick}>
								<BsPencilSquare></BsPencilSquare>
							</button>
							<button type="button" onClick={onOpenClick}>
								<BsBoxArrowUpRight></BsBoxArrowUpRight>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
};
