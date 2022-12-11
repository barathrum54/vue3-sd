import {defineStore} from "pinia";
import config from "@/config/config";

export const useConfigStore = defineStore("configStore", {
    state: () => ({
        config
    }),
    getters: {
        getConfig() {
            return this.config;
        },
        getTheme() {
            return this.config.theme
        },
        getTopMenu() {
            return this.config.topMenu;
        },
        getDarkMode() {
            return this.config.darkMode;
        }
    },
    actions: {
        setDarkMode(mode) {
            return this.config.darkMode = mode;
        }
    }
});