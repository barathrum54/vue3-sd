<template>
  <div style="width: 500px" class="card-wrapper">
    <sdModal
      class="DopingModal"
      width="60%"
      :visible="ModalVisibility"
      :onCancel="closeModal"
      title="İlan Doping"
    >
      <a-row class="show-case-wrapper">
        <a-col class="show-case-leftSide" :sm="24" :md="24" :lg="6" :xl="6">
          <AdvertCard
            :title="selectedDoping.title"
            :id="selectedDoping.id"
            :state="selectedDoping.state"
            :description="selectedDoping.description"
            :finishDateKalan="selectedDoping.finishDateKalan"
            :price="selectedDoping.price"
            :url="selectedDoping.url"
            :boost="selectedDoping.boost"
            :featured="selectedDoping.featured"
            :categoryName="selectedDoping.categoryName"
            :pinned="selectedDoping.pinned"
            :socialpinned="selectedDoping.socialPinned"
            :yukariTasi="selectedDoping.yukariTasi"
            :yukariTasiDatetimeText="selectedDoping.yukariTasiDatetimeText"
            :ilanKalanSaniye="selectedDoping.finishKalanTime"
            :topDescription="true"
          >
            <template #top-description>
              Bu ilanınız için doping işlemi gerçekleştiriyorsunuz
            </template>
          </AdvertCard>
        </a-col>
        <a-col class="show-case-rightSide" :sm="24" :md="24" :lg="18" :xl="18">
          <a-row>
            <a-col :sm="24" :md="24" :lg="12" :xl="12" class="homePageWrapper">
              <div class="homePage">
                <DopingModalCard
                  @selectPrice="changeTotalPrice"
                  type="homepage"
                  :DopingDetail="selectedDoping.boost"
                  :DopingPrices="DopingPrices.Vitrin"
                  :DopingInfo="dopingDescriptions.homepage"
                />
              </div>
            </a-col>
            <a-col :sm="24" :md="24" :lg="12" :xl="12" class="homePageWrapper">
              <div class="homePage">
                <DopingModalCard
                  @selectPrice="changeTotalPrice"
                  type="notification"
                  :DopingPrices="DopingPrices.SosyalVitrin"
                  :DopingDetail="selectedDoping.socialpinned"
                  :DopingInfo="dopingDescriptions.notification"
                />
              </div>
            </a-col>
            <a-col :sm="24" :md="24" :lg="12" :xl="12" class="homePageWrapper">
              <div class="homePage">
                <DopingModalCard
                  @selectPrice="changeTotalPrice"
                  type="market"
                  :DopingPrices="DopingPrices.PazarVitrin"
                  :DopingDetail="selectedDoping.pinned"
                  :DopingInfo="dopingDescriptions.market"
                />
              </div>
            </a-col>
            <a-col :sm="24" :md="24" :lg="12" :xl="12" class="homePageWrapper">
              <div class="homePage">
                <DopingModalCard
                  @selectPrice="changeTotalPrice"
                  type="highlight"
                  :DopingPrices="DopingPrices.OneCikartma"
                  :DopingInfo="dopingDescriptions.highlight"
                  :DopingDetail="selectedDoping.featured"
                />
              </div>
            </a-col>
            <a-col span="24" class="homePageButton">
              <sdButton
                @click="TotalPrice > 0 ? purchase() : ''"
                :transparented="true"
                type="primary"
              >
                {{ t("shop.adverts.dopingModal.saveChanges") }} ({{
                  TotalPrice
                }}.00 {{ t("currency") }})
              </sdButton>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </sdModal>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, ref, defineAsyncComponent } from "vue";
import { CloudDownloadOutlined, CalendarTwoTone } from "@ant-design/icons-vue";
import {
  getDopingPrices,
  boostMyPost,
} from "@/services/shop/adverts/adverts.service";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
const AdvertCard = defineAsyncComponent(() =>
  import("@/components/IS/shop/adverts/AdvertCard")
);
const DopingModalCard = defineAsyncComponent(() =>
  import("./DopingModalCard.vue")
);
const { t } = useI18n({ useScope: "global" });
const deneme = () => {
  console.log("blur dopingmodal");
};
const props = defineProps({
  selectedDopingAdvert: Object,
});
const emit = defineEmits(["closeModal"]);
const finishDateKalanTemplate = ref("");
const ModalVisibility = ref(false);
const selectedDoping = ref();
watch(
  () => props.selectedDopingAdvert,
  () => {
    console.log(props.selectedDopingAdvert);
    if (props.selectedDopingAdvert.dopingModalVisibility) {
      ModalVisibility.value = true;
    }
    selectedDoping.value = props.selectedDopingAdvert;
  }
);

const closeModal = () => {
  emit("closeModal");
  ModalVisibility.value = false;
};
const DopingPrices = ref({});
const Prices = ref({
  homepage: 0,
  notification: 0,
  market: 0,
  highlight: 0,
});
const DopingTime = ref({
  homepage: 0,
  notification: 0,
  market: 0,
  highlight: 0,
});

