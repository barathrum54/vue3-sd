export default {
    setLoggedIn({commit, dispatch}, result) {
        commit('setTokens', {token: result.token, SocketToken: result.SocketToken});
            dispatch('setUser', result.result);
    },
    setLoggedOut({commit, dispatch}) {
        commit('clearTokens');
        dispatch('setUser', null);
    }
}