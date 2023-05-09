import React from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

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

export default MovieListItem;
