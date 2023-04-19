import React from "react";
import TagsInput from "../TagsInput";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../LiveSearch";

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

export default function MovieForm() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const renderItem = (result) => {
		return (
			<div key={result.key} className="flex space-x-2 rounded overflow-hidden">
				<img
					src={result.avatar}
					alt={result.name}
					className="w-16 h-16 object-cover"></img>
				<p className="dark:text-white font-semibold">{result.name}</p>
			</div>
		);
	};

	return (
		<form onSubmit={handleSubmit} className="flex space-x-3">
			<div className="w-[70%] h-5 space-y-5">
				<Label htmlFor="title">Title</Label>
				<div>
					<input
						id="title"
						type="text"
						className={commonInputClasses + "border-b-2 font-semibold  text-xl"}
						placeholder="Titanic"></input>
				</div>
				<div>
					<Label htmlFor="storyline">Story Line</Label>
					<textarea
						id="storyline"
						className={commonInputClasses + "border-b-2 resize-none h-24"}
						placeholder="Movie story line..."></textarea>
				</div>
				<div>
					<Label htmlFor="tags"></Label>
					<TagsInput name="tags"></TagsInput>
				</div>
				<LiveSearch
					placeholder="Search Profile..."
					results={results}
					onSelect={(result) => console.log(result)}
					renderItem={renderItem}></LiveSearch>
			</div>
			<div className="w-[30%] h-5 bg-blue-400"></div>
		</form>
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
