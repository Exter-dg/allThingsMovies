import React, { useEffect, useState } from "react";
import MovieListItem from "../MovieListItem";
import { getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import NextAndPreviousButton from "../NextAndPreviousButton";

const limit = 10;
let currentPageNo = 0;
export default function Movies() {
	const [movies, setMovies] = useState([]);
	const [reachedToEnd, setReachedToEnd] = useState(false);

	const { updateNotification } = useNotification();

	const fetchMovies = async (pageNo) => {
		const { error, movies } = await getMovies(pageNo, limit);
		if (error) return updateNotification("error", error);
		if (!movies.length) {
			currentPageNo = pageNo - 1;
			return setReachedToEnd(true);
		}
		setMovies([...movies]);
	};

	const handleOnNextClick = () => {
		if (reachedToEnd) return;
		currentPageNo += 1;
		fetchMovies(currentPageNo);
	};

	const handleOnPrevClick = () => {};

	useEffect(() => {
		fetchMovies(currentPageNo);
	}, []);

	return (
		<div className="space-y-3 p-5">
			{movies.map((movie) => {
				return <MovieListItem key={movie.id} movie={movie}></MovieListItem>;
			})}
			<NextAndPreviousButton
				classname="mt-5"
				onNextClick={handleOnNextClick}
				onPrevClick={handleOnPrevClick}></NextAndPreviousButton>
		</div>
	);
}
