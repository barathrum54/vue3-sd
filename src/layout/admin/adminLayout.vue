<template>
  <MainWrapper :darkMode="darkMode">
    <Layout class="layout">
      <Header
          :style="{
          position: 'fixed',
          width: '100%',
          top: 0,
          right: 0
        }"
      >
        <a-row>
          <a-col
              :lg="!topMenu ? 4 : 3"
              :sm="6"
              :xs="12"
              class="align-center-v navbar-brand"
          >
            <sdButton
                v-if="!topMenu || innerWidth <= 991"
                @click="toggleCollapsed"
                type="white"
                :style="!darkMode ? 'border: 0 !important' : null"
            >
              <img
                  :src="
                  require(`@/static/img/icon/${
                    collapsed ? 'right.svg' : 'left.svg'
                  }`)
                "
                  alt="menu"
              />
            </sdButton>
            <router-link
                :class="
                topMenu && innerWidth > 991
                  ? 'striking-logo top-menu'
                  : 'striking-logo'
              "
                to="/"
            >
              <img
                  src="https://cdn.itemsatis.com/uploads/admin/hEHZCFyNLROfmD5GP8e36rVAY.svg"
                  alt="logo"
                  :class="{'filter-invert-1': !darkMode}"
              />
            </router-link>
          </a-col>
          <a-col :lg="!topMenu ? 14 : 15" :md="8" :sm="0" :xs="0">
            <HeaderSearch />
          </a-col>

          <a-col :lg="6" :md="10" :sm="0" :xs="0">
            <is-auth-info-header></is-auth-info-header>
          </a-col>
          <a-col :style="{ position: 'static' }" :md="0" :sm="18" :xs="12">
            <div class="mobile-action">
              <a
                  class="btn-search"
                  @click="handleSearchHide(searchHide)"
                  href="#"
              >
                <sdFeatherIcons type="search" v-if="searchHide"/>
                <sdFeatherIcons type="x" v-else/>
              </a>
              <a class="btn-auth" @click="onShowHide(hide)" href="#">
                <sdFeatherIcons type="more-vertical"/>
              </a>
            </div>
          </a-col>
        </a-row>
      </Header>
      <div class="header-more">
        <a-row>
          <a-col :md="0" :sm="24" :xs="24">
            <div class="small-screen-headerRight">
              <SmallScreenSearch :hide="searchHide" :darkMode="darkMode">
                <HeaderSearch/>
              </SmallScreenSearch>
              <SmallScreenAuthInfo :hide="hide" :darkMode="darkMode">
                <is-auth-info-header></is-auth-info-header>
              </SmallScreenAuthInfo>
            </div>
          </a-col>
        </a-row>
      </div>
      <Layout>
        <template v-if="!topMenu || innerWidth <= 991">
          <Sider
              :width="280"
              :style="{
              margin: '63px 0 0 0',
              padding: '15px 15px 155px 15px',
              overflowY: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              zIndex: 998
            }"
              :collapsed="collapsed"
              :theme="!darkMode ? 'light' : 'dark'"
          >
            <perfect-scrollbar
                :options="{
                wheelSpeed: 1,
                swipeEasing: true,
                suppressScrollX: true,
              }"
            >
              <p class="sidebar-nav-title">{{ t(`menu.mainMenu.${userType}`) }}</p>
              <MenuItems
                  :toggleCollapsed="toggleCollapsedMobile"
                  :events="onEventChange"
              />
            </perfect-scrollbar>
          </Sider>
        </template>
        <Layout class="atbd-main-layout width-100">
          <Content>
            <Suspense>
              <template #default>
                <router-view v-slot="{ Component, route }" >
                  <transition name="fade">
                    <component :is="Component" :key="!!route.meta && route.meta.name === 'layout' ? route.fullPath.slice(0, $route.fullPath.lastIndexOf('/')) : route.path" />
                  </transition>
                </router-view>
              </template>
              <template #fallback>
                <div class="spin">
                  <a-spin/>
                </div>
              </template>
            </Suspense>

            <Footer
                class="admin-footer"
                :style="{
                padding: '20px 30px 18px',
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: '14px',
                background: 'rgba(255, 255, 255, .90)',
                width: '100%',
                boxShadow: '0 -5px 10px rgba(146,153,184, 0.05)'
              }"
            >
              <a-row>
                <a-col :md="12" :xs="24">
                  <span class="admin-footer__copyright">{{ new Date().getUTCFullYear() }} © İtemSatış.com</span>
                </a-col>
                <a-col :md="12" :xs="24">
                  <div class="admin-footer__links">
                    <a-badge :count="t('words.version') + ' 1.0.0'" :offset=[5,0] :number-style="{
											backgroundColor: '#fff',
											color: '#999',
											boxShadow: '0 0 0 1px #d9d9d9 inset',
											textTransform: 'capitalize'
									    }" style="margin-right:3px;"/>
                    <a-badge :count="t('words.beta')" :offset=[5,0] :number-style="{
											backgroundColor: 'rgb(145 95 242)',
											color: '#fff',
											textTransform: 'uppercase'
									    }"/>
                  </div>
                </a-col>
              </a-row>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </MainWrapper>
</template>
<script setup>
import {Layout} from "ant-design-vue";
import {MainWrapper, SmallScreenAuthInfo, SmallScreenSearch} from "../style";
import HeaderSearch from "@/components/springDash/header-search/HeaderSearch";
import IsAuthInfoHeader from "@/features/header/authInfo/IsAuthInfoHeader.vue";
import MenuItems from "@/layout/menuItems/menuItems.vue";
import {PerfectScrollbar} from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import {computed, ref} from "vue";
import {useConfigStore} from "@/store/config/config.store";
import {useI18n} from "vue-i18n";
import {useUserStore} from "@/store/user/user.store";

const {Header, Footer, Sider, Content} = Layout;
const {t} = useI18n({useScope: 'global'})


const configStore = useConfigStore();
const userStore = useUserStore();

const userType = computed(() => userStore.getUserType)
const darkMode = computed(() => configStore.getDarkMode);
const topMenu = computed(() => configStore.getTopMenu);

const collapsed = ref(false);
const hide = ref(true);
const searchHide = ref(true);

const rtl = ref(false);
const innerWidth = ref(() => window.innerWidth);
collapsed.value = window.innerWidth <= 1200;

const toggleCollapsed = (e) => {
  collapsed.value = !collapsed.value;
  e.preventDefault();

};
const handleSearchHide = (search) => {
  searchHide.value = !search;
  hide.value = true;
};
const onShowHide = (h) => {
  hide.value = !h;
  searchHide.value = true;
};

const toggleCollapsedMobile = () => {
  if (innerWidth.value <= 990) {
    collapsed.value = !collapsed.value;
  }
};

const modeChangeDark = () => {
};

const modeChangeLight = () => {
};

const modeChangeTopNav = () => {
};

const modeChangeSideNav = () => {
};

const onEventChange = {
  modeChangeDark,
  modeChangeLight,
  modeChangeTopNav,
  modeChangeSideNav,
};
</script>
