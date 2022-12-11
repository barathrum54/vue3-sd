<template>
  <div style="display: flex; flex-flow: column">
    <section>
      <div class="note-wrap">
        <p>
          En kötü durumda bile zarara uğramamanız için lütfen teslimatı yaparken
          video kaydına almayı unutmayın. <br />
          Müşteri teslim almadığını iddia ettiğinde ilk işlem olarak sizden
          teslimat videosunu isteyeceğiz.
        </p>
      </div>
    </section>
    <section>
      <div class="info-wrap">
        <h3 style="color: rgba(255, 255, 255, 0.85)">
          İLANI TESLİM ETMENİZ İÇİN KALAN SÜRE
        </h3>
        <h3 style="color: rgba(255, 255, 255, 0.85)" class="timeleft">
          {{ detailData.DeliveryDatetimeText }}
        </h3>
        <h4 style="color: rgba(255, 255, 255, 0.85)">
          İlanı belirttiğiniz süre içerisinde teslim etmezseniz sipariş iptal
          olacaktır
        </h4>
      </div>
    </section>
    <section>
      <sdButton
        :disabled="readyToDeliver_check"
        @click="readyToDeliverDialog"
        class="sdbtn"
        size="large"
        type="primary"
        icon="check"
      >
        <sdFeatherIcons class="sdicon" type="shopping-bag" size="14" />

        Teslimata hazır olduğunu bildir
      </sdButton>
      <a-tooltip
        placement="bottom"
        :title="
          !readyToDeliver_check
            ? 'Öncelikle teslimata hazır bildirimi göndermelisiniz'
            : ''
        "
      >
        <sdButton
          :disabled="!readyToDeliver_check"
          @click="confirmDeliveryDialog"
          class="sdbtn"
          size="large"
          type="success"
        >
          <sdFeatherIcons class="sdicon" type="check" size="14" />

          Teslimatı yaptığını onayla
        </sdButton>
      </a-tooltip>
      <sdButton
        @click="cantDeliverDialog"
        class="sdbtn"
        size="large"
        type="danger"
      >
        <sdFeatherIcons class="sdicon" type="alert-circle" size="14" />

        Teslimat yapamayacağım
      </sdButton>
      <sdModal
        :title="title"
        :visible="readyToDeliverDialog_Active"
        :onCancel="hideModals"
      >
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
          <sdButton
            @click="hideModals"
            class="sdbtn"
            size="large"
            type="danger"
          >
            İptal
          </sdButton>
        </section>
      </sdModal>
      <sdModal
        :title="title"
        :visible="confirmDeliveryDialog_Active"
        :onCancel="hideModals"
      >
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
          <sdButton
            @click="hideModals"
            class="sdbtn"
            size="large"
            type="danger"
          >
            İptal
          </sdButton>
        </section>
      </sdModal>
    </section>
  </div>
</template>
<script setup>
import { computed, ref, toRefs, onMounted, onBeforeMount, inject } from "vue";
import { Modal } from "ant-design-vue";
import {
  confirmBuyerOrder,
  rejectBuyerOrder,
  confirmSellOrder,
  readyForDeliveryPost,
  rejectSellOrder,
} from "@/services/notifications/shopsNotifications.service";
import { Notification } from "ant-design-vue";
import { useRouter } from "vue-router";

const detailData = inject("detailData");
const readyToDeliverDialog_Active = ref(false);
const confirmDeliveryDialog_Active = ref(false);
const isLoading = ref(false);
const title = ref("");
const content = ref("");
const buttonText = ref("");
const selectedButtonType = ref(0);
const hasErrors = ref(false);
const errorMessage = ref("");
const readyToDeliver_check = ref(false);
const router = useRouter();

