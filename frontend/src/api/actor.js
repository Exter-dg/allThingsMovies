import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createActor = async (formData) => {
	const token = getToken();
	try {
		const { data } = await client.post("/actor/create", formData, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	} catch (err) {
		return catchError(err);
	}
};
