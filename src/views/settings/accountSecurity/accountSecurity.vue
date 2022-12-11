<template>
  <div class="content">
    <a-row class="header">
      <a-col :xl="10">
        <h3 class="title">Hesap Güvenlik Ayarları</h3>
      </a-col>
      <a-col :xl="8"></a-col>
      <a-col :xl="6"> </a-col>
    </a-row>

    <a-row class="formWrap">
      <a-col :xl="24" class="card">
        <div class="cardHeader">Giriş Güvenlikleri</div>
        <a-row class="cardContent">
          <a-col class="cardRow" :xl="24">
            <a-row>
              <a-col :xl="20" class="textContent">
                <h3 class="title">Mail Güvenliği</h3>
                <h5 class="subtitle">
                  Giriş güvenliği olarak mail adresinden onay kodu
                  istenilmektedir.
                </h5>
              </a-col>
              <a-col :xl="4" class="switch">
                <a-switch
                  @change="updateSettings('MailSecurity')"
                  v-model:checked="postData.mail_guvenligi"
                  :loading="isLoading"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col class="cardRow" :xl="24">
            <a-row>
              <a-col :xl="20" class="textContent">
                <h3 class="title">SMS Güvenliği</h3>
                <h5 class="subtitle">
                  Giriş güvenliği olarak SMS onay kodu istenilmektedir.
                </h5>
              </a-col>
              <a-col :xl="4" class="switch">
                <a-switch
                  @change="updateSettings('SMSSecurity')"
                  :loading="isLoading"
                  v-model:checked="postData.sms_guvenligi"
                />
              </a-col>
            </a-row>
          </a-col>
          <a-col class="cardRow" :xl="24">
            <a-row>
              <a-col :xl="20" class="textContent">
                <h3 class="title">Google Authenticator (2FA)</h3>
                <h5 class="subtitle">
                  Giriş güvenliği olarak Authenticator kodu istenilmektedir.
                </h5>
              </a-col>
              <a-col :xl="4" class="switch">
                <a-switch :checked="true" />
              </a-col>
            </a-row>
          </a-col>
          <a-col class="cardRow" :xl="24">
            <a-row>
              <a-col :xl="20" class="textContent">
                <h3 class="title">Yurtdışı Erişimi Koruma</h3>
                <h5 class="subtitle">
                  Üyeliğinize Türkiye dışında bir IP adresinden erişilmesini
                  engellemektedir.
                </h5>
              </a-col>
              <a-col :xl="4" class="switch">
                <a-switch
                  @change="updateSettings('AboardSecurity')"
                  :loading="isLoading"
                  v-model:checked="postData.yurtdisi_koruma"
                />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="24" class="card">
        <div class="cardHeader">Güvenlik Bilgilendirmeleri</div>
        <a-row class="cardContent">
          <a-col class="cardRow" :xl="24">
            <a-row>
              <a-col :xl="20" class="textContent">
                <h3 class="title">Farklı Cihaz Girişinde Bildir</h3>
                <h5 class="subtitle">
                  Üyeliğinize farklı bir cihazdan giriş yapıldığında mail ile
                  bilgilendirilirsiniz.
                </h5>
              </a-col>
              <a-col :xl="4" class="switch">
                <a-switch :checked="true" :loading="isLoading" />
              </a-col>
            </a-row>
          </a-col>
          <a-col class="cardRow" :xl="24">
            <a-row>
              <a-col :xl="20" class="textContent">
                <h3 class="title">Hatalı Şifre Denemesini Bildir</h3>
                <h5 class="subtitle">
                  Üyeliğinize hatalı bir şifre ile giriş yapılmaya
                  çalışıldığında bilgilendirilirsiniz.
                </h5>
              </a-col>
              <a-col :xl="4" class="switch">
                <a-switch :checked="false" :loading="isLoading" />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="footer" style="display: none">
      <a-col :xl="16" style="margin-right: 5px">
        <a-button
          v-if="!isLoading"
          @click="updateSettings"
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
import { ref, onMounted, computed } from "vue";
import {
  updateAccountSecurity,
  getAccountSecurity,
  verifyAccountSecurity,
} from "@/services/settings/settings.service";
import Swal from "sweetalert2";
const isLoading = ref(false);
const postData = ref({
  mail_guvenligi: null,
  sms_guvenligi: null,
  yurtdisi_koruma: null,
});
onMounted(() => {
  _getAccountSecurity();
});
const _getAccountSecurity = async () => {
  isLoading.value = true;

  const response = await getAccountSecurity();
  if (response?.data?.datas) {
    postData.value.mail_guvenligi =
      response.data.datas.MailSecurity == "Pasif" ? false : true;
    postData.value.yurtdisi_koruma =
      response.data.datas.AbroadSecurity == "Pasif" ? false : true;
    postData.value.sms_guvenligi =
      response.data.datas.SmsGuvenligi == "Pasif" ? false : true;
  }
  isLoading.value = false;

  console.log(response);
};
const updateSettings = async (type, event) => {
  isLoading.value = true;
  console.log(event);
  const response = await updateAccountSecurity(type, postData.value);
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
      let token = response.data.token;
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
          return _verifyAccountSecurity(code, token)
            .then((response) => {
              console.log(response);
              // response.data.success = true;
              // for success true responses
              if (response.data.success == false) {
                Swal.showValidationMessage(response.data.message);
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
            title: "Hesap Güvenliği ayarı başarıyla güncellendi.",
            showConfirmButton: false,
          });
        }
        _getAccountSecurity();
      });
    }
  }

  console.log(response);
};
const _verifyAccountSecurity = async (code, token) => {
  const response = await verifyAccountSecurity(code, token);
  return response;
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
.card {
  background: #f4f5f7;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  .cardHeader {
    font-size: 14px;
    opacity: 0.9;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .cardContent {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.05);
    .cardRow {
      padding: 20px;
      padding-block: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      .textContent {
        .title {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
        }
        .subtitle {
          line-height: 0.7rem;
          opacity: 0.8;
        }
      }
      .switch {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
.cardRow:last-of-type {
  border-bottom: none !important;
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
  padding: 20px;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
}
</style>
