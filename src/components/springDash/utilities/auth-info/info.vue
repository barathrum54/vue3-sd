<template>
  <InfoWraper>
    <Message/>
    <Notification/>
    <!-- <Settings/> -->
    <Support/>
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

    <div class="nav-author">
      <sdPopover placement="bottomRight" action="click">
        <template v-slot:content>
          <UserDropDwon>
            <div class="user-dropdwon">
              <figure class="user-dropdwon__info">
                <is-image
                    :source="$api.CDN_AVATAR_API + avatar"
                    :width="60"
                    :height="60"
                    fit="cover"
                    radius="4px"
                ></is-image>
                <figcaption>
                  <sdHeading as="h5">{{ username }}</sdHeading>
                  <p>{{ t(`userTypes.${userType}.title`) }}</p>
                </figcaption>
              </figure>
              <ul class="user-dropdwon__links">
                <li>
                  <a to="#">
                    <sdFeatherIcons type="user"/>
                    {{ t('base.pages.profile') }} </a>
                </li>
                <li>
                  <router-link to="/settings/profileInfos">
                    <sdFeatherIcons type="settings"/>
                    {{ t('base.pages.settings') }} </router-link>
                </li>
                <li>
                  <a to="#">
                    <sdFeatherIcons type="dollar-sign"/>
                    Billing </a>
                </li>
                <li>
                  <a to="#">
                    <sdFeatherIcons type="users"/>
                    {{ t('base.pages.activity') }} </a>
                </li>
                <li>
                  <a to="#">
                    <sdFeatherIcons type="bell"/>
                    {{ t('base.pages.help') }} </a>
                </li>
              </ul>
              <a @click="SignOut" class="user-dropdwon__bottomAction" href="#">
                <LogoutOutlined/>
                {{ t('base.auth.signOut') }}
              </a>
            </div>
          </UserDropDwon>
        </template>
        <a to="#" class="head-example">
          <a-avatar
              :src="$api.CDN_AVATAR_API + avatar"
              shape="square"
          />
        </a>
      </sdPopover>
    </div>
  </InfoWraper>
</template>

<script setup>
import {InfoWraper, NavAuth, UserDropDwon} from "./auth-info-style";
import Support from "./Support";
import Notification from "./Notification";
import Message from "./Message";
import {useRouter} from "vue-router";
import {computed} from "vue";
import {LogoutOutlined} from "@ant-design/icons-vue";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/store/auth/auth.store";
import {useUserStore} from "@/store/user/user.store.js";


const {push} = useRouter();
const userStore = useUserStore();

const avatar = computed(() => userStore.getAvatar);
const username = computed(() => userStore.getUsername);
const userType = computed(() => userStore.getUserType)

const SignOut = (e) => {
  e.preventDefault();
  const authStore = useAuthStore();
  userStore.clearUser();
  authStore.clearTokens();
  push("/auth/signin");
}
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
<style scoped>
.image {
  border-radius: 8%;
  object-fit: cover;
}
</style>