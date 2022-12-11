<template>
  <div class="nav-author">
    <sdDropdown placement="bottomRight" :action="['click']">
      <template #overlay>
        <NavAuth>
          <a
              v-for="(lang, index) in availableLocales"
              :key="lang + '_' + index"
              @click="() => changeLanguage(lang)"
              to="#"
          >
            <img
                :src="languages[lang].image"
                :alt="t(`${languages[lang].key}`)"
            >
            <span>{{ t(`${languages[lang].key}`) }}</span>
          </a>
        </NavAuth>
      </template>
      <a to="#" class="head-example">
        <img :src="languages[locale].image" alt=""/>
      </a>
    </sdDropdown>
  </div>
</template>

<script setup>
import {NavAuth} from "../style"
import {useI18n} from "vue-i18n";

const {t, locale, availableLocales} = useI18n({useScope: "global"});

const languages = {
  tr: {
    image: process.env.BASE_URL + "images/flags/turkey.png",
    key: "turkish"
  },
  en: {
    image: process.env.BASE_URL + "images/flags/english.png",
    key: "english"
  }
}

const changeLanguage = (lang) => {
  locale.value = lang;
}
</script>