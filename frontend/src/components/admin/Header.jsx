import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../hooks";

export default function Header({ onAddMovieClick, onAddActorClick }) {
	const [showOptions, setShowOptions] = useState(false);
	const { toggleTheme } = useTheme();
	const options = [
		{ title: "Add Movie", onClick: onAddMovieClick },
		{ title: "Add Actor", onClick: onAddActorClick },
	];

	return (
		<div className="flex items-center justify-between relative">
			<input
				type="text"
				className="border-2 dark:border-dark-subtle border-light-subtle 
					dark:focus:border-white focus:border-primary dark:text-white transition 
					bg-transparent rounded text-lg p-1 outline-none "
				placeholder="Search Movies... "></input>
			<div className="flex items-center space-x-3">
				<button
					className="dark:text-white text-light-subtle"
					onClick={toggleTheme}>
					<BsFillSunFill size={24}></BsFillSunFill>
				</button>
				<button
					className="flex items-center space-x-2 border-secondary
					dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle
				 hover:opacity-80 transition font-semibold rounded border-2 text-lg px-3 py-1"
					onClick={() => setShowOptions(true)}>
					<span>Create</span>
					<AiOutlinePlus></AiOutlinePlus>
				</button>
			</div>
			<CreateOptions
				options={options}
				visible={showOptions}
				onClose={() => setShowOptions(false)}></CreateOptions>
		</div>
	);
}

const CreateOptions = ({ options, visible, onClose }) => {
	const container = useRef();
	const containerID = "option-container";

	useEffect(() => {
		const handleClose = (e) => {
			if (!visible) return;
			const { parentElement, id } = e.target;
			if (parentElement?.id === containerID || id === containerID) return;

			if (container.current) {
				if (!container.current.classList.contains("animate-scale"))
					container.current.classList.add("animate-scale-reverse");
			}
		};

		document.addEventListener("click", handleClose);
		return () => {
			document.removeEventListener("click", handleClose);
		};
	}, [visible]);

	const handleAnimationEnd = (e) => {
		if (e.target.classList.contains("animate-scale-reverse")) onClose();
		e.target.classList.remove("animate-scale");
	};

	const handleClick = (fn) => {
		fn();
		onClose();
	};

	if (!visible) return null;
	return (
		<div
			className="absolute top-12 right-0 flex flex-col space-y-3 p-5 dark:bg-secondary 
					bg-white drop-shadow-lg rounded animate-scale"
			id={containerID}
			onAnimationEnd={handleAnimationEnd}
			ref={container}>
			{options.map(({ title, onClick }) => {
				return (
					<Option key={title} onClick={() => handleClick(onClick)}>
						{title}
					</Option>
				);
			})}
		</div>
	);
};

const Option = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className="dark:text-white text-secondary hover:opacity-80 transition">
			{children}
		</button>
	);
};
