import {useHttps} from "@/config/http/http.js";

const getSupportListServices = async () => {
	const https = useHttps();
	const response = await https.post("/getTickets", {});
    return response;
};
const getSupportDetailServices = async (id) => {
	const https = useHttps();
	const response = await https.post("/getTicketDetails", {Id:id});
    return response;
};
const getSupportCategoriesServices = async () => {
	const https = useHttps();
	const response = await https.post("/getSupportCategories", {});
    return response.data;
};
const sendNewTicketServices = async (formState) => {
	const https = useHttps();
	const formData = new FormData();
	formData.append("talepBaslik",formState.requestHeader)
	formData.append("talepKategori",formState.requestCategory)
	formData.append("icerik",formState.supportRequest)
	formState.fileList.forEach((item) => {
		formData.append("ticketImages[]",item)
	})
	const response = await https.post("/NewTicket", formData);
    return response.data;
}

const replyTicketServices = async (formState) => {
	console.log(formState);
	const https = useHttps();
	const formData = new FormData();
	formData.append("ticketID",formState.ticketId)
	formData.append("message",formState.replyMessage)
	formState.fileList.forEach((item) => {
		formData.append("ticketImages[]",item)
	})
	const response = await https.post("/replyTicket", formData);
    return response.data;
}

const closeMyTicketServices = async (tickedId) => {
	const https = useHttps();
	const formData = new FormData();
	formData.append("ticketID",tickedId)
	const response = await https.post("/closeMyTicket", formData);
    return response.data;
}

export {
	getSupportListServices,
	getSupportDetailServices,
	getSupportCategoriesServices,
	sendNewTicketServices,
	replyTicketServices,
	closeMyTicketServices
};
