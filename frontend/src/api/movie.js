import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const uploadTrailer = async (formData, onProgressCallback) => {
	try {
		const token = getToken();
		const { data } = await client.post("/movie/upload-trailer", formData, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "multipart/form-data",
			},
			onUploadProgress: ({ loaded, total }) => {
				onProgressCallback(Math.floor((loaded / total) * 100));
			},
		});
		return data;
	} catch (err) {
		return catchError(err);
	}
};
