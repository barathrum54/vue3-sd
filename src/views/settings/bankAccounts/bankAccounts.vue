<template>
  <div class="content">
    <a-row>
      <a-col :xl="6">
        <h3 class="title">Banka Hesapları</h3>
      </a-col>
      <a-col :xl="12"></a-col>
      <a-col :xl="6">
        <a-button
          style="width: 100%"
          type="primary"
          @click="newBankAccount_visible = true"
          >Yeni Banka Hesabı
        </a-button>
      </a-col>
    </a-row>
    <a-row class="accountsWrap" v-if="_accounts.length">
      <a-col :xl="24" class="accountsInner">
        <a-row class="accountsHeaders">
          <a-col :xl="9"> Banka/Hesap</a-col>
          <a-col :xl="9"> Hesap Sahibi</a-col>
          <a-col :xl="4"> Durum</a-col>
          <a-col :xl="2"> İşlem</a-col>
        </a-row>
        <a-row v-for="i in _accounts" class="accountsRow">
          <a-col :xl="9" class="accountCol">
            <div class="icon">
              <img :src="i.Image" alt="" />
            </div>
            <div class="info">
              <div class="title">{{ i.BankName }}</div>
              <div class="subtitle">{{ i.IBAN }}</div>
            </div>
          </a-col>
          <a-col :xl="9" class="ownerCol"> {{ i.Owner }}</a-col>
          <a-col :xl="4" class="stateCol">
            <div
              class="state"
              :style="[
                { 'background-color': stateBgs[i.StateNo].bg },
                { color: stateBgs[i.StateNo].color },
              ]"
            >
              {{ i.State }}
            </div>
          </a-col>
          <a-col :xl="2" class="actionsCol">
            <sdFeatherIcons
              v-if="!i.isLoading"
              @click="deleteBankAccount(i)"
              type="trash"
              class="actionBtn"
            />
            <a-spin v-else></a-spin>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row v-else class="noAccountsWrap">
      <img
        class="img"
        :src="require(`@/static/img/icon/noBankAccount.svg`)"
        alt=""
      />
      <h3>Banka Hesabı Bulunamadı</h3>
      <h5>Hesabınıza kayıtlı banka hesabı bulunamadı,</h5>
      <h5>Sağ üstte bulunan buton ile yeni banka hesabı ekleyebilirsiniz.</h5>
    </a-row>
    <sdModal
      style="max-width: 1000px"
      title="Yeni Banka Hesabı Ekle"
      :visible="newBankAccount_visible"
      :onCancel="hideModals"
    >
      <div class="newBankAccountModalContent">
        <a-row>
          <a-col
            :xl="8"
            class="typeSelectWrap"
            :class="{ selected: selectedType == 1 }"
          >
            <a-row class="typeSelectWrapInner" @click="selectType(1)">
              <a-col :xl="6" class="icon">
                <img :src="require(`@/static/img/icon/papara.svg`)" alt="" />
              </a-col>
              <a-col :xl="18">
                <div class="title">Papara</div>
                <div class="subtitle">Papara Numarası</div>
              </a-col>
            </a-row>
          </a-col>
          <a-col
            :xl="8"
            class="typeSelectWrap"
            :class="{ selected: selectedType == 2 }"
          >
            <a-row class="typeSelectWrapInner" @click="selectType(2)">
              <a-col :xl="6" class="icon">
                <img
                  :src="require(`@/static/img/icon/bankAccountSelect.svg`)"
                  alt=""
                />
              </a-col>
              <a-col :xl="18">
                <div class="title">Banka Hesabı</div>
                <div class="subtitle">IBAN</div>
              </a-col>
            </a-row>
          </a-col>
          <a-col
            :xl="8"
            class="typeSelectWrap"
            :class="{ selected: selectedType == 3 }"
          >
            <a-row class="typeSelectWrapInner" @click="selectType(3)">
              <a-col :xl="6" class="icon">
                <img
                  :src="require(`@/static/img/icon/bankAccountSelect.svg`)"
                  alt=""
                />
              </a-col>
              <a-col :xl="18">
                <div class="title">İninal</div>
                <div class="subtitle">İninal Numarası</div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row class="form">
          <a-col :xl="24" class="formRow" v-if="selectedType == 2">
            <h4>Banka Seçin</h4>
            <a-select
              ref="select"
              @change="bankChanged"
              style="width: 100%"
              v-model:value="postData.bankName"
            >
              <a-select-option value="2"
                >T. GARANTİ BANKASI A.Ş.
              </a-select-option>
              <a-select-option value="3">T. İŞ BANKASI A.Ş.</a-select-option>
              <a-select-option value="4"
                >T.C. ZİRAAT BANKASI A.Ş.
              </a-select-option>
              <a-select-option value="5">T. HALK BANKASI A.Ş.</a-select-option>
              <a-select-option value="6">AKBANK T.A.Ş.</a-select-option>
              <a-select-option value="7"
                >YAPI ve KREDİ BANKASI A.Ş.
              </a-select-option>
              <a-select-option value="8">DENİZBANK A.Ş.</a-select-option>
              <a-select-option value="9">ING BANK A.Ş.</a-select-option>
              <a-select-option value="10">HSBC BANK A.Ş.</a-select-option>
              <a-select-option value="11">QNB FİNANS BANK A.Ş.</a-select-option>
              <a-select-option value="12">PTT</a-select-option>
              <a-select-option value="13">ŞEKERBANK T.A.Ş</a-select-option>
              <a-select-option value="14"
                >KUVEYT TÜRK KATILIM BANKASI A.Ş.
              </a-select-option>
              <a-select-option value="15"
                >T. VAKIFLAR BANKASI T.A.O.
              </a-select-option>
              <a-select-option value="16">TÜRK EKONOMİ BANKASI</a-select-option>
              <a-select-option value="17"
                >ALBARAKA TÜRK KATILIM BANKASI A.Ş.
              </a-select-option>
              <a-select-option value="18">FİBABANKA</a-select-option>
              <a-select-option value="19"
                >TÜRKİYE FİNANS KATILIM BANKASI A.Ş.
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :xl="24" class="formRow">
            <h4>{{ typeLabels[selectedType] }}</h4>
              <a-input v-if="selectedType == 1"
              v-is-mask="'#############'"
              v-model:value="accountNumber"
            ></a-input>
            <a-input v-if="selectedType == 2"
              v-is-mask="'TR## #### #### #### #### ####'"
              v-model:value="accountNumber"
            ></a-input>
              <a-input v-if="selectedType == 3"
              v-is-mask="'##########'"
              v-model:value="accountNumber"
            ></a-input>
          </a-col>
          <a-col :xl="24" class="formRow">
            <h4>Hesap Sahibi</h4>
            <a-input v-model:value="accountOwner"></a-input>
          </a-col>
          <a-col :xl="24" class="formRow">
            <h4>Sorumluluk Onayı</h4>
            <a-row>
              <a-col :xl="1">
                <a-checkbox v-model:checked="securityTextChecked"></a-checkbox>
              </a-col>
              <a-col :xl="23">
                <h5 class="securityText">
                  Girdiğim hesabın belirtilen hesap sahibine ait olduğunu, Hesap
                  numarası veya hesap sahibinin hatalı olması durumunda
                  gönderimin gerçekleşmeyeceğini kabul ediyorum.
                </h5>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xl="24" class="formRow">
            <a-row>
              <a-col style="margin-right: 10px">
                <a-button
                  v-if="!addNewBankAccount_loading"
                  style="width: 100%"
                  type="primary"
                  @click="addNewBankAccount"
                  >Banka Hesabı Kaydet
                </a-button>
                <a-spin v-else></a-spin>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </sdModal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Swal from "sweetalert2";

