<template>
  <div>
    <sdPageHeader :title="t('supportSystem.title')">
    </sdPageHeader>
    <Main>
      <a-row :gutter="25">
        <a-col :xs="24">
          <is-support-system-head></is-support-system-head>
        </a-col>
        <a-col :xs="24">
          <sdCards style="padding:15px; margin-bottom:50px;" ><is-support-system-list></is-support-system-list> </sdCards>
        </a-col>
        <a-col :xs="24">
          <is-support-system-footer></is-support-system-footer>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import {Main} from "@/views/styled.js";
import IsSupportSystemHead from "@/features/support/head/IsSupportSystemHead";
import IsSupportSystemList from "@/features/support/list/IsSupportSystemList";
import IsSupportSystemFooter from "@/features/support/footer/IsSupportSystemFooter";
import {useI18n} from "vue-i18n";

const {t, d} = useI18n({useScope: "global"});
</script>