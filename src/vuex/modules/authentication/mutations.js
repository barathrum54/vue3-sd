import Cookies from 'js-cookie';
import CookieConstants from "@/constants/cookie/cookie.constants";

export default {
    setTokens(state, {token, SocketToken}) {
        state.token = token;
        state.SocketToken = SocketToken;
        state.isAuthenticated = true;
        Cookies.set(CookieConstants.AUTH.TOKEN_BASE, token);
        Cookies.set(CookieConstants.AUTH.TOKEN_SOCKET, SocketToken);
    },
    clearTokens(state) {
        state.token = null;
        state.SocketToken = null;
        state.isAuthenticated = false;
        Cookies.remove(CookieConstants.AUTH.TOKEN_BASE);
        Cookies.remove(CookieConstants.AUTH.TOKEN_SOCKET);
    }
}