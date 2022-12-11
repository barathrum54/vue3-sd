<template>
  <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      :mode="mode"
      :theme="darkMode ? 'dark' : 'light'"
  >
    <!-- routes for User type starting -->
    <a-sub-menu v-for="route in userTypeRoutes[userType].routes" :key="route.id">
      <template #title
      >
        <template v-if="route.subRoutes">
          <sdFeatherIcons :type="route.icon"/>
          <span>{{ t(route.title) }}</span>
        </template>
        <template v-else>
          <router-link :to="route.path">
            <sdFeatherIcons :type="route.icon"/>
            <span>{{ t(route.title) }}</span>
          </router-link>
        </template>
      </template>
      <template v-if="route.subRoutes">
        <a-menu-item v-for="subRoute in route.subRoutes" :key="subRoute.id" @click="toggleCollapsed"
        >
          <router-link :to="subRoute.path">
            {{ t(subRoute.text) }}
          </router-link>
        </a-menu-item>
      </template>
    </a-sub-menu>
    <!-- routes for User type finished -->

    <!-- Account and other starting -->
    <p class="sidebar-nav-title">{{ t('menu.accountAndOther') }}</p>
    <a-sub-menu
        key="AccountSettings"
    >
      <template #title>
        <sdFeatherIcons
            type="user"
        ></sdFeatherIcons>
        <span>{{ t('menu.accountSettings') }}</span>
      </template>

      <a-menu-item
          v-for="(page, index) in settingsPages"
          :key="page.id"
          @click="toggleCollapsed"
      >
        <router-link :to="page.to">
          {{ t(page.title) }}
        </router-link>
      </a-menu-item>
    </a-sub-menu>
    <!-- Account and other finished -->

    <!-- routes for Support System starting -->
    <a-sub-menu v-for="route in SupportMenuItems" :key="route.id">
      <template #title
      >
        <template v-if="route.subRoutes">
          <sdFeatherIcons :type="route.icon"/>
          <span>{{ t(route.title) }}</span>
        </template>
        <template v-else>
          <router-link :to="route.path">
            <sdFeatherIcons :type="route.icon"/>
            <span>{{ t(route.title) }}</span>
          </router-link>
        </template>
      </template>
      <template v-if="route.subRoutes">
        <a-menu-item v-for="subRoute in route.subRoutes" :key="subRoute.id" @click="toggleCollapsed"
        >
          <router-link :to="subRoute.path">
            {{ t(subRoute.text) }}
          </router-link>
        </a-menu-item>
      </template>
    </a-sub-menu>
    <!-- routes for Support System finished -->

  </a-menu>
</template>
<script setup>
import {computed, reactive, ref} from "vue";
import VueTypes from "vue-types";
import {useConfigStore} from "@/store/config/config.store";
import {useUserStore} from "@/store/user/user.store";
import ShopMenuItems from "@/layout/menuItems/shopMenuItems";
import SupportMenuItems from "@/layout/menuItems/supportMenuItems";
import {useSettingsPages} from "@/features/settings/base/IsSettingsPages";
import {useI18n} from "vue-i18n";

const props = defineProps({
  toggleCollapsed: VueTypes.func,
  events: VueTypes.object,
})

const {t} = useI18n({useScope: "global"});

const configStore = useConfigStore();
const userStore = useUserStore();

const darkMode = computed(() => configStore.getDarkMode);
const userType = computed(() => userStore.getUserType);
const mode = ref("inline");

const state = reactive({
  selectedKeys: ["home"],
  openKeys: ["dashboard"],
  preOpenKeys: ["dashboard"],
});

const userTypeRoutes = {
  shop: {
    routes: ShopMenuItems
  }
}

const settingsPages = useSettingsPages();
</script>
<style lang="scss">
.ant-layout-sider .ant-layout-sider-children .ant-menu .ant-menu-submenu span {
  padding-left: 0px;
}

.ant-layout-sider {
  .ant-layout-sider-children {
    .ant-menu-submenu span:first-child {
      padding-left: 0 !important;
    }

    .ant-menu-submenu-title {
      .ant-menu-title-content {
        a {
          padding-left: 0 !important;
        }
      }
    }
  }

  .ant-menu.ant-menu-inline-collapsed {
    .ant-menu-submenu {
      .ant-menu-submenu-title {
        span:first-child {
          display: unset !important;
          padding-left: 0;
        }

        span > span {
          display: none !important;
        }
      }
    }
  }
}
</style>