<template>
  <sdButton
    @click="teslimAldim"
    class="sdbtn"
    size="large"
    type="primary"
    icon="check"
  >
    <sdFeatherIcons class="sdicon" type="check" size="14" />

    Teslim Aldım
  </sdButton>
  <sdButton @click="teslimAlmadim" class="sdbtn" size="large" type="danger">
    <sdFeatherIcons class="sdicon" type="alert-circle" size="14" />

    Teslim Almadım
  </sdButton>
  <sdModal :title="title" :visible="teslimAldim_visible" :onCancel="hideModals">
    <p v-html="content"></p>
    <section v-if="hasErrors" style="color: red; margin-top: 15px">
      {{ errorMessage }}
    </section>

    <a-spin v-if="isLoading" />

    <section v-else>
      <sdButton
        @click="handleAction"
        class="sdbtn"
        size="large"
        type="primary"
        icon="check"
        style="margin-top: 15px"
      >
        {{ buttonText }}
      </sdButton>
      <sdButton @click="hideModals" class="sdbtn" size="large" type="danger">
        İptal
      </sdButton>
    </section>
  </sdModal>
</template>
<script setup>
import { computed, ref, toRefs, onMounted, inject } from "vue";
import { Modal } from "ant-design-vue";
import {
  confirmBuyerOrder,
  rejectBuyerOrder,
} from "@/services/notifications/shopsNotifications.service";
import { Notification } from "ant-design-vue";
import { useRouter } from "vue-router";

const detailData = inject("detailData");
const teslimAldim_visible = ref(false);
const isLoading = ref(false);
const title = ref("");
const content = ref("");
const buttonText = ref("");
const selectedButtonType = ref(0);
const hasErrors = ref(false);
const errorMessage = ref("");
const router = useRouter();

const teslimAldim = () => {
  selectedButtonType.value = 0;
  title.value = "İşlemi Onayla";
  buttonText.value = "Evet, onaylıyorum";

  content.value = `  İşleme onay verdiğinizde satıcıya parası aktarılacaktır ve bu işlemin geri
      dönüşü yoktur.<br />Ürünü başarılı bir şekilde teslim aldıysanız aşağıdaki
      <b>Evet, onaylıyorum!</b> butonuna tıklayınız.`;
  teslimAldim_visible.value = true;
};
const teslimAlmadim = () => {
  selectedButtonType.value = 1;
  title.value = "İşlemi Onayla";
  buttonText.value = "Teslim Almadım";
  content.value =
    "Ürünü teslim almadığınızı belirttiğinizde satıcıdan teslimata dair video kanıt isteyeceğiz. Satıcı 24 saat içerisinde sisteme kanıtı yüklemek zorundadır. Eğer satıcı kanıt gönderemezse bakiyenizi iade edeceğiz.<br><b>Bu seçeneği yanıltıcı şekilde kullanan üyeler kalıcı olarak uzaklaştırılacaktır. Lütfen ürünü gerçekten teslim almadıysanız bu işlemi başlatın.</b>";
  teslimAldim_visible.value = true;
};
const hideModals = () => {
  teslimAldim_visible.value = false;
  hasErrors.value = false;
};

const handleAction = async () => {
  hasErrors.value = false;

  isLoading.value = true;
  const Data1 = detailData.value.DataId_1;
  const purchaseId = detailData.value.purchaseID;
  let response;
  console.log(Data1, purchaseId);
  if (selectedButtonType.value == 0) {
    response = await confirmBuyerOrder({ Data1, purchaseId });

    console.log(response);
  } else if (selectedButtonType.value == 1) {
    response = await rejectBuyerOrder({ Data1, purchaseId });
    console.log(response);
  }
  if (response.data.success == false) {
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
.sdbtn {
  margin-left: 5px;
  margin-right: 5px;
}
.sdicon {
  margin-right: 5px;
}
</style>
