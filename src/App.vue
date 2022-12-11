<template>
  <a-config-provider :locale="hexLocales[locale]">
    <ThemeProvider
        :theme="{
        ...config.theme,
        ...config,
      }"
    >
      <Suspense>
        <template #default>
          <router-view></router-view>
        </template>
        <template #fallback>
          <div class="spin">
            <a-spin/>
          </div>
        </template>
      </Suspense>
    </ThemeProvider>
  </a-config-provider>
</template>

<script setup>
import {ThemeProvider} from "vue3-styled-components";
import {useI18n} from "vue-i18n";
import {useConfigStore} from "@/store/config/config.store";
import {provide, computed} from "vue";
import en_US from "ant-design-vue/es/locale/en_US";
import tr_TR from "ant-design-vue/es/locale/tr_TR";

const {t, locale} = useI18n({useScope: "global"});
const configStore = useConfigStore();

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
const config = computed(() => configStore.getConfig);

const checkLocalStorageCache = ({key, empty, cached}) => {
  const time = JSON.parse(localStorage.getItem(key) || "0");
  if (Math.floor(Date.now() / 1000) > time) {
    empty();
  } else {
    cached();
  }
}

const setLocalStorageCache = ({key, value, timeKey, time = 1800}) => {
  localStorage.setItem(timeKey, JSON.stringify(Math.floor(Date.now() / 1000) + time));
  localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorageCache = ({key, def}) => {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(def))
}

const handleFileError = (err) => {
  return null;
}


const getFileBlob = async file => {

  const res = await fetch(file).catch(handleFileError);
  if (res) {
    return res.blob().catch(handleFileError);
  }
  return null;
};

const hexLocales = {
  tr: tr_TR,
  en: en_US,
};

const useUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36);
}

provide("debounce", debounce);
provide("checkLocalStorageCache", checkLocalStorageCache);
provide("setLocalStorageCache", setLocalStorageCache);
provide("getFromLocalStorageCache", getFromLocalStorageCache)
provide("getFileBlob", getFileBlob);
provide("useUniqueId", useUniqueId)
</script>
