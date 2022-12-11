import store from "@/vuex/store";

class Modal {
    constructor(store) {
        this.store = store;
    }

    startLoader(){
        // store.dispatch(startLoader());
    }

    stopLoader(){
        // store.dispatch(stopLoader());
    }
}

export default new Modal(store);