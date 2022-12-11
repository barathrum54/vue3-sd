import mitt from 'mitt';
// import { VueMasonryPlugin } from 'vue-masonry/src/masonry-vue3.plugin';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueApexCharts from 'vue3-apexcharts';
import VCalendar from 'v-calendar';

library.add(fas);
const emitter = mitt();


export const useAnotherPlugins = (app) => {
    app.config.globalProperties.emitter = emitter;
  //  app.use(VueMasonryPlugin);
    app.use(VueApexCharts);
    app.use(VCalendar, {});
    app.component('font-awesome-icon', FontAwesomeIcon);
}
