import React, { useState } from "react";
import TagsInput from "../TagsInput";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../LiveSearch";
import Submit from "../form/Submit";
import { useNotification } from "../../hooks";
import ModalContainer from "../modals/ModalContainer";
import WritersModal from "../modals/WritersModal";
import CastForm from "../form/CastForm";
import CastModal from "../modals/CastModal";

export const results = [
	{
		id: 1,
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
		name: "John Doe",
	},
	{
		id: 2,
		avatar:
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
		name: "John Doe2",
	},
	{
		id: 3,
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
		name: "John Doe3",
	},
	{
		id: 4,
		avatar:
			"https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		name: "John Doe4",
	},
];

const defaultMovieInfo = {
	title: "",
	storyLine: "",
	tags: [],
	cast: [],
	director: {},
	writers: [],
	releaseDate: "",
	poster: null,
	genres: [],
	type: "",
	language: "",
	status: "",
};

export const renderItem = (result) => {
	return (
		<div key={result.id} className="flex space-x-2 rounded overflow-hidden">
			<img
				src={result.avatar}
				alt={result.name}
				className="w-16 h-16 object-cover"></img>
			<p className="dark:text-white font-semibold">{result.name}</p>
		</div>
	);
};

export default function MovieForm() {
	const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
	const [showWritersModal, setShowWritersModal] = useState(false);
	const [showCastModal, setShowCastModal] = useState(false);

	const { updateNotification } = useNotification();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(movieInfo);
	};

	const handleChange = ({ target }) => {
		const { value, name } = target;
		setMovieInfo({ ...movieInfo, [name]: value });
	};

	const updateTags = (tags) => {
		setMovieInfo({ ...movieInfo, tags });
	};

	const updateDirector = (profile) => {
		setMovieInfo({ ...movieInfo, director: profile });
	};

	const updateCast = (newCast) => {
		const { cast } = movieInfo;
		setMovieInfo({ ...movieInfo, cast: [...cast, newCast] });
	};

	const updateWriters = (profile) => {
		const { writers } = movieInfo;
		for (let writer of writers) {
			if (writer.id === profile.id) {
				return updateNotification(
					"warning",
					"This profile is already selected"
				);
			}
		}

		setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
	};

	const handleWritersRemove = (profileId) => {
		const { writers } = movieInfo;
		const newWriters = writers.filter(({ id }) => id !== profileId);
		if (newWriters.length === 0) setShowWritersModal(false);
		setMovieInfo({ ...movieInfo, writers: [...newWriters] });
	};

	const handleCastRemove = (profileId) => {
		const { cast } = movieInfo;
		const newCast = cast.filter(({ profile }) => profile.id !== profileId);
		if (newCast.length === 0) setShowCastModal(false);
		setMovieInfo({ ...movieInfo, cast: [...newCast] });
	};

	const { title, storyLine, director, writers, cast } = movieInfo;
	return (
		<>
			<div className="flex space-x-3">
				<div className="w-[70%] h-5 space-y-5">
					<Label htmlFor="title">Title</Label>
					<div>
						<input
							id="title"
							value={title}
							onChange={handleChange}
							name="title"
							type="text"
							className={
								commonInputClasses + "border-b-2 font-semibold  text-xl"
							}
							placeholder="Titanic"></input>
					</div>
					<div>
						<Label htmlFor="storyline">Story Line</Label>
						<textarea
							id="storyline"
							value={storyLine}
							onChange={handleChange}
							name="storyLine"
							className={commonInputClasses + "border-b-2 resize-none h-24"}
							placeholder="Movie story line..."></textarea>
					</div>
					<div>
						<Label htmlFor="tags">Tags</Label>
						<TagsInput name="tags" onChange={updateTags}></TagsInput>
					</div>
					<div>
						<Label htmlFor="director">Director</Label>
						<LiveSearch
							name="director"
							value={director.name}
							placeholder="Search Profile..."
							results={results}
							onSelect={updateDirector}
							renderItem={renderItem}></LiveSearch>
					</div>
					<div>
						<div className="flex justify-between">
							<LabelWithBadge badge={writers.length} htmlFor="writers">
								Writers
							</LabelWithBadge>
							<ViewAllButton
								visible={writers.length}
								onClick={() => setShowWritersModal(true)}>
								View All
							</ViewAllButton>
						</div>
						<LiveSearch
							name="writers"
							placeholder="Search Profile..."
							results={results}
							onSelect={updateWriters}
							renderItem={renderItem}></LiveSearch>
					</div>
					<div>
						<div className="flex justify-between">
							<LabelWithBadge badge={cast.length} htmlFor="writers">
								Add Cast & Crew
							</LabelWithBadge>
							<ViewAllButton
								onClick={() => setShowCastModal(true)}
								visible={cast.length}>
								View All
							</ViewAllButton>
						</div>
						<CastForm onSubmit={updateCast}></CastForm>
					</div>
					<Submit value="Upload" onClick={handleSubmit} type="button"></Submit>
				</div>
				<div className="w-[30%] h-5 bg-blue-400"></div>
			</div>
			<WritersModal
				visible={showWritersModal}
				onRemoveClick={handleWritersRemove}
				profiles={writers}
				onClose={() => setShowWritersModal(false)}></WritersModal>

			<CastModal
				visible={showCastModal}
				casts={cast}
				onClose={() => setShowCastModal(false)}
				onRemoveClick={handleCastRemove}></CastModal>
		</>
	);
}

const Label = ({ children, htmlFor }) => {
	return (
		<label
			htmlFor={htmlFor}
			className="dark:text-dark-subtle text-light-subtle font-semibold">
			{children}
		</label>
	);
};

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
	const renderBadge = () => {
		if (!badge) return null;
		return (
			<span
				className="dark:bg-dark-subtle bg-light-subtle absolute top-0 right-0
				w-5 h-5 rounded-full flex justify-center items-center text-white
				translate-x-1 -translate-y-2 text-xs">
				{badge <= 9 ? badge : "9+"}
			</span>
		);
	};
	return (
		<div className="relative">
			<Label htmlFor={htmlFor}>{children}</Label>
			{renderBadge()}
		</div>
	);
};

const ViewAllButton = ({ visible, children, onClick }) => {
	if (!visible) return null;
	return (
		<button
			onClick={onClick}
			type="button"
			className="dark:text-white text-primary
hover:underline transition">
			{children}
		</button>
	);
};
