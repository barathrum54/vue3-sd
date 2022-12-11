import IsImage from "@/components/image/isImage";
import Skeleton from "@/components/skeleton/Skeleton";
import {InputMask} from "@/directives/inputMask.js";
import {useApi} from "@/config/api/api";
import input from "@/components/input/input"
import config from "@/constants/config"

export default {
    install : (app, options) => {
        const api = useApi();
        app.component("is-input",input)
        app.component("is-image", IsImage);
        app.component("is-skeleton", Skeleton);
        app.directive("is-mask", InputMask);
        app.config.globalProperties.$api = api;
        app.use(config)
    }
}