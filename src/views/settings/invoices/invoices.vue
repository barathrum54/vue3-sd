<template>
  <div class="content">
    <a-row class="header">
      <a-col :xl="10">
        <h3 class="title">Fatura Bilgileri</h3>
      </a-col>
      <a-col :xl="8"></a-col>
      <a-col :xl="6"> </a-col>
    </a-row>
    <a-row class="formWrap">
      <a-col :xl="24" class="infoTextWrap">
        <a-row>
          <a-col :xl="1">
            <sdFeatherIcons class="text" type="info" size="30" />
          </a-col>
          <a-col :xl="23" style="padding-left: 5px">
            <h3 class="text">
              <b> E-Fatura Bilgilendirmesi</b><br />

              Burada yer alan bilgileriniz adınıza fatura düzenlemek için
              kullanılacaktır. Adınıza düzenlenen tüm faturalar E-Fatura olup
              mail adresinize gönderilecektir.
            </h3>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="24">
        <a-radio-group v-model:value="postData.faturaTipi" size="large">
          <a-radio-button
            :checked="postData.faturaTipi == 1 ? true : false"
            value="1"
            >Bireysel</a-radio-button
          >
          <a-radio-button
            :checked="postData.faturaTipi == 2 ? true : false"
            value="2"
            >Kurumsal</a-radio-button
          >
        </a-radio-group>
      </a-col>
      <a-col :xl="24" v-if="postData.faturaTipi == 1">
        <a-row>
          <a-col :xl="12">
            <a-form layout="vertical">
              <a-form-item label="Adınız" class="formRow">
                <a-input
                  type="text"
                  v-model:value="postData.Name"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :xl="12">
            <a-form layout="vertical">
              <a-form-item label="Soyadınız" class="formRow">
                <a-input
                  type="text"
                  v-model:value="postData.SurName"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :xl="12">
            <a-form layout="vertical">
              <a-form-item label="T.C. Kimlik Numaranız" class="formRow">
                <a-input
                  type="text"
                  v-is-mask="'###########'"
                  v-model:value="postData.TcKimlik"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :xl="12">
            <a-form layout="vertical">
              <a-form-item label="Telefon Numaranız" class="formRow">
                <a-input
                  type="text"
                  v-is-mask="'### ### ## ##'"
                  v-model:value="postData.Phone"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="24" v-if="postData.faturaTipi == 2">
        <a-row>
          <a-col :xl="24">
            <a-form layout="vertical">
              <a-form-item label="Firma Ünvanı" class="formRow">
                <a-input
                  type="text"
                  v-model:value="postData.CompanyName"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :xl="12">
            <a-form layout="vertical">
              <a-form-item label="Vergi Dairesi" class="formRow">
                <a-input
                  type="text"
                  v-model:value="postData.TaxAdministration"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :xl="12">
            <a-form layout="vertical">
              <a-form-item label="Vergi Numarası" class="formRow">
                <a-input
                  type="text"
                  v-model:value="postData.TaxNumber"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :xl="24">
            <a-form layout="vertical">
              <a-form-item label="Firma Adresi" class="formRow">
                <a-textarea
                  type="text"
                  v-model:value="postData.Address"
                  class="formInput"
                />
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="12">
        <a-form layout="vertical">
          <a-form-item label="İl" class="formRow">
            <a-select
              v-model:value="postData.Sehir"
              show-search
              placeholder="Şehir Seçin"
              :options="_cities"
              :filter-option="filterCity"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="_getDistricts"
            >
            </a-select>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :xl="12">
        <a-form layout="vertical">
          <a-form-item label="İlçe" class="formRow">
            <a-select v-model:value="postData.Ilce">
              <a-select-option
                v-for="item in _districts"
                :key="item.Id"
                :value="item.Id"
                >{{ item.Name }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-row class="footer">
      <a-col :xl="24" style="margin-right: 5px">
        <a-button
          v-if="!isLoading"
          @click="_changeBillingDatas"
          type="primary"
          size="large"
          >Değişiklikleri Kaydet</a-button
        >
        <a-spin v-else></a-spin>
      </a-col>
    </a-row>
    <a-row class="invoices">
      <a-col :xl="24" class="infoTextWrap">
        <a-row>
          <a-col :xl="1">
            <sdFeatherIcons class="text" type="info" size="30" />
          </a-col>
          <a-col :xl="23" style="padding-left: 5px">
            <h3 class="text">
              <b> Fatura Bilgilendirmesi</b><br />

              Aşağıdaki listede yer alan faturalar, bulunduğu dönem içerisinde
              sizin yaptığınız harcamalar karşılığında sizin adınıza kestiğimiz
              resmi faturalardır. Faturalar yalnızca kazancımızı resmileştirmek
              adına hazırlanmış olup, sizin ödemeniz gereken hiçbir tutar
              bulunmamaktadır.
            </h3>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="24">
        <a-row class="accountsWrap" v-if="_invoices.length">
          <a-col :xl="24" class="accountsInner">
            <a-row class="accountsHeaders">
              <a-col :xl="2"> # </a-col>
              <a-col :xl="4"> Fatura Dönemi </a-col>
              <a-col :xl="6"> Tutar </a-col>
              <a-col :xl="6"> Durum </a-col>
              <a-col :xl="6"> İşlem </a-col>
            </a-row>
            <a-row v-for="i in _invoices" class="accountsRow">
              <a-col :xl="2">
                {{ i.Id }}
              </a-col>
              <a-col :xl="4"> {{ i.Date }} </a-col>
              <a-col :xl="6"> {{ i.Price }} ₺ </a-col>
              <a-col :xl="6" class="stateCol">
                <div
                  class="state"
                  :style="[
                    { 'background-color': stateBgs[i.State].bg },
                    { color: stateBgs[i.State].color },
                  ]"
                >
                  <span v-html="i.StateText"></span>
                </div>
              </a-col>
              <a-col :xl="6" class="actionsCol">
                <sdFeatherIcons
                  v-if="!i.isLoading"
                  @click="mailInvoice(i)"
                  type="mail"
                  class="actionBtn"
                />
                <sdFeatherIcons
                  v-if="!i.isLoading"
                  @click="downloadInvoice(i)"
                  type="download"
                  class="actionBtn"
                />
                <a-spin v-else></a-spin>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";

