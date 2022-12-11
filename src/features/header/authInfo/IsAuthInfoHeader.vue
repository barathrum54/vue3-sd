<template>
  <InfoWraper>
    <Message/>
    <Notification/>
    <!-- <Settings/> -->
    <Support/>
    <is-auth-info-theme-toggle></is-auth-info-theme-toggle>
    <is-auth-info-i18n-popover></is-auth-info-i18n-popover>

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
                  <router-link :to="`/profile/${userId}`">
                    <sdFeatherIcons type="user"/>
                    {{ t('base.pages.profile') }} </router-link>
                </li>
                <li>
                  <router-link to="/settings/profileInfos">
                    <sdFeatherIcons type="settings"/>
                    {{ t('base.pages.settings') }} </router-link>
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
import {InfoWraper, UserDropDwon} from "./style";
import Support from "./support/IsAuthInfoSupportPopover.vue";
import Notification from "./notification/IsAuthInfoNotificationPopover.vue";
import IsAuthInfoThemeToggle from "@/features/header/authInfo/theme/IsAuthInfoThemeToggle.vue";
import IsAuthInfoI18nPopover from "@/features/header/authInfo/i18n/IsAuthInfoI18nPopover.vue";
import Message from "./message/IsAuthInfoMessagePopover.vue";
import {useRouter} from "vue-router";
import {computed} from "vue";
import {LogoutOutlined} from "@ant-design/icons-vue";
import {useAuthStore} from "@/store/auth/auth.store";
import {useUserStore} from "@/store/user/user.store.js";
import {useI18n} from "vue-i18n";


const {push} = useRouter();
const userStore = useUserStore();

const avatar = computed(() => userStore.getAvatar);
const username = computed(() => userStore.getUsername);
const userType = computed(() => userStore.getUserType)
const userId = computed (() => userStore.getId)
const {t} = useI18n({useScope: "global"});

const SignOut = (e) => {
  e.preventDefault();
  const authStore = useAuthStore();
  userStore.clearUser();
  authStore.clearTokens();
  push("/auth/signin");
}

</script>
<style scoped>
.image {
  border-radius: 8%;
  object-fit: cover;
}
</style>