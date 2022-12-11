<template>
  <a-row>
    <a-col>
      <div class="info-wrap">
        <h4 style="color: white; font-weight: bold">
          Otomatik Teslimat Bilgilendirme Mesajı
        </h4>
        <p>
          Bu ilan otomatik olarak teslim edilmiştir. Aşağıdaki butonlardan
          teslimatı onayladığınızda ödediğiniz ücret satıcıya aktarılacaktır. 24
          Saat herhangi bir işlem gerçekleştirmezseniz ssitem tarafından
          otomatik olarak işlem onaylanacaktır.
        </p>
      </div>
    </a-col>
    <a-col :xl="24" style="display: flex; justify-content: center">
      <sdButton
        @click="teslimAldim"
        class="sdbtn"
        size="large"
        type="primary"
        icon="check"
      >
        <sdFeatherIcons class="sdicon" type="check" size="14" />

        Teslimatı Onayla
      </sdButton>
      <sdButton @click="teslimAlmadim" class="sdbtn" size="large" type="danger">
        <sdFeatherIcons class="sdicon" type="alert-circle" size="14" />

        Üründe Sorun Yaşadım
      </sdButton>
    </a-col>
  </a-row>

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
      <sdButton
        @click="showReportModal"
        class="sdbtn"
        size="large"
        type="danger"
        icon="check"
        style="margin-top: 15px"
        v-if="selectedButtonType == 1"
      >
        Siparişi Rapor Et
      </sdButton>
      <sdButton
        v-else
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
    :visible="reportModal_visible"
    :onCancel="hideReportModal"
  >
    <p>
      Otomatik teslim edilen bir üründe sorun yaşadığınızı belirttiniz,<br />Lütfen
      aşağıda yer alan metin kutusuna sorun yaşadığınız video kaydını yazınız
    </p>
    <p>
      Video olarak gönderilmeyen hiçbir kanıt değerlendirilmeyecektir. Lütfen
      çektiğiniz videoları
      <a href="https://streamable.com/upload-video" style="font-weight: bold"
        >Streamable</a
      >
      platformuna ücretsiz yükleyerek linkini aşağıdaki alanda bizimle
      paylaşınız.
    </p>
    <p>
      <center>
        <a
          href="https://streamable.com/upload-video"
          target="_blank"
          class="btn btn-success"
          style="margin-bottom: 10px; font-size: 13px"
          ><i class="fa fa-upload"></i> Video yüklemek için tıklayınız.</a
        >
      </center>
    </p>
    <h3></h3>
    <a-textarea
      placeholder="Lütfen bu alana sorun yaşadığınız video urlsini yazınız. Video hariç yazı yazılan kanıtlara işlem yapılmayacaktır."
      v-model:value="reportProof"
    ></a-textarea>
    <div class="check-wrap">
      <a-switch v-model:checked="proofCheckboxValid" size="large" />

      Kanıtımın geçersiz olduğu takdirde ücretin satıcıya aktarılacağını anladım
    </div>
    <a-spin v-if="isLoading" />
    <section v-else>
      <sdButton
        @click="sendRejectProof"
        class="sdbtn"
        size="small"
        type="danger"
      >
        Rapor Yolla
      </sdButton>
    </section>
    <section v-if="hasErrors" style="color: red; margin-top: 15px">
      {{ errorMessageProof }}
    </section>
  </sdModal>
</template>
<script setup>
import { computed, ref, toRefs, onMounted, inject } from "vue";
import { Modal } from "ant-design-vue";
import {
  rejectStockBuyOrder,
  confirmStockBuyOrder,
} from "@/services/notifications/shopsNotifications.service";
import { Notification } from "ant-design-vue";

import { useRouter } from "vue-router";
const router = useRouter();

const detailData = inject("detailData");
const teslimAldim_visible = ref(false);
const isLoading = ref(false);
const title = ref("");
const content = ref("");
const buttonText = ref("");
const selectedButtonType = ref(0);
const hasErrors = ref(false);
const reportModal_visible = ref(false);
const reportProof = ref("");
const errorMessage = ref("");
const errorMessageProof = ref("");
const proofCheckboxValid = ref(false);

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
  buttonText.value = "Satıcıya Mesaj Gönder";
  content.value = `Otomatik teslim edilen bir üründe sorun yaşadığınızı belirttiniz,<br>Sorununuzun hızlı çözümlenebilmesi için öncelikle satıcınızla iletişime geçmenizi öneriyoruz.<br>
    Satıcınızdan destek alamadığınızda lütfen sipariş raporlama sistemini kullanınız.<br><br>
    <div style="color:red">Sipariş raporlama seçeneğini gereksiz kullanan üyeler sistemden uzaklaştırılmaktadır.</div><br>
    
    `;
  teslimAldim_visible.value = true;
};
const hideReportModal = () => {
  reportModal_visible.value = false;
  isLoading.value = false;
};
const hideModals = () => {
  teslimAldim_visible.value = false;

  hasErrors.value = false;
  hasErrors.value = false;
};
const showReportModal = () => {
  title.value = "İşlemi Onayla";
  content.value = `Otomatik teslim edilen bir üründe sorun yaşadığınızı belirttiniz,<br>Sorununuzun hızlı çözümlenebilmesi için öncelikle satıcınızla iletişime geçmenizi öneriyoruz.<br>
    Satıcınızdan destek alamadığınızda lütfen sipariş raporlama sistemini kullanınız.<br><br>
    <div style="color:red">Sipariş raporlama seçeneğini gereksiz kullanan üyeler sistemden uzaklaştırılmaktadır.</div><br>
    `;

  reportModal_visible.value = true;
};
const sendRejectProof = async () => {
  isLoading.value = true;
  console.log(proofCheckboxValid.value);
  if (proofCheckboxValid.value == false) {
    hasErrors.value = true;
    errorMessageProof.value = "Lütfen onay kutucuğunu işaretleyiniz";
    return false;
  }
  const _reportProof = reportProof.value;
  console.log(reportProof.value);
  if (_reportProof == "") {
    hasErrors.value = true;
    errorMessageProof.value = "Lütfen video urlsini yazınız ";
    return false;
  }
  const Data1 = detailData.value.DataId_1;
  const purchaseId = detailData.value.purchaseID;
  const response = await rejectStockBuyOrder({
    Data1,
    purchaseId,
    _reportProof,
  });
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
  console.log(response);
};
const handleAction = async () => {
  hasErrors.value = false;

  const Data1 = detailData.value.DataId_1;
  const purchaseId = detailData.value.purchaseID;
  let response;
  console.log(Data1, purchaseId);
  if (selectedButtonType.value == 0) {
    isLoading.value = true;

    response = await confirmStockBuyOrder({ Data1, purchaseId });
    console.log(response);
  } else if (selectedButtonType.value == 1) {
    alert("Work in progress");
    hideModals();
    isLoading.value = false;

    return false;
  }
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
.sdbtn {
  margin-left: 5px;
  margin-right: 5px;
}
.sdicon {
  margin-right: 5px;
}
.info-wrap {
  background: grey;
  color: rgba(255, 255, 255, 0.85);
  border-radius: 5px;
  padding: 15px;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
.check-wrap {
  margin-block: 15px;
}
</style>