const dopingDescriptions = {
  homepage: {
    title: "Anasayfa Vitrini",
    description:
      "Vitrin İlanlar Ana Sayfa ve İlan Kategorisinde en üstte sabitlenmiş olarak görünmektedir.",
    imgPath: "https://cdn.itemsatis.com/global/icons/startup.svg",
  },
  notification: {
    title: "Sohbet & Bildirim Vitrin İlanı",
    description:
      "İtemSatış’ın ana sayfasından sonra en aktif sayfalarının mesajlar ve bildirimler sayfası olduğunu biliyor muydunuz?Sohbet & Bildirim vitrini sayesinde ilanınız mesajlarım ve bildirimlerim sayfasının altında listelenecek ve %75’e yakın oranda daha fazla görüntülenme alacaktır. Bu sayede satış sayınız artabilir.",
    imgPath:
      "https://cdn.itemsatis.com/uploads/admin/qwsQ8EhnAaNFjGxI4TSC9J7p2.webp",
  },
  market: {
    title: "Pazar Vitrini",
    description:
      "Bu dopingi satın alarak ilanınızı İlan Pazarı sayfasında en üstte sergileyebilirsiniz. Pazar vitrini sayesinde ilanınız, normal ilanlara göre %70 daha fazla görüntülenme alacaktır. Bu sayede de satış hızınız ve sayınız artacak",
    imgPath: "https://cdn.itemsatis.com/uploads/admin/showcase.svg",
  },
  highlight: {
    title: "İlanını öne çıkar",
    description:
      "Öne çıkarılan ilanlar diğer ilanlardan daha fazla ilgi çekmektedir ve %80 oranında diğer ilanlardan daha hızlı satılmaktadır. İlanınızı öne çıkarttığınızda ilan listeleme sayfalarında organik sıralarınızda bulunacaksınız fakat diğer ilanlardan daha belirgin olmanız için başlık kalınlığı arkaplan rengi vs. gibi bazı özel stiller uygulanacaktır bu sebeple diğer ilanlardan daha belirgin olacaktır.",
    imgPath: "https://cdn.itemsatis.com/global/icons/popularity.svg",
  },
};
const TotalPrice = computed(() => {
  return (
    Prices.value.homepage +
    Prices.value.notification +
    Prices.value.market +
    Prices.value.highlight
  );
});
const fetchDopingPrices = async () => {
  const result = await getDopingPrices();
  DopingPrices.value = result.Doping;
};
const changeTotalPrice = ({ price, type, time }) => {
  if (time.includes("gün")) {
    time = time.slice(0, time.indexOf("gün") - 1); //time değişkeni günle geliyor bunu sadece sayıya çeviriyoruz
    time = time * 24; //api saat cinsinden istediği için saate çeviriyoru
  } else {
    time = time.slice(0, time.indexOf("saat") - 1); //time değişkeni saatle geliyor bunu sadece sayıya çeviriyoruz
  }

  DopingTime.value[type] = time;
  Prices.value[type] = price;
  console.log(Prices.value);
  console.log(DopingTime.value);
};
const purchase = () => {
  Swal.fire({
    title: "İşlem Detayı",
    html:
      `Bakiyenizden aşağıdaki dopingler için <b>${TotalPrice.value}</b> TL kullanılacaktır. </br>` +
      "",
    icon: "info",

    showCancelButton: true,
    confirmButtonText: "Satın Alımı Onayla",
    cancelButtonText: "İşlemi İptal Et",
    cancelButtonColor: "#F37E7E",
    confirmButtonColor: "#3FC3EE",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const data = await boostMyPost(selectedDoping.id, DopingTime.value);
      if (data.success) {
        closeModal();
        Swal.fire(
          "Satın Alım Başarılı",
          `Bakiyenizden ${TotalPrice.value} TL kullanılarak işlem başarıyla tamamlanmıştır.`,
          "success"
        );
      }else{
        Swal.fire(
          "Satın Alım Başarısız",
          `${data.message}`,
          "error"
        );
      }
    } 
  });
};
onMounted(() => {
  fetchDopingPrices();
});
</script>

<style lang="scss">
@import "@/config/global.scss";
@media (max-width: $sm) {
  .DopingModal {
    width: 100% !important;
  }
}
@media (max-width: $md) {
  .DopingModal {
    width: 100% !important;
  }
}
@media (max-width: $lg) {
  .DopingModal {
    width: 90% !important;
  }
}
</style>
<style lang="scss" scoped>
@import "@/config/global.scss";
.icon {
  cursor: pointer;
  font-size: 1.8rem !important;
  transform: translateY(4px);
  align-self: flex-start;
  &:hover {
    color: red;
  }
}

