<template>
  <div class="content">
    <a-row class="header">
      <a-col :xl="10">
        <h3 class="title">Şifreyi Değiştir</h3>
      </a-col>
      <a-col :xl="8"></a-col>
      <a-col :xl="6"> </a-col>
    </a-row>
    <a-row class="formWrap">
      <a-col :xl="16" class="infoTextWrap">
        <a-row>
          <a-col :xl="1">
            <sdFeatherIcons class="text" type="info" size="30" />
          </a-col>
          <a-col :xl="23" style="padding-left: 5px">
            <h3 class="text">
              Bilgilendirme <br />

              Lütfen daha önce farklı bir sitede kullanmadığınız şifre
              deneyiniz.
            </h3>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="16">
        <a-form layout="vertical">
          <a-form-item label="Mevcut Şifreniz" class="formRow">
            <a-input-password
              type="number"
              v-model:value="passwordData.current"
              placeholder="****"
              class="formInput"
            />
          </a-form-item>
          <a-form-item label="Şifreniz" class="formRow">
            <a-input-password
              v-model:value="passwordData.new_password"
              placeholder="****"
              class="formInput"
            />
          </a-form-item>
          <a-form-item label="Tekrar Şifreniz" class="formRow">
            <a-input-password
              v-model:value="passwordData.new_password_r"
              placeholder="****"
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
          @click="_changePassword"
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
import { useAuthStore } from "@/store/auth/auth.store";
import { changePassword } from "@/services/settings/settings.service";
import Swal from "sweetalert2";
import { ref } from "vue";
const isLoading = ref(false);
const passwordData = ref({
  current: "",
  new_password: "",
  new_password_r: "",
});
const _changePassword = async () => {
  isLoading.value = true;
  const response = await changePassword(
    passwordData.value.current,
    passwordData.value.new_password,
    passwordData.value.new_password_r
  );
  console.log(response);
  if (response?.data.success == false) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Hata`,
      html: response.data.message,
      showConfirmButton: true,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: response.data.message,
      showConfirmButton: true,
    });
    passwordData.value.current = "";
    passwordData.value.new_password = "";
    passwordData.value.new_password_r = "";

    const authStore = useAuthStore();
    authStore.clearTokens();
    authStore.setTokens(response.data.token,response.data.SocketToken);
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
}
.content {
  background: #fff;
  border-radius: 5px;
}
.infoTextWrap {
  background: #dbf1ff;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px;
  .text {
    font-size: 13px;
    color: #51acea;
  }
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
