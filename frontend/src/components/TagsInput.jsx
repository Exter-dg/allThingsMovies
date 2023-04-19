import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function TagsInput() {
	const [tag, setTag] = useState("");
	const [tags, setTags] = useState([]);

	const input = useRef();
	const tagsInput = useRef();

	const handleOnChange = ({ target }) => {
		const { value } = target;
		if (value !== ",") setTag(value);
	};

	const handleKeyDown = ({ key }) => {
		if (key === "," || key === "Enter") {
			console.log(tags, tag);
			if (!tag) return;
			if (tags.includes(tag)) return setTag("");
			setTags([...tags, tag]);
			setTag("");
		}
		if (key === "Backspace" && tags.length && !tag) {
			const newTags = tags.filter((_, index) => index !== tags.length - 1);
			setTags([...newTags]);
		}
	};

	const removeTag = (tagToRemove) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		setTags([...newTags]);
	};

	const handleOnFocus = () => {
		tagsInput.current.classList.remove(
			"dark:border-dark-subtle",
			"border-light-subtle"
		);
		tagsInput.current.classList.add("dark:border-white", "border-primary");
	};

	const handleOnBlur = () => {
		tagsInput.current.classList.add(
			"dark:border-dark-subtle",
			"border-light-subtle"
		);
		tagsInput.current.classList.remove("dark:border-white", "zborder-primary");
	};

	useEffect(() => {
		input.current.scrollIntoView();
	}, [tag]);

	return (
		<div>
			<div
				ref={tagsInput}
				onKeyDown={handleKeyDown}
				className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle
				px-2 h-10 rounded w-full dark:text-white flex items-center space-x-2 overflow-x-auto
				custom-scroll-bar transition">
				{tags.map((tag) => (
					<Tag onClick={() => removeTag(tag)} key={tag}>
						{tag}
					</Tag>
				))}
				<input
					ref={input}
					type="text"
					value={tag}
					onChange={handleOnChange}
					placeholder="Tag one, Tag two"
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
					className="h-full flex-grow	 bg-transparent outline-none dark:text-white"></input>
			</div>
		</div>
	);
}

const Tag = ({ children, onClick }) => {
	return (
		<span
			className="dark:bg-white bg-primary dark:text-primary 
	text-white flex items-center text-sm px-1 whitespace-nowrap">
			{children}
			<button type="button" onClick={onClick}>
				<AiOutlineClose></AiOutlineClose>
			</button>
		</span>
	);
};
