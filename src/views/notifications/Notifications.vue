<template>
<div>
  <sdPageHeader :title="pageTitle"> </sdPageHeader>
  <Main>
    <EmailWrapper>
      <a-row class="justify-content-center" :gutter="25">
        <a-col class="trigger-col" :xxl="5" :xl="7" :lg="8" :xs="24">
          <sdButton
              v-if="responsive <= 991"
              type="white"
              class="mail-sidebar-trigger ant-btn-link"
              :style="{ marginTop: 0 }"
          >
            <sdFeatherIcons v-if="collapsed" type="align-left" />
            <sdFeatherIcons v-else type="align-right" />
          </sdButton>
          <div v-if="responsive > 991" class="mail-sideabr">
            <sdCards headless>
              <div class="mail-sidebar-bottom">
                <EmailNavbar :path="path + '/'" />
              </div>
            </sdCards>
          </div>
          <MailSideBar
              v-else
              :class="collapsed ? 'mail-sideabr show' : 'mail-sideabr hide'"
          >
            <sdCards headless>
              <sdButton
                  type="link"
                  class="mail-sidebar-trigger trigger-close"
                  :style="{ marginTop: 0 }"
              >
                <sdFeatherIcons type="x" />
              </sdButton>

              <div class="mail-sidebar-bottom">
                <EmailNavbar :path="path + '/'" />
              </div>
            </sdCards>
          </MailSideBar>
        </a-col>
        <a-col :xxl="19" :xl="17" :lg="16">
          <router-view
              :is-loading="isLoading"
              @search="(e) => search(e)"
          ></router-view>
        </a-col>
      </a-row>
    </EmailWrapper>
  </Main>
</div>
</template>
<script>
import EmailNavbar from "./overview/Navbar";
import { EmailWrapper, MailSideBar } from "./overview/style";
import { Main } from "../styled.js";
import { computed, onMounted, ref, provide } from "vue";
import { useRouter } from "vue-router";
import { ellipsis } from "@/utility/utility.js";
import {
  getAllNotificationsServices,
  deleteNotification,
  getAwaitingActionsNotificationsServices,
  getUnReadNotificationsServices,
  getSystemNotificationsServices,
  getSearchedNotificationsServices,
} from "@/services/notifications/shopsNotifications.service";

