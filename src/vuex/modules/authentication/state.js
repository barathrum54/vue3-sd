import Cookies from 'js-cookie';
import CookieConstants from "@/constants/cookie/cookie.constants";

const initialState = {
    token: Cookies.get(CookieConstants.AUTH.TOKEN_BASE),
    SocketToken: Cookies.get(CookieConstants.AUTH.TOKEN_SOCKET),
    isAuthenticated: !!Cookies.get(CookieConstants.AUTH.TOKEN_BASE) ? true : false,
    
}

export default () => ({
    ...initialState,
    userType: "shop"
})