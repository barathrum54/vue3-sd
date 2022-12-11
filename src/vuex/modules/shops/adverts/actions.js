import {shopsAdvertService} from "@/services/shop/shopsAdvert.service.js"

export default {
    async setAllAdverts({commit}, {page = 0, limit = 25}) {
        commit("setAllLoading");
        const data = await shopsAdvertService.getAllAdverts({page, limit});
        if(!data || !data.success) return;
        commit("setAllAdverts", data.data);
    }
}