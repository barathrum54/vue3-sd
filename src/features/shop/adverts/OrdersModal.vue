<template>
  <sdModal
    :visible="modalVisibility"
    :onCancel="handleModalVisibility"
    title="İlana Ait Siparişler"
    class="advertStockModal"
    width="60%"
  >
    <a-row>
      <a-col class="orders-left-side" :sm="24" :md="24" :lg="6" :xl="6">
        <AdvertCard
          :title="selectedAdvert.title"
          :id="selectedAdvert.id"
          :state="selectedAdvert.state"
          :description="selectedAdvert.description"
          :finishDateKalan="selectedAdvert.finishDateKalan"
          :price="selectedAdvert.price"
          :url="selectedAdvert.url"
          :boost="selectedAdvert.boost"
          :featured="selectedAdvert.featured"
          :categoryName="selectedAdvert.categoryName"
          :pinned="selectedAdvert.pinned"
          :socialpinned="selectedAdvert.socialPinned"
          :yukariTasi="selectedAdvert.yukariTasi"
          :yukariTasiDatetimeText="selectedAdvert.yukariTasiDatetimeText"
          :ilanKalanSaniye="selectedAdvert.finishKalanTime"
          :topDescription="true"
       
        >
        <template #top-description> 
          Bu ilanınıza ait siparişleri listeliyorsunuz.
        </template>
        </AdvertCard>
      </a-col>
      <a-col class="orders-right-side" :sm="24" :md="24" :lg="18" :xl="18">
        <div :key="order.Id" v-for="order in selectedOrders">
          <a-row class="orderRow">
            <a-col :xl="8" class="userDataCol">
              <img
                class="avatarWrap"
                :src="'https://cdn.itemsatis.com/avatar/' + order.UserAvatar"
              />
              <div class="infoWrap">
                <div class="subInfo">{{ order.Id }}</div>
                <div class="topInfo">{{ order.UserName }}</div>
              </div>
            </a-col>

            <a-col :xl="12" class="infoCol">
              <div class="dateTime">{{ order.Datetime }}</div>
              <div class="state">
                <div class="stateIndicator"></div>
                <span v-if="order.State == 1"> Sipariş teslim edildi </span>
                <span v-if="order.State == 2">
                  Satıcının teslimatı bekleniyor
                </span>
                <span v-if="order.State == 3">
                  Alıcının teslimat onayı bekleniyor
                </span>
                <span v-if="order.State == 4">
                  Satıcının teslimat kanıtı bekleniyor
                </span>
                <span v-if="order.State == 5">
                  Satıcının teslimat kanıtı değerlendiriliyor
                </span>
                <span v-if="order.State == 6">
                  Sipariş alıcı tarafından iptal edildi
                </span>
                <span v-if="order.State == 7">
                  Sipariş satıcı tarafından iptal edildi
                </span>
                <span v-if="order.State == 8">
                  Sipariş sistem tarafından iptal edildi
                </span>
              </div>
            </a-col>
            <a-col :xl="2" class="priceCol">
              <span> İlan Ücreti </span>
              <div class="price">{{ order.Price }}</div>
            </a-col>
            <a-col :xl="2" class="buttonCol">
              <div class="chevronWrap">
                <sdFeatherIcons
                  v-if="!expandedOrders.includes(order.Id)"
                  size="30"
                  class="chevron"
                  type="chevron-down"
                  @click="expandOrder(order.Id)"
                />
                <sdFeatherIcons
                  v-else
                  size="30"
                  class="chevron"
                  type="chevron-up"
                  @click="unExpandOrder(order.Id)"
                />
              </div>
            </a-col>
          </a-row>
          <Transition name="detail-wrap">
            <a-row class="detailWrap" v-if="expandedOrders.includes(order.Id)">
              <a-col :xl="24" v-for="log in order.Logs" :key="log.Id">
                <a-row>
                  <a-col :xl="1" class="icon">
                    <img :src="log.Image" alt="" />
                  </a-col>
                  <a-col :xl="6" class="info">
                    <div class="dateTime">{{ log.Datetime }}</div>
                    <div class="stateTitle">{{ log.State }}</div>
                  </a-col>
                  <a-col :xl="16"></a-col>
                </a-row>
                <a-row>
                  <a-col :xl="14" class="innerDetailRow">
                    <div class="text">
                      {{ log.Text }}
                    </div>
                    <div
                      class="stock"
                      v-if="log.State == 'Sipariş teslim edildi'"
                    >
                      <span>Teslim Edilen Stok</span>
                      <span class="stockText"></span>
                    </div>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </Transition>
        </div>
      </a-col>
    </a-row>
  </sdModal>
