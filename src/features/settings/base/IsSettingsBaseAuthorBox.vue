<template>
  <sdCards headless>
    <div class="author-info">
      <figure>
        <is-image
          :source="$api.CDN_AVATAR_API + avatar"
          fit="cover"
          :width="120"
          :height="120"
          radius="50%"
        >
        </is-image>
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          <a to="#">
            <sdFeatherIcons type="camera" size="16" />
          </a>
        </a-upload>
      </figure>
      <figcaption>
        <div class="info">
          <sdHeading as="h4">{{ username }}</sdHeading>
          <p>{{ t(`userTypes.${userType}.title`) }}</p>
        </div>
      </figcaption>
    </div>
    <nav class="settings-menmulist">
      <slot name="menu"></slot>
    </nav>
  </sdCards>
</template>


<script setup>
import {useUserStore} from "@/store/user/user.store";
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: "global"});

const userStore = useUserStore();

const avatar = computed(() => userStore.getAvatar)
const username = computed(() => userStore.getUsername)
const userType = computed(() => userStore.getUserType)
</script>
