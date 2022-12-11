<template>
  <Wrapper>
    <div class="sDash-support-container">
      <div class="sDash-support-links">
        <a-row :gutter="30">
          <a-col
              v-for="(badge, index) in badges"
              :key="index"
              :lg="8"
              :md="12"
              :sm="12"
              :xs="24"
              class="is-support-system-col"
          >
            <div class="sDash-support-link-item">
              <div
                  class="sDash-support-link-item__icon"
                  :class="badge.color"
              >
                <img :src="badge.img" alt=""/>
              </div>
              <h4 class="sDash-support-link-item__title">{{ t(`supportSystem.footer.badges.${badge.key}.title`) }}</h4>
              <div class="sDash-support-link-item__content">
                <p>{{ t(`supportSystem.footer.badges.${badge.key}.description`) }}</p>
                <router-link
                    :to="badge.to"
                    :disabled="badge.disabled"
                    class="btn-link"
                > {{ t(`supportSystem.footer.badges.${badge.key}.action`) }}
                </router-link>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </Wrapper>
</template>

<script setup>
import {Wrapper} from "./style";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const {t} = useI18n({useScope: 'global'})

const badges = ref([
  {
    key: "sss",
    color: "primary",
    to: "/faq",
    img: "/images/pages/supportSystem/idea.svg"
  },
  {
    key: "questionAnswer",
    color: "info",
    to: "/",
    img: "/images/pages/supportSystem/chat.svg"
  },
  {
    key: "documentation",
    color: "success",
    to: "/",
    img: "/images/pages/supportSystem/documentation.svg",
    disabled: true
  }
])
</script>