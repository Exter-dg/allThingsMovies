import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import MovieForm from "../admin/MovieForm";
import { updateMovie } from "../../api/movie";
import { useNotification } from "../../hooks";

export default function UpdateMovie({
	visible,
	initialState,
	onSuccess,
	onClose,
}) {
	const [busy, setBusy] = useState(false);
	const { updateNotification } = useNotification();

	const handleSubmit = async (data) => {
		setBusy(true);
		const { error, movie, message } = await updateMovie(initialState.id, data);
		setBusy(false);

		if (error) return updateNotification("error", error);
		updateNotification("success", message);
		onSuccess(movie);
		onClose();
	};

	return (
		<ModalContainer visible={visible}>
			<MovieForm
				btnTitle="Update"
				busy={busy}
				initialState={initialState}
				onSubmit={busy ? null : handleSubmit}></MovieForm>
		</ModalContainer>
	);
}