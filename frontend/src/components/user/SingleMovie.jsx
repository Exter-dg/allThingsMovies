import React, { useEffect, useState } from "react";
import { getSingleMovie } from "../../api/movie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";

const convertDate = (date = "") => {
	return date.split("T")[0];
};

export default function SingleMovie() {
	const [movie, setMovie] = useState({});
	const [ready, setReady] = useState(false);

	const { updateNotification } = useNotification();
	const { isLoggedIn } = useAuth();
	const { movieId } = useParams();
	const navigate = useNavigate();

	const fetchMovie = async () => {
		const { error, movie } = await getSingleMovie(movieId);
		if (error) return updateNotification("error", error);
		setReady(true);
		setMovie(movie);
	};

	const handleOnRateMovie = () => {
		if (!isLoggedIn) return navigate("/auth/signin");
	};

	useEffect(() => {
		if (movieId) fetchMovie();
	}, [movieId]);

	if (!ready) {
		return (
			<div className="h-screen flex justify-center items-center dark:bg-primary bg-white min-h-screen">
				<p className="text-light-subtle dark:text-dark-subtle animate-pulse	">
					Please wait
				</p>
			</div>
		);
	}

	const {
		id,
		trailer,
		poster,
		title,
		storyLine,
		language,
		releaseDate,
		type,
		director = {},
		reviews = {},
		writers = [],
		cast = [],
		genres = [],
	} = movie;
	return (
		<div className="dark:bg-primary bg-white min-h-screen pb-10">
			<Container>
				<video poster={poster} controls src={trailer}></video>
				<div className="flex justify-between">
					<h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">
						{title}
					</h1>
					<div className="flex flex-col items-end">
						<RatingStar rating={reviews.ratingAvg}></RatingStar>
						<Link
							className="text-highlight dark:text-highlight-dark hover:underline"
							to={"/movie/reviews/" + id}>
							{reviews?.reviewCount || 0} Reviews
						</Link>

						<button
							className="text-highlight dark:text-highlight-dark hover:underline"
							type="button"
							onClick={handleOnRateMovie}>
							Rate The Movie
						</button>
					</div>
				</div>
				<div className="space-y-3">
					<p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Director:
						</p>
						<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
							{director?.name}
						</p>
					</div>

					<div className="flex">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
							Writers:
						</p>
						<div className="flex space-x-2">
							{writers.map((w) => {
								return (
									<p
										key={w.id}
										className="text-highlight dark:text-highlight-dark hover:underline  cursor-pointer">
										{w.name}
									</p>
								);
							})}
						</div>
					</div>

					<div className="flex">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
							Cast:
						</p>
						<div className="flex space-x-2">
							{cast.map((c) => {
								return c.leadActor ? (
									<p
										key={c.profile.id}
										className="text-highlight dark:text-highlight-dark hover:underline  cursor-pointer">
										{c.profile.name}
									</p>
								) : null;
							})}
						</div>
					</div>

					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Language:
						</p>
						<p className="text-highlight dark:text-highlight-dark">
							{language}
						</p>
					</div>

					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Release Date:
						</p>
						<p className="text-highlight dark:text-highlight-dark">
							{convertDate(releaseDate)}
						</p>
					</div>

					<div className="flex">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
							Genres:
						</p>
						<div className="flex space-x-2">
							{genres.map((g) => {
								return (
									<p
										key={g}
										className="text-highlight dark:text-highlight-dark">
										{g}
									</p>
								);
							})}
						</div>
					</div>

					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Type:
						</p>
						<p className="text-highlight dark:text-highlight-dark">{type}</p>
					</div>
				</div>
				<div className="mt-5">
					<h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
						Cast:
					</h1>
					<div className="grid grid-cols-10">
						{cast.map((c) => {
							return (
								<div key={c.profile.id} className="flex flex-col items-center">
									<img
										className="w-24 h-24 aspect-square object-cover rounded-full"
										src={c.profile.avatar}
										alt=""></img>
									<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
										{c.profile.name}
									</p>
									<span className="text-light-subtle dark:text-dark-subtle text-sm">
										as
									</span>
									<p className="text-light-subtle dark:text-dark-subtle ">
										{c.roleAs}
									</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="mt-3">
					<RelatedMovies movieId={movieId}></RelatedMovies>
				</div>
			</Container>
		</div>
	);
}