</template>

<script setup>
import { onMounted, watch, ref, computed, defineAsyncComponent} from "vue";
import { CloudDownloadOutlined, CalendarTwoTone } from "@ant-design/icons-vue";
const AdvertCard = defineAsyncComponent(() =>
  import("@/components/IS/shop/adverts/AdvertCard")
);
const props = defineProps({
  selectedAdvertOrders: Array,
  selectedOrderAdvert: Object,
});
const modalVisibility = ref(false);
const selectedOrders = ref([]);
const selectedAdvert = ref();
const expandedOrders = ref([]);
watch(
  () => props.selectedAdvertOrders,
  () => {
    modalVisibility.value = true;
    selectedOrders.value = props.selectedAdvertOrders.Datas;
    console.log(props.selectedAdvertOrders);
    console.log(selectedOrders.value);
  }
);
watch(
  () => props.selectedOrderAdvert,
  () => {
    selectedAdvert.value = props.selectedOrderAdvert;
  }
);
const handleModalVisibility = () => {
  modalVisibility.value = !modalVisibility.value;
};
const expandOrder = (id) => {
  expandedOrders.value.push(id);
  console.log(expandedOrders.value);
};
const unExpandOrder = (id) => {
  expandedOrders.value = expandedOrders.value.filter(
    (expandedId) => expandedId != id
  );
  console.log(expandedOrders.value);
};
</script>

<style lang="scss" scoped>
.orders-left-side {
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
.orders-right-side {
  max-height: 60vh;
  overflow-y: auto;
  .orderRow {
    background-color: #ffffff;
    margin-bottom: 10px;
    height: 85px;
    border-radius: 7px;
    padding-block: 10px;
    padding-inline: 10px;
    box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.05);
    .userDataCol {
      height: 100%;
      padding: 10px;
      background: linear-gradient(
        90deg,
        rgb(245, 245, 245) 0%,
        rgba(255, 255, 255, 0) 100%,
        rgba(255, 255, 255, 1) 100%
      );
      border-radius: 5px;
      display: flex;
      .avatarWrap {
        height: 46px;
        width: 46px;
        border-radius: 5px;
        object-fit: cover;
      }

      .infoWrap {
        padding: 5px;
        padding-left: 10px;
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
        .topInfo {
          opacity: 0.9;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .subInfo {
          font-size: 0.7rem;
          opacity: 0.6;
          line-height: 0.6rem;
        }
      }
    }
    .infoCol {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: flex-start;
      .dateTime {
        font-size: 0.7rem;
        line-height: 1.3rem;
      }
      .state {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
        .stateIndicator {
          border-radius: 50%;
          height: 10px;
          width: 10px;
          background-color: red;
          margin-right: 7px;
        }
      }
    }
    .priceCol {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: flex-start;
      span {
        font-size: 12px;
        line-height: 0.7rem;
      }
      .price {
        font-size: 14px;
        font-weight: 400;
      }
    }
    .buttonCol {
      display: flex;
      justify-content: center;
      align-items: center;
      .chevronWrap {
        cursor: pointer;
        background-color: #eeeeee;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .chevron {
          color: #515151;
        }
      }
    }
  }
  .detailWrap {
    transition: 1s all ease;
    border-top: 1pt solid rgba(0, 0, 0, 0.1);
    padding: 20px;
    padding-inline: 30px;
    max-height: 500px;
    background-color: white;
    margin-bottom: 10px;
    .icon img {
      object-fit: contain;
      height: 35px;
      max-width: 35px;
    }
    .info {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-left: 16px;
      .dateTime {
        font-size: 11px;
        opacity: 0.8;
      }
      .stateTitle {
        font-weight: 500;
        font-size: 13px;
        opacity: 0.9;
      }
    }
    .innerDetailRow {
      border-left: 3px solid rgba($color: #000000, $alpha: 0.1);
      min-height: 15px;
      margin-block: 10px;
      margin-left: 15px;
      padding-left: 30px;
      padding-block: 5px;
      font-size: 11px;
      .stock {
        display: flex;
        flex-flow: column;
        margin-top: 10px;
        font-size: 12px;
        .stockText {
          font-weight: 500;
        }
      }
    }
  }
  .detail-wrap-enter-active {
    transition: all 0.3s ease;
  }
  .detail-wrap-leave-active {
    transition: all 0 ease;
  }
  .detail-wrap-enter-from {
    max-height: 0px;
  }
  .detail-wrap-leave-to {
    max-height: 0px;
    display: none;
  }
  .emptyDataHeader {
    opacity: 0.8;
  }
}
</style>