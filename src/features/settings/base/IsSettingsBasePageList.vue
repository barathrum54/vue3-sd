<template>
  <ul class="ps-tab">
    <li
      v-for="(page, index) in pages"
      :key="index"
      :class="{'active': index === 0}"
    >
      <router-link :to="page.to" class="nav-link">
        <sdFeatherIcons
            v-if="page.iconPrefix === 'feather'"
            :type="page.icon"
            size="14"
        />
        {{ t(page.title) }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import {useSettingsPages} from "@/features/settings/base/IsSettingsPages";
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: "global"});
const pages = useSettingsPages();
</script>