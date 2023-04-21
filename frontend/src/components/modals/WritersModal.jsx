import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

export default function WritersModal({
	profiles = [],
	visible,
	onClose,
	onRemoveClick,
}) {
	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
			<div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
				{profiles.map(({ id, name, avatar }) => {
					return (
						<div key={id} className="flex space-x-3">
							<img
								className="w-16 h-16 rounded aspect-square object-cover"
								src={avatar}
								alt={name}></img>
							<p className="font-semibold dark:text-white text-primary flex-grow">
								{name}
							</p>
							<button
								type="button"
								onClick={() => onRemoveClick(id)}
								className="dark:text-white text-primary hover:opacity-80 transition p-2">
								<AiOutlineClose></AiOutlineClose>
							</button>
						</div>
					);
				})}
			</div>
		</ModalContainer>
	);
}
