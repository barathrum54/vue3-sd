<template>

  <sdCards v-if="id">
    <div class="project-top">
      <div class="project-header images">
        <a-row :gutter="[24, 24]">
          <div v-if="topDescription" class="doping-alert">
            <slot name="top-description"> </slot>
          </div>

          <a-col :xs="24">
            <div class="image-container">
              <is-image :source="url" />
              <a-tooltip>
                <template #title
                  ><small
                    >Bu ilan {{ categoryName }} kategorisinde
                    listelenmektedir.</small
                  ></template
                >
                <div class="category-blur-text">
                  <span>{{ categoryName }}</span>
                </div>
              </a-tooltip>
            </div>
          </a-col>
          <a-row :xs="14">
            <div class="title">
              <h3>{{ title }}</h3>
              <span>{{ description }}</span>
            </div>
          </a-row>
        </a-row>
      </div>
      <div class="upload-container">
        <a-tooltip placement="topLeft">
          <template #title>
            <span
              >{{ t("shop.adverts.advertCard.showCaseAdvert") }}<br /><small
                style="position: relative; top: -5px; margin-bottom: -5px"
                >{{ t("shop.adverts.advertCard.remainingTime") }} :
                {{ pinned.KalanSure }}</small
              ></span
            >
          </template>

          <div
            v-if="pinned && pinned.isPinned == '1'"
            class="upload PinnedShowCase"
          >
            <CrownOutlined two-tone-color="black" />
          </div>
        </a-tooltip>

        <a-tooltip placement="topLeft">
          <template #title>
            <span
              >{{ t("shop.adverts.advertCard.featuredAdvert") }}<br /><small
                style="position: relative; top: -5px; margin-bottom: -5px"
                >{{ t("shop.adverts.advertCard.remainingTime") }} :
                {{ featured.KalanSure }}</small
              ></span
            >
          </template>

          <div
            v-if="featured && featured.isFeatured == '1'"
            class="upload FeaturedShowCase"
          >
            <FireOutlined two-tone-color="black" />
          </div>
        </a-tooltip>

        <a-tooltip placement="topLeft">
          <template #title>
            <span v-if="socialpinned"
              >{{ t("shop.adverts.advertCard.socialAdvert") }}<br /><small
                style="position: relative; top: -5px; margin-bottom: -5px"
                >{{ t("shop.adverts.advertCard.remainingTime") }} :
                {{ socialpinned.KalanSure }}</small
              ></span
            >
          </template>

          <div
            v-if="socialpinned && socialpinned.isSocialPinned == '1'"
            class="upload SocialShowCase"
          >
            <RiseOutlined two-tone-color="black" />
          </div>
        </a-tooltip>

        <a-tooltip placement="topLeft">
          <template #title>
            <span
              >{{ t("shop.adverts.advertCard.marketAdvert") }}<br /><small
                style="position: relative; top: -5px; margin-bottom: -5px"
                >{{ t("shop.adverts.advertCard.remainingTime") }}:
                {{ boost.KalanSure }}</small
              ></span
            >
          </template>

          <div
            v-if="boost && boost.isBoosted == '1'"
            class="upload BoostShowCase"
          >
            <ShopOutlined two-tone-color="black" />
          </div>
        </a-tooltip>

        <a-tooltip placement="topLeft">
          <template #title>
            <span
              >{{ t("shop.adverts.advertCard.movedUp") }}<br /><small
                style="position: relative; top: -5px; margin-bottom: -5px"
                >Bu ilan {{ yukariTasiDatetimeText }} boyunca yukarı
                taşınamaz.</small
              ></span
            >
          </template>

          <div class="upload MoveUpShowCase" v-if="yukariTasi">
            <ToTopOutlined two-tone-color="black" />
            <i class="bx bx-time-five"></i>
          </div>
        </a-tooltip>
      </div>

      <div class="project-timing">
        <a-tooltip>
          <template v-if="useActions" #title
            ><small>{{
              state == 1
                ? "İlan yayın süresini uzatmak için tıklayınız."
                : state == 2 || state == 3 || state == 6
                ? "İlanı aktifleştirmek için tıklayınız."
                : "İşlem yapılamaz"
            }}</small></template
          >
          <div
            class="timer"
            :class="
              state == 1
                ? ilanKalanSaniye < 43200
                  ? ilanKalanSaniye < 10800
                    ? 'danger'
                    : 'warning'
                  : ''
                : 'passive'
            "
          >
            <span v-if="!!finishDateKalanTemplate">
              <i v-if="state == 1" class="bx bx-calendar-week"></i>
              <span v-if="state == 1" @click="showIncreaseTimeModal">
                {{ finishDateKalanTemplate }}
              </span>

              <span
                v-if="state == 2 || state == 3 || state == 6"
                @click="showChangeStateAdvertModal"
              >
                {{ finishDateKalanTemplate }}
              </span>
              <span v-if="state == 4 || state == 5 || state == 7">
                {{ finishDateKalanTemplate }}
              </span>
            </span>
          </div>
        </a-tooltip>

        <div class="price">
          <span>{{ t("shop.adverts.advertCard.price") }}</span>
          <strong>{{ price }} {{ t("currency") }} </strong>
        </div>
      </div>
    </div>
    <div v-if="useActions" class="project-bottom">
      <slot name="actions">
        <div class="project-assignees">
          <div
            class="
              button-space-around
              d-flex
              align-items-center
              is-button-group
            "
          >
            <!-- v-if="isFeatured" -->

            <a-row :gutter="15">
              <a-row>
                <sdButton
                  transparented
                  type="primary"
                  block="block"
                  style="margin-bottom: 8px"
                >
                  {{ t("shop.adverts.advertCard.editAdvert") }}
                </sdButton>
              </a-row>
              <a-row>
                <a-col
                  v-if="selectedAdverts && !selectedAdverts.includes(id)"
                  :xl="8"
                  :xs="8"
                >
                  <sdButton
                    :transparented="true"
                    type="warning"
                    @click="$emit('selectAdvert', id)"
                    class=""
                  >
                    {{ t("shop.adverts.advertCard.chooseAdvert") }}
                  </sdButton>
                </a-col>

                <a-col
                  v-if="selectedAdverts && selectedAdverts.includes(id)"
                  :xl="8"
                  :xs="8"
                >
                  <sdButton
                    :transparented="true"
                    type="advertChecked"
                    @click="$emit('selectAdvert', id)"
                  >
                    <CheckCircleTwoTone twoToneColor="#30A830" />
                  </sdButton>
                </a-col>

                <a-col :xl="15" :xs="15" offset="1">
                  <sdDropdown
                    :action="['click']"
                    placement="bottomLeft"
                    title="merhaba"
                  > 
                    <template #overlay>
                      <a to="#">
                        <AnIcon>
                          <i class="bx bx-edit bx-xs"></i>
                        </AnIcon>
                        <span>{{
                          t("shop.adverts.advertCard.editAdvert")
                        }}</span>
                      </a>
                      
                      <a v-if="state==1" @click="useDoping" to="#">
                        <AnIcon>
                          <i class="bx bx-cloud-upload bx-xs"></i>
                        </AnIcon>
                        <span>{{
                          t("shop.adverts.advertCard.optionsMenuDoping")
                        }}</span>
                      </a>
                      <a v-if="postType=='KEY'" @click="showStocks" to="#">
                        <AnIcon>
                          <i class="bx bxs-inbox bx-xs"></i>
                        </AnIcon>
                        <span>{{
                          t("shop.adverts.advertCard.optionsMenuStock")
                        }}</span>
                      </a>
                      <a  v-if="state==1" @click="showGraph" to="#">
                        <AnIcon>
                          <i class="bx bx-bar-chart bx-xs"></i>
                        </AnIcon>
                        <span>{{
                          t("shop.adverts.advertCard.optionsMenuGraph")
                        }}</span>
                      </a>
                      <a @click="showOrders" to="#">
                        <AnIcon>
                          <i class="bx bx-cart bx-xs"></i>
                        </AnIcon>
                        <span>{{
                          t("shop.adverts.advertCard.optionsMenuOrders")
                        }}</span>
                      </a>
                      <a  v-if="state==1" to="#" @click="moveUp">
                        <AnIcon>
                          <i class="bx bx-up-arrow-alt bx-xs"></i>
                        </AnIcon>
                        <span>{{
                          t("shop.adverts.advertCard.optionsMenuMoveUp")
                        }}</span>
                      </a>
                      <a  v-if="state==1" to="#" @click="unPublish">
                        <AnIcon>
                          <i class="bx bx-low-vision bx-xs"></i>
                        </AnIcon>
                        <span>
                          {{
                            t("shop.adverts.advertCard.optionsMenuRemove")
                          }}</span
                        >
                      </a>
                      <a  v-if="state!=1" to="#" @click="showChangeStateAdvertModal">
                        <AnIcon>
                          <i class="bx bx-revision bx-xs"></i>
                        </AnIcon>
                        <span>
                          {{
                            t("shop.adverts.advertCard.optionsMenuRePublish")
                          }}</span
                        >
                      </a>
                    </template>
                    <sdButton
                      v-if="!dopingModalVisibility"
                      :transparented="true"
                      type="secondary"
                    >
                      <a href="#">
                        {{ t("shop.adverts.advertCard.optionsAdvert") }}
                      </a>
                    </sdButton>
                  </sdDropdown>
                </a-col>
              </a-row>
            </a-row>
            <!-- v-if="isBoost" -->

            <!-- v-if="isPinned" -->
          </div>
        </div>
      </slot>
    </div>
  </sdCards>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import PropTypes from "vue-types";
