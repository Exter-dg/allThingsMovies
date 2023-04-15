import React from "react";
import TagsInput from "../TagsInput";

const commonClasses = ` w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle 
		dark:focus:border-white focus:border-primary transition dark:text-white text-primary `;

export default function MovieForm() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className="flex space-x-3">
			<div className="w-[70%] h-5 space-y-5">
				<Label htmlFor="title">Title</Label>
				<div>
					<input
						id="title"
						type="text"
						className={commonClasses + "border-b-2 font-semibold  text-xl"}
						placeholder="Titanic"></input>
				</div>
				<div>
					<Label htmlFor="storyline">Story Line</Label>
					<textarea
						id="storyline"
						className={commonClasses + "border-b-2 resize-none h-24"}
						placeholder="Movie story line..."></textarea>
				</div>
				<TagsInput></TagsInput>
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
