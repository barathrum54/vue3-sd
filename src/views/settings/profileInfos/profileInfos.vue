<template>
  <div class="content">
    <a-row class="header">
      <a-col :xl="10">
        <h3 class="title">Profil Bilgileri</h3>
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
              <b> Bilgilerinizi doldururken dikkatli olun!</b><br />

              Burada yer alan bilgileriniz diğer tüm kullanıcılar tarafından
              görülebilir olacaktır. Bu yüzden bilinmesini istemediğiniz
              bilgileri doldurmayınız.
            </h3>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xl="16">
        <a-form layout="vertical">
          <a-form-item label="Hakkında" class="formRow">
            <a-textarea
              type="text"
              v-model:value="postData.Hakkinda"
              class="formInput"
            />
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :xl="16">
        <a-form layout="vertical">
          <a-form-item label="Yaşadığın Şehir" class="formRow">
            <a-select
              v-model:value="postData.Sehir"
              show-search
              placeholder="Şehir Seçin"
              :options="_cities"
              :filter-option="filterCity"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
            >
            </a-select>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-row class="footer">
      <a-col :xl="16" style="margin-right: 5px">
        <a-button
          v-if="!isLoading"
          @click="_changeProfileDatas"
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
  changeProfileDatas,
  getUserProfileData,
} from "@/services/settings/settings.service";
import { ref, onMounted, computed } from "vue";
const isLoading = ref(false);
const postData = ref({
  Hakkinda: "",
  Sehir: "",
});
const _cities = ref([]);
onMounted(() => {
  _getData();
});
const filterCity = (input, option) => {
  return (
    option.label.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) >= 0
  );
};
const _getData = async () => {
  const response = await getUserProfileData();
  if (response?.data?.datas) {
    postData.value.Hakkinda = response.data.datas.Bio;
    postData.value.Sehir = response.data.datas.City;
    _cities.value = [];
    response.data.cities.forEach((item) => {
      _cities.value.push({ value: item.key, label: item.title });
    });
  }
};

const _changeProfileDatas = async () => {
  isLoading.value = true;
  const response = await changeProfileDatas(postData.value);
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
