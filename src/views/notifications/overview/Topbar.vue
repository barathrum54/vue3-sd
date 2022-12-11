<template>
  <MessageAction>
    <a-tooltip placement="bottom" title="Yenile">
      <router-link @click="refreshState" to="#">
        <sdFeatherIcons type="rotate-cw" size="18" />
      </router-link>
    </a-tooltip>
    <a-popconfirm
      title="Seçili bildirimleri silmek istediğine emin misiniz?"
      ok-text="Evet"
      cancel-text="Hayır"
      @confirm="deleteNotifications"
      @cancel="cancelDeletedProcess"
      :disabled="isDeleteDisabled"
    >
      <a-tooltip placement="bottom" title="Sil" :disabled="false">
        <router-link to="#">
          <sdFeatherIcons type="trash" size="18" />
        </router-link>
      </a-tooltip>
    </a-popconfirm>
  </MessageAction>
</template>
<script>
import VueTypes from "vue-types";
import { MessageAction } from "./style";

const Topbar = {
  name: "Topbar",
  components: { MessageAction },
  props: {
    refreshState: VueTypes.func,
    isDisabled: VueTypes.bool,
    isDeleteDisabled: VueTypes.bool,
    deleteNotifications: VueTypes.func,
    cancelDeletedProcess: VueTypes.func,
  },
};

export default Topbar;
</script>
