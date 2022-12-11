import {useHttps} from "@/config/http/http.js";

const getFaqListServices = async () => {
	const https = useHttps();
	const response = await https.post("/merchant/v1/getHelpList", {});
    return response.data;
};
const getFaqSearchListServices = async (searchKey) => {
	const https = useHttps();
	const response = await https.post("/merchant/v1/getHelpList", `query=${searchKey}`)
	return response.data
}
const setSupportVote = async (id,vote) => {
	const https = useHttps();
	const response = await https.post("/voteContent", 	`Vote=${vote}&postID=${id}`);
	return response;
};
export {
	getFaqListServices,
	setSupportVote,
	getFaqSearchListServices,
};
