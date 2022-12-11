import {shopsMainService} from "@/services/shop/main/shopsMain.service";

export default {
    async setLast30DayChart({commit}) {
        const {data} = await shopsMainService.getChartForLast30Days();
        commit('setLast30DayChart', data);
    }
}