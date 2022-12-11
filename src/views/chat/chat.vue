<template>
  <div>
    <sdPageHeader :title="t('chat.title')">
    </sdPageHeader>
    <Main>
      <a-row :gutter="30">
        <a-col :xxl="7" :lg="10" :xs="24">
          <ChatSidebar>
            <sdCards headless>
              <div class="chatbox-search">
                <sdAutoComplete  width="100%" patterns />
              </div>
              <nav>
                <UL>
                  <li>
                    <router-link to="/chat/unarchive/2323"> {{ t('chat.unarchive') }} </router-link>
                  </li>
                  <li>
                    <router-link to="/chat/archive/2323">
                      {{ t('chat.archive') }}
                      <a-badge class="badge-error" :count="3" />
                    </router-link>
                  </li>
                </UL>
              </nav>
              <Content>
                <perfect-scrollbar
                    :options="{
                  wheelSpeed: 1,
                  swipeEasing: true,
                  suppressScrollX: true,
                }"
                >
                  <router-view></router-view>
                </perfect-scrollbar>
              </Content>
            </sdCards>
          </ChatSidebar>
        </a-col>
        <a-col :xxl="17" :lg="14" :xs="24">
          <router-view name="child"></router-view>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import { UL, Content, ChatSidebar } from './style';
import {Main} from "@/views/styled"
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: "global"});
</script>