import Config from "@/constants/config";
import { useRoute } from "vue-router";
import { AnIcon } from "@/components/springDash/icons/IconStyled";
import {
  extendPosts,
  moveUpPosts,
  rePublishPost,
  unPublishPosts,
} from "@/services/shop/adverts/adverts.service";
import {
  CheckCircleTwoTone,
  CrownOutlined,
  FireOutlined,
  RiseOutlined,
  ShopOutlined,
  ToTopOutlined,
} from "@ant-design/icons-vue";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const stateOfOptions = ref(false);
const route = useRoute();

// import DateHelper from '@/helper/date/date.helper';
// import AdvertProcess from "./processes/AdvertProcess.vue"

const optionsButton = ref(null);
const props = defineProps({
  advert: PropTypes.object,
  title: String,
  id: String,
  state: String,
  description: String,
  finishDateKalan: String,
  price: String,
  url: String,
  pinned: Object,
  selectedAdverts: Array,
  dopingModalVisibility: Boolean,
  categoryName: String,
  featured: Object,
  boost: Object,
  socialpinned: Object,
  yukariTasi: Boolean,
  yukariTasiDatetimeText: String,
  ilanKalanSaniye: Number,
  postType:String,
  useActions: {
    type: Boolean,
    default: false,
  },
  topDescription: {
    type: Boolean,
    default: false,
  },
});
const modalObject = {
  title: props.title,
  id: props.id,
  state: props.state,
  description: props.description,
  finishDateKalan: props.finishDateKalan,
  price: props.price,
  url: props.url,
  pinned: props.pinned,
  categoryName: props.categoryName,
  featured: props.featured,
  boost: props.boost,
  socialpinned: props.socialpinned,
  yukariTasi: props.yukariTasi,
  yukariTasiDatetimeText: props.yukariTasiDatetimeText,
  ilanKalanSaniye: props.ilanKalanSaniye,
};
let dakikaIndex = 0;
let finishDateKalanGunIndex = 0;
const finishDateKalanTemplate = ref("");