const Notifications = {
  name: "Notifications",
  components: { Main, MailSideBar, EmailNavbar, EmailWrapper },
  watch: {
    "$route.name": {
      handler: function (name) {
        this.pageChange(true);
      },
    },
  },
  data() {
    return {
      path: this.$route.matched[1].path,
    };
  },
  setup() {
    const router = useRouter();
    const responsive = ref(0);
    const collapsed = ref(false);
    const isLoading = ref(false);
    const isLastPage = ref(false);
    const pageType = ref(0);
    const searchQuery = ref("");
    const isMailEditorOpen = ref(false);
    const pageTitle = "Bildirimlerim";
    const isFiltering = ref(false);
    const _isFiltering = () => {
      return isFiltering.value;
    };
    const pageData = ref({
      page: 1,
      limit: 10,
      allCount: null,
      unreadCount: null,
      awaitingCount: null,
      systemCount: null,
      pageType: 1,
      isNext: false,
    });
    const notificationData = ref([]);

    const refreshpageData = () => {
      pageData.value = {
        page: 1,
        limit: 10,
        allCount: null,
        unreadCount: null,
        awaitingCount: null,
        systemCount: null,
        pageType: 1,
        isNext: false,
      };
    };

    function updateSize() {
      const width = window.innerWidth;
      responsive.value = width;
    }
    onMounted(() => {
      updateSize();
      pageChange();
      window.addEventListener("resize", updateSize);
    });
    const _isLastPage = () => {
      return isLastPage.value;
    };

    const pageChange = (resetPage) => {
      if (resetPage) {
        pageData.value.page = 1;
      }
      var routeName = router.currentRoute.value.name;
      pageType.value = 1;
      switch (routeName) {
        case "allNotifications":
          pageType.value = 1;
          getAllNotifications();
          break;

        case "unRead":
          pageType.value = 2;
          getUnreadNotifications();
          break;

        case "awaitingAction":
          pageType.value = 3;
          getAwaitingActionNotifications();
          break;

        case "systemNotifications":
          pageType.value = 4;
          getSystemNotifications();
          break;
        default:
          break;
      }
    };

    const getAllNotifications = async (params = pageData.value) => {
      isLoading.value = true;
      const response = await getAllNotificationsServices(params);

      CheckifLastPage(response.data.notifications);
      notificationData.value = response.data.notifications;
      isLoading.value = false;
    };
    const getUnreadNotifications = async (params = pageData.value) => {
      isLoading.value = true;
      const response = await getUnReadNotificationsServices(params);
      CheckifLastPage(response);
      notificationData.value = response;
      isLoading.value = false;
    };
    const getAwaitingActionNotifications = async (params = pageData.value) => {
      isLoading.value = true;
      console.log("get Awaiting Action");
      console.log(params);
      const response = await getAwaitingActionsNotificationsServices(params);
      CheckifLastPage(response);

      notificationData.value = response.data.notifications;
      isLoading.value = false;
    };
    const getSystemNotifications = async (params = pageData.value) => {
      isLoading.value = true;
      const response = await getSystemNotificationsServices(params);
      CheckifLastPage(response);

      notificationData.value = response.data.notifications;
      console.log(response.data);
      isLoading.value = false;
    };
    const getSearchQuery = async (query = "", page = pageData.value) => {
      isFiltering.value = true;
      isLoading.value = true;
      const response = await getSearchedNotificationsServices(query, page);
      notificationData.value = response.data.notifications;
      isLoading.value = false;
    };
    const CheckifLastPage = (data) => {
      if (data.length < pageData.value.limit) {
        isLastPage.value = true;
      } else {
        isLastPage.value = false;
      }
    };
    const _search = (e) => {
      if (e.length >= 3) {
        isFiltering.value = true;

        getSearchQuery(e);
      }
      if (e.length == 0) {
        console.log("!!! FİLTER FALSE");
        isFiltering.value = false;

        pageChange();
      }
    };
    const data = computed(() =>
      notificationData.value.map((notification, key) => {
        const {
          id,
          message,
          datetime,
          image,
          sender,
          isDeletable,
          Name,
          seen,
        } = notification;
        return {
          key: id,
          name: (
            <EmailAuthor>
              <img src={image} alt="" />
              <router-link onClick={() => goDetail(id)} to="#">
                <sdHeading as="h5">
                  <a>{sender}</a>
                </sdHeading>
              </router-link>
            </EmailAuthor>
          ),
          content: (
            <EmailHeader>
              <sdHeading as="h5">
                <router-link onClick={() => goDetail(id)} to="#">
                  {Name}
                </router-link>
              </sdHeading>
              <div class="ant-row">
                <router-link onClick={() => goDetail(id)} to="#">
                  <div class="inbox-row-message ant-col">
                    {ellipsis(message, 10)}
                  </div>
                </router-link>
              </div>
            </EmailHeader>
          ),
          time: <span class="email-time">{datetime}</span>,
          deletable: isDeletable,
          seen: seen,
        };
      })
    );
    const getCounts = async () => {
      isLoading.value = true;
      const unreadNotifications = [];
      notificationData.value.map((notification, key) => {
        if (notification.seen == 0) {
          unreadNotifications.push(notification);
        }
      });
      pageData.value.unreadCount = unreadNotifications.length;

      pageData.value.allCount = notificationData.value.length;

      isLoading.value = false;
    };
    const goDetail = (id) => {
      router.push({ path: "/notifications/" + id, id: id });
    };

    provide("pageData", pageData);
    provide("isLastPage", _isLastPage);
    provide("pageChange", pageChange);
    provide("_search", _search);
    provide("isFiltering", _isFiltering);
    provide("dataSource", data);
    provide("notificationData", notificationData.value);
    provide("refreshpageData", refreshpageData);

    return {
      responsive,
      pageTitle,
      collapsed,
      isMailEditorOpen,
      pageChange,
      isLoading,
      notificationData,
      data,
    };
  },
};

export default Notifications;
</script>
