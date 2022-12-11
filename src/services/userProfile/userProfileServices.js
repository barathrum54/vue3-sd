import {useHttps} from "@/config/http/http.js";

const getUserProfileDataServices = async (id) => {
    const https = useHttps();
    const response = await https.post("/merchant/v1/getProfileData", `Id=${id}`);
    return response.data;
};
const getUserProfileAdvertDataServices = async (id,page) => {
    const https = useHttps();
    const response = await https.post("/merchant/v1/getProfileAdverts",`UserId=${id}&Page=${page}&Limit=${8}`)
    return response.data;
};
const followUserServices = async (id) => {
    const https = useHttps()
    const response = await https.post("/followUser",`userID=${id}`)
    return response.data
}
const unFollowUserServices = async (id) => {
    const https = useHttps()
    const response = await https.post("/unfollowUser",`userID=${id}`)
    return response.data
}
// SADECE PROFİLDEN SMS GÖNDERİLMEK İÇİN YAZILMIŞ SERVİS. İLAN DETAYLARINDAN SMS GÖNDERİLEMEYECEĞİ İÇİN ŞU ANDA İLAN İÇİN DÜZENLENMEDİ -Ersin
const sendSMSUserServices = async (userId,id) => {
    const https= useHttps()
    const response = await https.post("/sendSMSUser", {
            postID:userId,
            smsSablonu:id}
    )
    return response.data
}
export {
    getUserProfileDataServices,
    getUserProfileAdvertDataServices,
    followUserServices,
    unFollowUserServices,
    sendSMSUserServices
};
