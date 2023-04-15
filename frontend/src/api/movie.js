import client from "./client";

export const uploadTrailer = async (formData, onProgressCallback) => {
	try {
		const token = localStorage.getItem("auth-token");
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
		const { response } = err;
		if (response?.data) return response.data;
		return err.message || err;
	}
};
