import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

import purchase from "./purchase";
import adverts from "./adverts";


export default {
    namespaced: true,
    state,
    mutations,
    actions,

    // inheritance
    modules: {
        purchase,
        adverts
    }
}