const formatFinishDateKalanProps = () => {
  if (props.finishDateKalan.length > 0 && props.state == 1) {
    dakikaIndex = props.finishDateKalan.indexOf("dakika");
    finishDateKalanTemplate.value = props.finishDateKalan.slice(
      0,
      dakikaIndex + 6
    );
  } else if (props.state == 2) {
    finishDateKalanTemplate.value = "İlan satıldı";
  } else if (props.state == 3) {
    finishDateKalanTemplate.value = "İlanın süresi doldu";
  } else if (props.state == 4) {
    finishDateKalanTemplate.value = "İlan işlemde";
  } else if (props.state == 5) {
    finishDateKalanTemplate.value = "Satıcı teslimatı yaptı";
  } else if (props.state == 6) {
    finishDateKalanTemplate.value = "Bu ilan kapatılmıştır";
  } else if (props.state == 7) {
    finishDateKalanTemplate.value = "Yetersiz stok";
  } else {
    finishDateKalanTemplate.value = "İlan yayında değil";
  }
};
onMounted(() => {
  formatFinishDateKalanProps();
});

const emit = defineEmits([
  "handleIncreaseTimeModalVisibility",
  "handleStateOfAdvertModalVisibility",
  "selectAdvert",
  "openDopingModal",
  "openStockModal",
  "openGraphModal",
  "openOrdersModal",
]);
const editPost = () => {};

