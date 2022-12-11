import modal from '@/constants/modal';
import { http } from '@/plugins/http.js';


class ShopsMainService {
    constructor({modal, http}) {
        this.modal = modal;
        this.http = http;
    }

    async getDailyReports() {
        const url = "https://www.itemsatis.com/api";
        const response = await this.asyncHelper.runAsync(this.http.get, url + "/shop/main/v1/dailyReport");
        return response.data;
    };

    async getChartForLast30Days() {
        const url = "https://www.itemsatis.com/api";
        const response = await this.asyncHelper.runAsync(this.http.get, url + "/shop/purchase/v1/chartForLast30Days");
        return response.data;
    };

    async getLastPurchases(){
        const url = "https://www.itemsatis.com/api";
        const response = await this.asyncHelper.runAsync(this.http.get, url + "/shop/purchase/v1/lastPurchases");
        return response.data;
    };

    async getLastNotifications(){
        const url = "https://www.itemsatis.com/api";
        const response = await this.asyncHelper.runAsync(this.http.get, url + "/shop/notification/v1/lastNotifications");
        return response.data;
    };

}

const shopsMainService = new ShopsMainService({modal, http});
export {shopsMainService};