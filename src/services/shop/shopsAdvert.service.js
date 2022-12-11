import modal from '@/constants/modal';
import { http } from '@/plugins/http.js';


class ShopsAdvertService {
    constructor({modal, http}) {
        this.modal = modal;
        this.http = http;
    };
    
    async getAllAdverts({page = 1, limit = 25}){
        const url = "https://www.itemsatis.com/api";
        const response = await this.asyncHelper.runAsync(this.http.get, url + `/shop/advert/v1/getAll?page=${page}&limit=${limit}`);
        console.log(response);
        return response.data;
    }
}

const shopsAdvertService = new ShopsAdvertService({modal, http});
export {shopsAdvertService};