.show-case-wrapper {
  .show-case-leftSide {
    padding: 10px;
    background-color: #fbfbfb;
    border-radius: 5px;
    .doping-alert {
      background-color: rgba(250, 139, 12, 0.2);
      color: rgba(250, 139, 12, 1);
      padding: 7px 15px;
      border-radius: 5px;
      text-align: center;
      font-size: 12px;
      width: 100%;
    }
    .ant-col {
      padding: 0 !important;
    }
    .ant-row {
      margin-left: 0 !important;
      margin-right: 0 !important;
      row-gap: 12px !important;
    }
    .title {
      display: flex;
      flex-direction: column;
      margin-top: 5px;
      max-width: 100%;

      span {
        max-width: 100%;
        height: 36px;
        font-size: 14px;
        line-height: 1.1rem;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 12px;
      }
      h3 {
        margin-bottom: 10px;
        max-width: 100%;
        height: 18px;
        line-height: 1.2rem;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
      }
    }
    .image-container {
      width: 100%;
      height: 215px;
      background-color: #f5f5f5;
      border-radius: 4px;
      display: flex;
      justify-content: center; //fotoğraf 50% için  -furkan
      img {
        object-fit: contain;
        max-width: 90%;
        height: 215px;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .eHvyVL {
      // ant-card
      padding: 20px !important;
    }
    .button-space-around {
      justify-content: space-around;
      flex-wrap: wrap;
    }
    .ant-row {
      width: 100% !important;
    }
    button {
      width: 100% !important;
      border: none;
      border-color: transparent;
    }
    .ant-btn-advertRed:active {
      background-color: #f55656 !important;
      color: white !important;
    }
    .images {
      max-width: 100%;
      max-height: 100%;
    }
    .image-desc {
      position: absolute;
      top: 0;
      left: 50%;
      margin-top: 10px;

      transform: translateX(-50%);
      max-width: 180px;
      white-space: nowrap;

      color: #fff !important;
      font-weight: 600;
      border-radius: 5px;

      .image-desc-blur-container {
        .image-desc-blur {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 5px;
          width: 180px;
          height: 30px;
          text-align: center;
        }
      }
      span {
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        color: white;
        height: 30px;
        width: 100%;
        text-align: center;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .upload-container {
      display: flex;
      .upload {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        border-radius: 3px;
        width: 32px;
        height: 27px;
      }
      .upload.PinnedShowCase {
        background-color: #cde4ec;
        color: #487484;
      }
      .upload.FeaturedShowCase {
        background-color: #ece4cd;
        color: #846a48;
      }
      .upload.SocialShowCase {
        background-color: #cdecd2;
        color: #488450;
      }
      .upload.BoostShowCase {
        background-color: #d2cdec;
        color: #624884;
      }
    }
    .project-timing {
      text-align: center;
      margin-top: 5px;
      position: relative;

      .timer-desc {
        display: none;
        top: -50px;
        left: -30px;
        position: absolute;
        background-color: #191919;
        height: 35px;
        color: #fff;
        font-size: 0.85em;
        border-radius: 4px;
        padding: 5px 10px;
        width: 196px;
        font-weight: 400;
        .triangle {
          position: absolute;
          width: 0;
          height: 0;
          left: 50%;
          transform: translateX(-50%);
          bottom: -15px;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 20px solid #191919;
        }
      }
      .timer {
        width: 100%;
        padding: 2px;
        border-radius: 3px;
        margin-bottom: 15px;
        height: 26px;
        span:nth-child(2) {
          margin-left: 10px;
          &:hover {
            .timer-desc {
              display: inline-block;
            }
          }
        }
      }
      .timer.danger {
        background: #f5e0e0;
        color: #923a3a;
      }
      .price {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1.2em;
        margin-bottom: 10px;
        font-size: 1rem;
        span {
          font-weight: 400;
          font-size: 0.8rem;
        }
      }
    }
  }
  .show-case-rightSide {
    width: 100%;
    padding: 12px;
    .ant-row {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .homePageButton {
      margin-top: 10px;

      button {
        width: 100%;
        //font-size: 1rem;
        //letter-spacing: 0.5px;
      }
    }
    .homePageWrapper {
      max-height: 329px;
      width: 95%;
      padding: 2px;
      .homePage {
        width: calc(100% - 5px);
        height: calc(100% - 5px);
        background-color: #f8f9fb;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    @media (max-width: $sm) {
      .homePageWrapper {
        width: 100%;
        .homePage {
          width: 100%;
        }
      }
    }

    .marketWrapper {
      height: 50%;
      .market {
        width: calc(100% - 5px);
        height: calc(100% - 5px);
        background-color: purple;
        border-radius: 20px;
      }
    }
    .notificationWrapper {
      height: 50%;
      .notification {
        width: calc(100% - 5px);
        height: calc(100% - 5px);
        background-color: red;
        border-radius: 20px;
      }
    }
    .highlightWrapper {
      height: 50%;
      .highlight {
        width: calc(100% - 5px);
        height: calc(100% - 5px);
        background-color: black;
        border-radius: 20px;
      }
    }
  }
}
</style>

<style lang="scss">
.card-wrapper {
  height: 100%;
  width: 500px;
  .ant-card {
    height: 100%;
    .ant-card-body {
      height: calc(100% - 56px);
      .show-case-wrapper {
        height: 100%;
        .show-case-leftSide {
          // height: 100%; responsive'de sorun çıkarttığı için kaldırıldı yeniden eklenebilir -furkan
        }
        .show-case-rightSide {
          height: 100%;
        }
      }
    }
  }
}
</style>