import {
  getInvoiceData,
  changeBillingDatas,
  getDistricts,
  getInvoiceLink,
  mailInvoiceData,
  getBillingData,
  getUserProfileData,
} from "@/services/settings/settings.service";
import { ref, onMounted, computed } from "vue";
const isLoading = ref(false);
const stateBgs = computed(() => ({
  1: { bg: "rgba(32, 201, 151, 0.1)", color: "#20c997" },
  0: { bg: "rgba(250, 139, 12, 0.1)", color: "rgba(250, 139, 12, 1)" },
  3: { bg: "rgba(255, 77, 79, 0.1)", color: "rgba(255, 77, 79,1)" },
}));
const postData = ref({
  faturaTipi: 1,
  Name: "",
  SurName: "",
  TcKimlik: "",
  Phone: "",
  CompanyName: "",
  TaxAdministration: "",
  TaxNumber: "",
  Address: "",
  Sehir: 34,
  Ilce: "",
});
const _cities = ref([]);
const _invoices = ref([]);
const _districts = ref([]);
onMounted(() => {
  _getData();
  _getDistricts();
});

const _getDistricts = async () => {
  postData.value.Ilce = null;
  const response = await getDistricts(postData.value.Sehir);
  console.log(response);
  _districts.value = response.data.datas;
  console.log(_districts);
};
const mailInvoice = async(i) => {
const response = await mailInvoiceData(i.Id);
if(response?.data?.message){
  if(response.data.success){
      Swal.fire({
      position: "center",
      icon: "success",
      title: "İşlem Başarılı.",
      html: response.data.message,
      showConfirmButton: false,
    });
  }else{
      Swal.fire({
      position: "center",
      icon: "error",
      title: "Hata.",
      html: response.data.message,
      showConfirmButton: false,
    });
  }
}
}
const downloadInvoice = async(i) => {
  const response = await getInvoiceLink(i.Id);
  if(response?.data?.link){
     window.open(response.data.link, '_blank')
  }
  console.log(response);
}
const _getData = async () => {
  const res = await getBillingData();
  console.log(res);
  if (res) {
    postData.value.Address = res.data.data.Address;
    postData.value.Sehir = res.data.data.City;
    await _getDistricts();
    postData.value.Company = res.data.data.Company;
    postData.value.CompanyName = res.data.data.CompanyName;
    postData.value.Name = res.data.data.Name;
    postData.value.SurName = res.data.data.SurName;
    postData.value.ParasutID = res.data.data.ParasutID;
    postData.value.Phone = res.data.data.Phone;
    postData.value.TcKimlik = res.data.data.IdentityNumber;
    postData.value.TaxAdministration = res.data.data.TaxAdministration;
    postData.value.TaxNumber = res.data.data.TaxNumber;
    postData.value.faturaTipi = res.data.faturaTipi == "Bireysel" ? 1 : 2;
    postData.value.Ilce = res.data.data.District;

  }
  const response = await getInvoiceData();
  if (response?.data?.datas?.length) {
    _invoices.value = [];
    response.data.datas.forEach((item) => {
      _invoices.value.push(item);
    });
    console.log(_invoices);
  }
  console.log(response);
  const cities = await getUserProfileData();
  if (cities?.data?.datas) {
    _cities.value = [];
    cities.data.cities.forEach((item) => {
      _cities.value.push({ value: item.key, label: item.title });
    });
  }
};

const _changeBillingDatas = async () => {
  isLoading.value = true;
  const response = await changeBillingDatas(postData.value);
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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "İşlem Başarılı.",
      html: response.data.message,
      showConfirmButton: false,
    });
  }
  isLoading.value = false;
};
const filterCity = (input, option) => {
  return (
    option.label.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) >= 0
  );
};
</script>
<style lang="scss" scoped>
.subtitle {
  opacity: 0.9;
}
.formWrap,
.invoices {
  padding: 20px;
  padding-inline: 50px;
  display: flex;
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
  padding-inline: 50px;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.formRow {
  padding-inline: 10px;
  margin-top: 10px;
}
.formInput {
  margin-top: 10px;
}

.accountsWrap {
  padding: 10px;
  display: flex;
  justify-content: center;
  border-top: 1pt solid rgba($color: #000000, $alpha: 0.05);
  .accountsInner {
    .accountsHeaders {
      background-color: #f8f9fb;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 15px;
      margin-top: 30px;
    }
    .accountsRow {
      padding: 10px;
      padding-left: 20px;
      .accountCol {
        display: flex;
        align-items: center;
        .icon {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .info {
          .title {
            font-size: 13px;
            font-weight: 500;
          }
          .subtitle {
            font-size: 11px;
            opacity: 0.8;
          }
        }
      }
      .stateCol {
        .state {
          width: fit-content;
          padding: 3px;
          padding-inline: 6px;
          border-radius: 10px;
          font-size: 11px;
        }
      }
      .actionsCol .actionBtn {
        padding: 10px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}
</style>
