import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotification } from "../../hooks";
import { uploadTrailer } from "../../api/movie";
import MovieForm from "./MovieForm";

export default function MovieUpload() {
	const { updateNotification } = useNotification();
	const [isVideoSelected, setIsVideoSelected] = useState(false);
	const [isVideoUploaded, setIsVideoUploaded] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [videoInfo, setVideoInfo] = useState({});
	const [movieInfo, setMovieInfo] = useState({});

	const handleTrailerUpload = async (formData) => {
		const { public_id, url, error } = await uploadTrailer(
			formData,
			setUploadProgress
		);
		if (error) return updateNotification("error", error);
		setIsVideoUploaded(true);
		setVideoInfo({ url, public_id });
	};

	const onFileUpload = async (file) => {
		setIsVideoSelected(true);
		const formData = new FormData();
		formData.append("video", file);
		handleTrailerUpload(formData);
	};

	const onTypeError = (error) => {
		updateNotification("error", error);
	};

	const getUploadProgressMessage = () => {
		if (uploadProgress >= 100) return "Processing";
		return `Upload Progress ${uploadProgress}%`;
	};

	console.log(videoInfo);

	return (
		<div
			className="fixed inset-0 dark:bg-white dark:bg-opacity-40 bg-primary bg-opacity-40 backdrop-blur-sm
			flex items-center justify-center">
			<div
				className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] 
				overflow-auto p-2 custom-scroll-bar">
				{/* <UploadProgress
					visible={!isVideoUploaded && isVideoSelected}
					message={getUploadProgressMessage()}
					width={uploadProgress}></UploadProgress>
				<TrailerUploader
					visible={!isVideoSelected}
					onFileUpload={onFileUpload}
					onTypeError={onTypeError}></TrailerUploader> */}
				<MovieForm></MovieForm>
			</div>
		</div>
	);
}

const TrailerUploader = ({ visible, onTypeError, onFileUpload }) => {
	if (!visible) return null;
	return (
		<div className="h-full flex items-center justify-center">
			<FileUploader
				onTypeError={onTypeError}
				handleChange={onFileUpload}
				types={["mp4", "avi"]}>
				<div
					className="w-48 h-48 border border-dashed dark:border-dark-subtle 
							border-light-subtle rounded-full flex items-center justify-center flex-col
							text-secondary dark:text-dark-subtle cursor-pointer ">
					<AiOutlineCloudUpload size={80}></AiOutlineCloudUpload>
					<p>Drop your files here!</p>
				</div>
			</FileUploader>
		</div>
	);
};

const UploadProgress = ({ visible, width, message }) => {
	if (!visible) return null;
	return (
		<div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
			<div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
				<div
					style={{ width: width + "%" }}
					className="h-full absolute left-0 dark:bg-white
				bg-secondary"></div>
			</div>
			<p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
				{message}
			</p>
		</div>
	);
};
