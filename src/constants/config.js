const config = {
    BASE_API_URL: {
        UPLOAD: "https://cdn.itemsatis.com/uploads",
        ITEMSATIS: "https://www.itemsatis.com/api",
        IS_AVATAR: "https://cdn.itemsatis.com/avatar/",
        IS_CDN: "https://cdn.itemsatis.com/",
        MERCHANT: "http://194.5.236.89:3500/api"
    }
}
import {useApi} from "@/config/api/api";

const useConfig = () => config;
const api = useApi();

const install = (app, options) => {
    app.config.globalProperties.$api = config.BASE_API_URL;
    app.config.globalProperties.$api = api;

}

export default {
    install,
    useConfig,
}