onBeforeMount(() => {
  console.log(detailData);
  if (detailData.value.ReadyDelivery == 1) {
    readyToDeliver_check.value = true;
  }
});
const confirmDeliveryDialog = () => {
  selectedButtonType.value = 1;

  title.value = "İşlemi Onayla";
  buttonText.value = "Evet, onaylıyorum";

  content.value = `Teslimatı onayladıktan sonra alıcının onay vermek için 24 saat süresi mevcut. Bu süre sonunda onay vermezse ücret otomatik olarak hesabınıza aktarılacaktır.<br>Lütfen bakiyeniz hesabınıza gelene kadar teslimat videosunuz silmeyiniz!<br><br>Teslimatı gerçekleştirdiğinizi onaylıyor musunuz?`;
  confirmDeliveryDialog_Active.value = true;
};
const readyToDeliverDialog = () => {
  selectedButtonType.value = 0;
  title.value = "İşlemi Onayla";
  buttonText.value = "Evet, onaylıyorum";

  content.value = `Teslimata hazır olduğunuzu onaylıyor musunuz ?<br>Teslimata hazır olduğunuzu onayladığınızda alıcıya tüm iletişim kanallarından teslimata hazır olduğunuzu bildireceğiz.`;
  readyToDeliverDialog_Active.value = true;
};
const DeliverOrder = async () => {
  isLoading.value = true;
  const Data1 = detailData.value.DataId_1;
  const purchaseId = detailData.value.purchaseID;
  const response = await confirmSellOrder({ Data1, purchaseId });
  if (response.data.success == false) {
    hasErrors.value = true;
    errorMessage.value = response.data.message;
  } else {
    hideModals();
    readyToDeliver_check.value = true;
    Notification["success"]({
      message: "İşlem Başarılı",
      description: response.data.message,
    });

    finalize();
  }
};
const readyToDeliver = async () => {
  isLoading.value = true;

  const Data1 = detailData.value.DataId_1;
  console.log(Data1);
  const response = await readyForDeliveryPost(Data1);
  if (response.data.success == false) {
    hasErrors.value = true;
    errorMessage.value = response.data.message;
  } else {
    hideModals();
    readyToDeliver_check.value = true;
    Notification["success"]({
      message: "İşlem Başarılı",
      description: response.data.message,
    });
  }
  isLoading.value = false;

  console.log(response);
};
const finalize = () => {
  router.push(`/notifications`);
};
const cantDeliverDialog = () => {
  selectedButtonType.value = 2;
  title.value = "İşlemi Onayla";
  buttonText.value = "Evet, onaylıyorum!";
  content.value =
    "Teslimatı bir sebepten dolayı teslim etmeyeceğini onaylıyor musunuz?";
  readyToDeliverDialog_Active.value = true;
};
const cantDeliver = async () => {
  isLoading.value = true;

  const Data1 = detailData.value.DataId_1;
  const purchaseID = detailData.value.purchaseID;

  console.log(Data1);
  console.log(purchaseID);
  const response = await rejectSellOrder(Data1, purchaseID);
  if (response.data.success == false) {
    hasErrors.value = true;
    errorMessage.value = response.data.message;
  } else {
    hideModals();
    readyToDeliver_check.value = true;
    Notification["success"]({
      message: "İşlem Başarılı",
      description: response.data.message,
    });
    finalize();
  }
  isLoading.value = false;
  console.log(response);
};
const hideModals = () => {
  confirmDeliveryDialog_Active.value = false;
  readyToDeliverDialog_Active.value = false;
  hasErrors.value = false;
};

const handleAction = async () => {
  hasErrors.value = false;
  if (selectedButtonType.value == 0) {
    readyToDeliver();
  } else if (selectedButtonType.value == 1) {
    DeliverOrder();
  } else if (selectedButtonType.value == 2) {
    cantDeliver();
  }
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
.info-wrap {
  display: flex;
  justify-content: center;
  flex-flow: column;
  text-align: center;
  border-radius: 5px;
  background: grey;
  margin-block: 10px;
  padding: 15px;
}
.note-wrap {
  font-weight: 500;
  opacity: 0.9;
  text-align: center;
}
</style>
