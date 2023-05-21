import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReview = async (id, reviewData) => {
	try {
		const token = getToken();
		const { data } = await client.post("/review/add" + id, reviewData, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return data;
	} catch (err) {
		return catchError(err);
	}
};
