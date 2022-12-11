<template>
  <div class="content">
    <a-row class="header">
      <a-col :xl="10">
        <h3 class="title">Mail Adresini Değiştir</h3>
      </a-col>
      <a-col :xl="8"></a-col>
      <a-col :xl="6"> </a-col>
    </a-row>
    <a-row class="formWrap">
      <a-col :xl="16">
        <a-form layout="vertical">
          <a-form-item label="Mevcut Mail Adresiniz" class="formRow">
            <a-input
              v-model:value="mailData.current"
              placeholder="kullanicimail@gmail.com"
              class="formInput"
            />
          </a-form-item>
          <a-form-item label="Yeni Mail Adresiniz" class="formRow">
            <a-input
              v-model:value="mailData.new"
              placeholder=""
              class="formInput"
            />
          </a-form-item>
          <a-form-item label="Tekrar Yeni Mail Adresiniz" class="formRow">
            <a-input
              v-model:value="mailData.new_r"
              placeholder=""
              class="formInput"
            />
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-row class="footer">
      <a-col :xl="16" style="margin-right: 5px">
        <a-button
          v-if="!isLoading"
          @click="_changeMail"
          type="primary"
          size="large"
          >Değişiklikleri Kaydet</a-button
        >
        <a-spin v-else></a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>

import Swal from "sweetalert2";

import {
  changeMail,
  verifyMail,
  checkLogin,
} from "@/services/settings/settings.service";
import { useUserStore } from "@/store/user/user.store";
import { ref, onMounted, computed } from "vue";
const isLoading = ref(false);
const mailData = ref({
  current: "",
  new: "",
  new_r: "",
});
const userStore = useUserStore();

onMounted(() => {
  _checkLogin();
});
const _checkLogin = async () => {
  const response = await checkLogin();
  userStore.setMailAddress(response.data.result.MailAddress);
  mailData.value.current = userStore.getMailAddress;
  console.log(response);
};
const _verifyMail = async (code, changeToken, verifyToken) => {
  const response = await verifyMail(code, changeToken, verifyToken);
  return response;
};
const _changeMail = async () => {
  isLoading.value = true;
  const response = await changeMail(
    mailData.value.current,
    mailData.value.new,
    mailData.value.new_r
  );
  console.log(response);
  if (response?.data.success == false) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Hata.",
      html: response.data.message,
      showConfirmButton: false,
    });
  } else {
    if (response) {
      if (response.data.success == false) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hata.",
          html: response.data.message,
          showConfirmButton: false,
        });
      } else {
        verifyModal(response);
      }
    }
  }
  isLoading.value = false;
};
const verifyModal = (response) => {
  Swal.fire({
    title: "Doğrulama Kodu",
    input: "text",
    icon: "info",
    html:
      response.data.message +
      '<br><br> <h3 style="margin-bottom:0px">Doğrulama Kodu</h3>',
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Doğrula",
    cancelButtonText: "İptal",
    showLoaderOnConfirm: true,
    willClose: () => {},
    preConfirm: (code) => {
      const changeToken = response.data.changeToken;
      const verifyToken = response.data.verifyToken;
      console.log(changeToken);
      console.log(verifyToken);

      return _verifyMail(code, changeToken, verifyToken)
        .then((res) => {
          if (res.data.success == false) {
            Swal.showValidationMessage(res.data.message);
          }
        })
        .catch((error) => {
          Swal.showValidationMessage(`Hata oluştu: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Mail adresi başarıyla güncellendi.",
        showConfirmButton: false,
      });
      _checkLogin();
      postData.value.new = "";
      postData.value.new_r = "";
    }
  });
};
</script>
<style lang="scss" scoped>
.subtitle {
  opacity: 0.9;
}
.formWrap {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.content {
  background: #fff;
  border-radius: 5px;
}

.submitBtn {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  padding: 20px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.footer {
  justify-content: center;
  padding: 20px;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.formRow {
  margin-top: 10px;
}
.formInput {
  margin-top: 10px;
}
</style>
