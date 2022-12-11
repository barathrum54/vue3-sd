
import {usePlugins} from "@/plugins/plugins.config";
import './static/css/style.css';
import {createApp} from "vue";
import App from "./App.vue";
import 'ant-design-vue/dist/antd.less';
import i18n from './i18n.js'
import { createPinia } from 'pinia'
import router from "@/router/router.config";
import store from "@/vuex/store.js";

import itemsatis from "@/plugins/itemsatis.js";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@/config/styles/variables.scss';
import '@/config/styles/global.scss';
import '@/config/styles/override.scss';
import '@/config/styles/responsive/xs/xs.scss';
import '@/config/styles/responsive/sm/sm.scss';
import '@/config/styles/responsive/md/md.scss';
import '@/config/styles/responsive/lg/lg.scss';
import '@/config/styles/responsive/xl/xl.scss';
import '@/config/styles/responsive/xxl/xxl.scss';
import '@/config/styles/transition/transition.scss';

(async() => {
    const app = createApp(App)
    app.config.productionTip = false;
    await usePlugins(app)
    app.use(i18n);
    app.use(store);
    app.use(createPinia())
    app.use(router);
    app.use(itemsatis)
    app.use(VueSweetalert2);
    app.mount('#app');
})()