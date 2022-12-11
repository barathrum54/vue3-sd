<template>
  <sdCards headless>
    <div class="sDash-support-container ant-card-body">
    <supportSystemCreate :supportCreateVisible="supportCreateVisible" @update:supportCreateVisible="newValue => supportCreateVisible = newValue" ></supportSystemCreate>
      <a-row class="isFaqCreate-container">
        <a-row  :lg="8" :sm="10" :xs="24">
          <div class="isFaqCreate-img">
            <img height="170" src="/images/pages/supportSystem/support.svg" alt="" />
          </div>
        </a-row>
        <a-row :lg="16" :sm="14" :xs="24">
          <div class="isFaqCreate-content">
            <h3 style="margin:20px 0px;">Aradığınızı Bulamadınız mı?</h3>
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
        </a-row>
      </a-row>
    </div>
  </sdCards>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, reactive, inject } from "vue";
import supportSystemCreate from "@/views/support/create/supportSystemCreate.vue";

const { t, d } = useI18n({ useScope: "global" });
const supportCreateVisible = ref(false);
defineEmits(['update:supportCreateVisible'])
const getSupportCreate = () => {
  supportCreateVisible.value = true;
  console.log("getSupportCreate ", supportCreateVisible.value);
};
</script>

<style scoped>
.isFaqCreate-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.isFaqCreate-img{
    margin-top: 10px;
}
.isFaqCreate-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom:30px;
}
</style>
