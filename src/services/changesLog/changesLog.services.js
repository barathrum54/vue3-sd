import {useHttps} from "@/config/http/http.js";

const getAppChangesLogServices = async (page,limit) => {
	const https = useHttps();
	const response = await https.post("/getAppChangelogs", {CategoryId:"2",Limit:limit,Page:page});
    return response.data;
};

export{
    getAppChangesLogServices,
}