const useDoping = () => {
  emit("openDopingModal", modalObject);
};
const showStocks = () => {
  emit("openStockModal", modalObject);
};
const showGraph = () => {
  emit("openGraphModal", modalObject);
};

const showOrders = () => {
  emit("openOrdersModal", modalObject);
};

const moveUp = async () => {
  const data = await moveUpPosts(props.id);
  if (data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `İlanınız başarıyla yukarı çıkartıldı.`,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "İşlem Başarısız",
      html: `${data.message}`,
      showConfirmButton: false,
    });
  }
};
const unPublish = async () => {
  const data = await unPublishPosts(props.id);
  if (data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `İlanınız başarıyla yayından kaldırıldı.`,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "İşlem Başarısız",
      html: `${data.message}`,
      showConfirmButton: false,
    });
  }
};
const showIncreaseTimeModal = () => {
  emit("handleIncreaseTimeModalVisibility", {
    id: props.id,
    name: "increaseTime",
  });
};
const showChangeStateAdvertModal = () => {
  emit("handleStateOfAdvertModalVisibility", {
    id: props.id,
    name: "stateOfAdvert",
  });
};
</script>
<style lang="scss">
@import "@/config/styles/global.scss";

@media (min-width: 2800px) {
  .advertCard {
    flex: 0 0 10% !important;
    max-width: 10% !important;
  }
}
@media (min-width: 2600px) and (max-width: 2800px) {
  .advertCard {
    flex: 0 0 11.11% !important;
    max-width: 11.11% !important;
  }
}
@media (min-width: 2350px) and (max-width: 2600px) {
  .advertCard {
    flex: 0 0 12.5% !important;
    max-width: 12.5% !important;
  }
}
@media (min-width: 2100px) and (max-width: 2350px) {
  .advertCard {
    flex: 0 0 14.2% !important;
    max-width: 14.2% !important;
  }
}
@media (min-width: 1800px) and (max-width: 2100px) {
  .advertCard {
    flex: 0 0 16.66% !important;
    max-width: 16.66% !important;
  }
}
@media (min-width: 1550px) and (max-width: 1800px) {
  .advertCard {
    flex: 0 0 20% !important;
    max-width: 20% !important;
  }
}
@media (min-width: 1300px) and (max-width: 1550px) {
  .advertCard {
    flex: 0 0 25% !important;
    max-width: 25% !important;
  }
}
@media (min-width: 780px) and (max-width: 1300px) {
  .advertCard {
    flex: 0 0 33.33% !important;
    max-width: 33.33% !important;
  }
}
@media (min-width: 500px) and (max-width: 780px) {
  .advertCard {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }
}
@media (max-width: 500px) {
  .advertCard {
    flex: 0 0 max(100%, 250px) !important;
    max-width: max(100%, 250px) !important;
  }
}

/* Küçük çözünürlüklerde padding sorunu fix */
.advertCard .ant-card-body {
  padding: 0 !important;
}
</style>
<style scoped lang="scss">
.ant-select {
  width: 100% !important;
}

