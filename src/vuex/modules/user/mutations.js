export default {
    setUser(state, user){
        if(!!!user) {
            state.user = {};
            return;
        }
        state.user = user;
    }
}