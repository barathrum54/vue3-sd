<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 24 }"
    :wrapper-col="{ span: 24 }"
    autocomplete="off"
    @finish="submitForm"
  >
    <div class="info-wrap">
      <p>
        Lütfen ilanı teslim ederken çektiğiniz videoyu
        <b>Youtube, Vimeo, SendVid</b> gibi video paylaşım sitelerine
        <b>Herkese Açık</b> şekilde yükleyip videonun linkini aşağıdaki kanıt
        linki kutucuğuna yapıştırınız.
      </p>
    </div>
    <a-form-item
      label="Kanıt Linki"
      name="link"
      :rules="[{ required: true, message: 'Lütfen kanıt linki giriniz!' }]"
    >
      <a-input v-model:value="formState.link" />
    </a-form-item>

    <a-form-item
      label="Açıklamanız"
      name="aciklama"
      :rules="[{ required: true, message: 'Lütfen açıklamanızı giriniz!' }]"
    >
      <a-textarea v-model:value="formState.aciklama" />
    </a-form-item>

    <a-form-item name="paylasim" :wrapper-col="{ span: 24 }">
      <a-checkbox v-model:checked="formState.paylasim"
        >Kanıt videosunun alıcı ile paylaşılmasını istiyorum. (Zorunlu
        değil)</a-checkbox
      >
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 24 }">
      <a-button v-if="!isLoading" type="primary" html-type="submit"
        >Değerlendirmeyi Gönder</a-button
      >
      <a-spin v-else></a-spin>
    </a-form-item>
    <h4 style="color: red" v-if="hasErrors">{{ errorMessage }}</h4>
  </a-form>
</template>
<script setup>
import { ref, inject } from "vue";
import { sendRejectProof } from "@/services/notifications/shopsNotifications.service";
import { Notification } from "ant-design-vue";

import { useRouter } from "vue-router";
const router = useRouter();
const detailData = inject("detailData");
const hasErrors = ref(false);
const errorMessage = ref("");
const formState = ref({
  link: "",
  aciklama: "",
  paylasim: false,
});
const isLoading = ref(false);
const submitForm = async () => {
  hasErrors.value = false;

  const Data1 = detailData.value.DataId_1;
  const purchaseId = detailData.value.purchaseID;

  isLoading.value = true;
  const response = await sendRejectProof({ Data1, purchaseId, formState });
 if (response?.data.success == false) {
    hasErrors.value = true;
    errorMessage.value = response.data.message;
  } else {
    Notification["success"]({
      message: "İşlem Başarılı",
      description: response.data.message,
    });

    finalize();
  }

  isLoading.value = false;
};
const finalize = () => {
  router.push(`/notifications`);
};


</script>
<style scoped>
.info-wrap {
  background: grey;
  color: rgba(255, 255, 255, 0.85);
  border-radius: 5px;
  padding: 15px;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
</style>