.ant-col {
  padding: 0 !important;
  outline: "1px solid red";
  width: 20% !important;
}

.ant-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.ant-card-head {
  min-height: 0 !important;
}
.doping-alert {
  background-color: rgba(250, 139, 12, 0.2);
  color: rgba(250, 139, 12, 1);
  padding: 7px 15px;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  width: 100%;
}
.title {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  max-width: 100%;

  span {
    max-width: 100%;
    height: 36px;
    font-size: 13px;
    line-height: 1.1rem;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 12px;
  }

  h3 {
    margin-bottom: 5px;
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

  img {
    width: 100% !important;
    height: 215px;
    object-fit: cover;
    border-radius: 4px;
  }

  .category-blur-text {
    text-shadow: 1px 1px 0px black;
    position: absolute;
    top: 10px;
    width: calc(100% - 20px);
    left: 10px;
    background: rgb(0 0 0 / 40%);
    border-radius: 5px;
    backdrop-filter: blur(5px);
    padding: 2px 15px;
    text-align: center;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
  }
}

.ant-card {
  // ant-card
  padding: 0 20px 20px 20px !important;
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

.options {
  position: absolute;
  background-color: white;
  width: 200px;
  z-index: 2;
  top: 48px;

  i {
    color: rgba(146, 153, 184, 0.3) !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    height: 38px !important;
    font-weight: 400 !important;
    margin: 2px 0px !important;
    display: flex !important;
    justify-content: flex-start !important;

    span {
      margin-left: 5px;
    }

    &:hover {
      border-color: transparent !important;
      background-color: rgba(95, 99, 242, 0.05) !important;
      color: black !important;

      i {
        color: rgba(95, 99, 242, 0.5) !important;
      }
    }

    &:active {
      border-color: transparent !important;
      background-color: rgba(95, 99, 242, 0.3) !important;
      transition: 0s;
      color: black !important;
    }

    &:focus {
      border-color: transparent !important;
      color: black !important;
    }
  }
}

.upload-container {
  display: flex;
  height: 27px;

  .upload {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    border-radius: 3px;
    width: 32px;
    height: 27px;
    position: relative;
  }

  .bx-time-five {
    background-color: #e25151;
    color: #fff;
    position: absolute;
    border-radius: 50%;
    top: -5px;
    right: -5px;
    width: 15px;
    height: 15px;
    font-weight: 400;
    font-size: 0.8rem;

    &::before {
      position: absolute;
      top: 2px;
      left: 1px; //display flex ve absolute denendi ortalanmıyor başka bir yerin margini burayı etkileyip kaydırıyor olabilir. -furkan
    }
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

  .upload.MoveUpShowCase {
    background-color: #f1f1f1;
    color: #565656;
  }
}

.project-timing {
  text-align: center;
  margin-top: 5px;
  position: relative;

  .advert-passive-desc {
    display: none;
    top: -65px;
    left: -30px;
    position: absolute;
    background-color: #cde4ec;
    height: 50px;
    color: #487484;
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
      border-top: 20px solid #cde4ec;
    }
  }

  .timer-desc {
    display: none;
    top: -65px;
    left: -30px;
    position: absolute;
    background-color: #191919;
    height: 50px;
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

    background-color: #cde4ec;
    color: #487484;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 10px;
    padding-left: 10px;
    font-size: 13px;

    span:nth-child(2) {
      cursor: pointer;
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
    font-weight: 500;
  }

  .timer.warning {
    background: #f5f0e0 !important;
    color: #926b3a !important;
    font-weight: 500;
  }

  .timer.passive {
    background: #f6f6f6;
    color: #4a4a4a;
    font-weight: 500;
    span {
      cursor: pointer;
    }

    &:hover {
      .advert-passive-desc {
        display: inline-block;
      }
    }
  }

  .price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.2em;
    margin-bottom: 10px;

    strong {
      font-size: 1rem;
      font-weight: 500;
    }
  }
}
</style>
