<template>
  <div>
    <sdPageHeader :title="t('settings.title')">
    </sdPageHeader>
    <Main class="mb-1">
      <a-row :gutter="25">
        <a-col
            class="xs-order-2 sm-order-2 md-order-1"
            :xs="24"
            :sm="24"
            :md="10"
            :lg="8"
            :xl="8"
            :xxl="6"
        >
          <profile-author-box>
            <is-settings-base-author-box>
              <template #menu>
                <is-settings-base-page-list></is-settings-base-page-list>
              </template>
            </is-settings-base-author-box>
          </profile-author-box>
        </a-col>
        <a-col
            class="xs-order-1 sm-order-1 md-order-1"
            :xs="24"
            :sm="24"
            :md="14"
            :lg="16"
            :xl="16"
            :xxl="18"
        >
          <SettingWrapper>
            <IsSettingsBaseCoverSection />
            <Suspense>
              <template #default>
                <router-view v-slot="{ Component, route }">
                  <transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.path" />
                  </transition>
                </router-view>
              </template>
              <template #fallback>
                <div class="spin">
                  <a-spin />
                </div>
              </template>
            </Suspense>
          </SettingWrapper>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import {Main} from "@/views/styled.js";
import { SettingWrapper, ProfileAuthorBox } from './style.js';
import IsSettingsBaseCoverSection from '@/features/settings/base/IsSettingsBaseCoverSection.vue';
import IsSettingsBaseAuthorBox from "@/features/settings/base/IsSettingsBaseAuthorBox.vue";
import IsSettingsBasePageList from "@/features/settings/base/IsSettingsBasePageList.vue";
import {useI18n} from "vue-i18n";

const {t, d} = useI18n({useScope: "global"});
</script>
