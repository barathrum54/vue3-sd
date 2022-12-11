<template>
  <div class="content">
    <a-row class="header">
      <a-col :xl="10">
        <h3 class="title">Telefon Numaranı Değiştir</h3>
      </a-col>
      <a-col :xl="8"></a-col>
      <a-col :xl="6"> </a-col>
    </a-row>

    <a-row class="formWrap">
      <a-col :xl="16">
        <a-form layout="vertical">
          <a-form-item label="Mevcut Telefon Numaranız" class="formRow">
            <a-input
              v-is-mask="'### ### ## ##'"
              v-model:value="phoneData.current"
              placeholder="552 384 ** **"
              class="formInput"
            />
          </a-form-item>
          <a-form-item label="Yeni Telefon Numaranız" class="formRow">
            <a-input
              v-is-mask="'### ### ## ##'"
              v-model:value="phoneData.new"
              placeholder="(___) ___ __ __"
              class="formInput"
            />
          </a-form-item>
          <a-form-item label="Tekrar Yeni Telefon Numaranız" class="formRow">
            <a-input
              v-is-mask="'### ### ## ##'"
              v-model:value="phoneData.new_r"
              placeholder="(___) ___ __ __"
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
          @click="_changePhoneNumber"
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
  changePhoneNumber,
  verifyPhone,
  checkLogin,
} from "@/services/settings/settings.service";
import { useUserStore } from "@/store/user/user.store";
import { ref, onMounted, computed } from "vue";
const isLoading = ref(false);
const phoneData = ref({
  current: "",
  new: "",
  new_r: "",
});
const userStore = useUserStore();

const userPhone = computed(() => userStore.getPhone);
onMounted(() => {
  phoneData.value.current = userPhone.value;
  _checkLogin();
  console.log(phoneData.value.current);
});
const _verifyPhone = async (code, changeToken, verifyToken) => {
  const response = await verifyPhone(code, changeToken, verifyToken);
  return response;
};
const _checkLogin = async () => {
  const response = await checkLogin();
  console.log(response);
  userStore.setPhone(response.data.result.Phone);
  phoneData.value.current = userStore.getPhone;
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

      return _verifyPhone(code, changeToken, verifyToken)
        .then((res) => {
          console.log(res);

          if (res.data.verifyToken) {
            verifyModal(res);
            Swal.showValidationMessage(res.data.message);
          }
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
    console.log(result);
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Telefon Numarası başarıyla güncellendi.",
        showConfirmButton: false,
      });
      _checkLogin();
      phoneData.value.new = "";
      phoneData.value.new_r = "";
    }
  });
};
const _changePhoneNumber = async () => {
  isLoading.value = true;
  const response = await changePhoneNumber(
    phoneData.value.current.replace(/\s/g, ""),
    phoneData.value.new.replace(/\s/g, ""),
    phoneData.value.new_r.replace(/\s/g, "")
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
</script>
<style lang="scss" scoped>
.subtitle {
  opacity: 0.9;
}
.formWrap {
  padding: 20px;
  display: flex;
  justify-content: center;
  // 5376884839
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