import {
  addBankAccount,
  getBankList,
  userBankDelete,
} from "@/services/settings/settings.service";

const stateBgs = computed(() => ({
  1: { bg: "rgba(32, 201, 151, 0.1)", color: "#20c997" },
  0: { bg: "rgba(250, 139, 12, 0.1)", color: "rgba(250, 139, 12, 1)" },
  3: { bg: "rgba(255, 77, 79, 0.1)", color: "rgba(255, 77, 79,1)" },
}));

const _accounts = ref([
  // {
  //   type: 1,
  //   typeName: "Papara",
  //   accountNumber: "031258698544",
  //   accountOwner: "Muhammet Emin Yormaz",
  //   state: 1,
  //   stateText: "Onaylanmış",
  //   isLoading: false,
  //   icon: "paparaIcon.svg",
  // },
  // {
  //   type: 2,
  //   typeName: "T.C. Ziraat Bankası",
  //   accountNumber: "TR54 1234 1234 1234 1234 1234 01",
  //   accountOwner: "Nurten Yormaz",
  //   state: 2,
  //   stateText: "Onay Bekliyor",
  //   isLoading: false,
  //   icon: "ziraatIcon.svg",
  // },
  // {
  //   type: 3,
  //   typeName: "Garanti Bankası",
  //   accountNumber: "TR33 1234 1234 1234 1234 1234 01",
  //   accountOwner: "Abdul Kadir Yormaz",
  //   state: 3,
  //   stateText: "Reddedilmiş",
  //   isLoading: false,
  //   icon: "garantiIcon.svg",
  // },
]);
const newBankAccount_visible = ref(false);
const selectedType = ref(0);
const securityTextChecked = ref(false);
const accountNumber = ref("");
const accountOwner = ref("");
const addNewBankAccount_loading = ref(false);
onMounted(() => {
  selectType(1);
  getBankAccounts();
});
const getBankAccounts = async () => {
  const response = await getBankList();
  if (response.data.datas.length) {
    _accounts.value = [];
    response.data.datas.forEach((a) => {
      _accounts.value.push(a);
    });
    console.log(_accounts);
  }
  console.log(response);
};
const typeLabels = {
  1: "Papara Numarası",
  2: "IBAN",
  3: "İninal Numarası",
};
const selectType = (n) => {
  selectedType.value = n;
  accountNumber.value = "";
  accountOwner.value = "";
  postData.value = {
    bankName: "",
    iban: "",
    owner: "",
    ininal_barkod: "",
    papara_hesap: "",
    type: "",
  };
  securityTextChecked.value = false;
};
const hideModals = () => {
  newBankAccount_visible.value = false;
  selectType(1);
};
const deleteBankAccount = async (i) => {
  Swal.fire({
    title: "Emin misiniz?",
    text: "Bu banka hesabını silmek istediğinize emin misiniz?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Evet, Sil!",
    cancelButtonText: "Vazgeç",
  }).then(async (result) => {
    if (result.isConfirmed) {
      i.isLoading = true;
      const response = await userBankDelete(i.Id);
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "İşlem başarılı.",
            html: response.data.message,
            showConfirmButton: false,
          });
          getBankAccounts();
        }
      }
      i.isLoading = false;
    }
  });
};
const postData = ref({
  bankName: "",
  iban: "",
  owner: "",
  ininal_barkod: "",
  papara_hesap: "",
  type: "",
});
const addNewBankAccount = async () => {
  if (accountNumber.value == "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Hata.",
      html: "Hesap Numarası alanı boş olamaz.",
      showConfirmButton: false,
    });
    return;
  } else if (accountOwner.value == "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Hata.",
      html: "Hesap Sahibi alanı boş olamaz.",
      showConfirmButton: false,
    });
    return;
  } else if (securityTextChecked.value == false) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Hata.",
      html: "Sorumluluk Onay kutucuğunu işaretleyin.",
      showConfirmButton: false,
    });
    return;
  }

  addNewBankAccount_loading.value = true;

  if (selectedType.value == 1) {
    postData.papara_hesap = accountNumber.value;
    postData.type = "Papara";
    postData.owner = accountOwner.value;
  }
  if (selectedType.value == 2) {
    postData.iban = accountNumber.value;
    postData.type = "Banka";
    postData.owner = accountOwner.value;
  }
  if (selectedType.value == 3) {
    postData.ininal_barkod = accountNumber.value;
    postData.type = "Ininal";
    postData.owner = accountOwner.value;
  }
  console.log(postData.value);
  const response = await addBankAccount(postData);
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: "İşlem başarılı.",
        html: response.data.message,
        showConfirmButton: false,
      });
      hideModals();
      getBankAccounts();
    }
  }

  console.log(response);
  addNewBankAccount_loading.value = false;
};
const bankChanged = () => {
  console.log(postData.value);
};
</script>
<style lang="scss" scoped>
.subtitle {
  opacity: 0.9;
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
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}

.noAccountsWrap {
  padding-block: 50px;
  border-top: 1pt solid rgba($color: #000000, $alpha: 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  .img {
    width: 70px;
    object-fit: contain;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
}

.content {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
}

.typeSelectWrap {
  border-radius: 5px;
  padding: 5px;

  .typeSelectWrapInner {
    cursor: pointer;

    padding-inline: 30px;
    padding-block: 20px;

    .icon {
      img {
        width: 40px;
        height: 40px;
      }

      padding-right: 10px;
    }

    .title {
      white-space: nowrap;
      font-size: 15px;
    }

    .subtitle {
      white-space: nowrap;
      opacity: 0.7;
      font-size: 12px;
    }
  }
}

.typeSelectWrap.selected {
  .typeSelectWrapInner {
    box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.05);
  }
}

.newBankAccountModalContent {
  .form {
    margin-top: 20px;

    .formRow {
      margin-block: 10px;

      .securityText {
        opacity: 0.9;
      }
    }
  }
}

.accountCol {
  .icon {
    width: 50px !important;
  }

  img {
    width: 50px;
    height: 40px;
    object-fit: contain;
  }
}
</style>
