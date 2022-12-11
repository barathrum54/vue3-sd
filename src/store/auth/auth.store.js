import { defineStore } from "pinia";
import Cookies from "js-cookie";
import CookieConstants from "@/constants/cookie/cookie.constants";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: Cookies.get("token"),
    SocketToken: Cookies.get("socketToken"),
    isAuthenticated: !!Cookies.get("token"),
    provider: "",
  }),
  getters: {
    getToken() {
      return this.token;
    },
    getSocketToken() {
      return this.socketToken;
    },
    getProvider() {
      return this.provider;
    },
  },
  actions: {
    setProvider(provider) {
      this.provider = provider;
    },
    setTokens({token, SocketToken}) {
      this.token = token;
      this.SocketToken = SocketToken;
      this.isAuthenticated = true;
      Cookies.set("token", token);
      Cookies.set("socketToken", SocketToken);
    },
    clearTokens() {
      this.token = null;
      this.SocketToken = null;
      this.isAuthenticated = false;
      Cookies.remove("token");
      Cookies.remove("socketToken");
    },
  },
});
