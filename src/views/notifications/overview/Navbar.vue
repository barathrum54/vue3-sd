<template>
  <EmailNav>
    <ul>
      <li>
        <router-link :to="`${path}`" click="toggleCollapsed">
          <sdFeatherIcons type="star" size="18" />
          <span class="nav-text">
            <span>Tüm Bildirimler</span>
          </span>
         
        </router-link>
      </li>
      <li>
        <router-link :to="`${path}unread`" click="toggleCollapsed">
          <sdFeatherIcons type="inbox" size="18" />
          <span class="nav-text">
            <span>Okunmamış</span>
            
            <span class="badge badge-primary" v-if="pageData.unreadCount != null">{{
              pageData.unreadCount
            }}</span>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="`${path}awaitingAction`" click="toggleCollapsed">
          <sdFeatherIcons type="alert-octagon" size="18" />
          <span class="nav-text">
            <span>Eylem Bekleyen</span>
            <span class="badge badge-primary"
              v-if="pageData.awaitingCount != null"
              >{{ pageData.awaitingCount }}</span>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="`${path}systemNotifications`" click="toggleCollapsed">
          <sdFeatherIcons type="trello" size="18" />
          <span class="nav-text">
            <span>Sistem Bildirimleri</span>
            <span class="badge badge-primary" v-if="pageData.systemCount != null">{{
              pageData.systemCount
            }}</span>
          </span>
        </router-link>
      </li>
      <!-- <li>
        <router-link :to="`${path}SystemMessage`" click="toggleCollapsed">
          <sdFeatherIcons type="send" size="18" />
          <span class="nav-text">
            <span>Sistem Mesajları</span>
          </span>
          <span class="badge badge-primary">{{ pageData.totalCount }}</span>
        </router-link>
      </li>
      <li>
        <router-link :to="`${path}Deleted`" click="toggleCollapsed">
          <sdFeatherIcons type="trash-2" size="18" />
          <span class="nav-text">
            <span>Silinenler</span>
          </span>
          <span class="badge badge-primary">{{ pageData.totalCount }}</span>
        </router-link>
      </li> -->
    </ul>
  </EmailNav>
</template>
<script>
import { EmailNav } from "./style";
import { inject, ref, onMounted } from "vue";
import VueTypes from "vue-types";

const NotificationsNavbar = {
  name: "NotificationsNavbar",
  components: { EmailNav },
  props: { path: VueTypes.string, toggleCollapsed: VueTypes.func },
  setup() {
    const labels = ref(["personal", "social", "promotions"]);
    const newLabel = ref("");
    const addNewDisplay = ref(false);

    const addNewLabels = (e) => {
      e.preventDefault();
      addNewDisplay.value = true;
    };

    const pageData = inject("pageData");

    const cancelAddNewLabels = (e) => {
      e.preventDefault();
      e.stopPropagation();
      addNewDisplay.value = false;
    };

    const handelChange = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (newLabel.value !== "") {
        labels.value = [...labels.value, newLabel.value];
        newLabel.value = "";
      } else {
        alert("Please Give a label...");
      }
    };

    const onLabelChange = (e) => {
      newLabel.value = e.target.value;
    };

    return {
      labels,
      newLabel,
      addNewDisplay,
      addNewLabels,
      cancelAddNewLabels,
      handelChange,
      onLabelChange,
      pageData,
    };
  },
};

export default NotificationsNavbar;
</script>
<style scoped>
.badge.badge-primary {
  background: #0b0b1410;
  color: #f25f5f;
}
</style>
