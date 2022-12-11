<template>
  <Wrapper>
    <div class="sDash-support-container">
      <supportSystemCreate
        :supportCreateVisible="supportCreateVisible"
        @update:supportCreateVisible="
          (newValue) => (supportCreateVisible = newValue)
        "
      ></supportSystemCreate>
      <a-row align="middle">
        <a-col :lg="16" :sm="14" :xs="24">
          <div class="sDash_support-content">
            <h3 class="sDash_support-content__title">
              {{ t("supportSystem.banner.title") }}
            </h3>
            <p>{{ t("supportSystem.banner.description") }}</p>
            <sdButton
              class="btn-ticket"
              size="large"
              type="primary"
              raised
              @click="getSupportCreate()"
            >
              {{ t("supportSystem.banner.action") }}
            </sdButton>
          </div>
        </a-col>

        <a-col :lg="8" :sm="10" :xs="24">
          <div class="sDash_support-img">
            <img src="/images/pages/supportSystem/Banner.svg" alt="" />
          </div>
        </a-col>
      </a-row>
    </div>
  </Wrapper>
</template>

<script setup>
import { Wrapper } from "./style";
import { useI18n } from "vue-i18n";
import { ref, reactive, inject } from "vue";
import supportSystemCreate from "@/views/support/create/supportSystemCreate.vue";
import { Upload, message } from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";

const { t, d } = useI18n({ useScope: "global" });
const supportCategories = ref([]);
const supportCreateVisible = ref(false);
defineEmits(["update:supportCreateVisible"]);
const getSupportCreate = () => {
  supportCreateVisible.value = true;
  console.log("getSupportCreate ", supportCreateVisible.value);
};
</script>