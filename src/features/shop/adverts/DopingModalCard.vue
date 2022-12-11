<template>
  <div class="doping-modal-card">
    <div class="doping-header">
      <div class="icon">
        <img :src="DopingInfo.imgPath" alt="" />
      </div>

      <div class="title">
        <h3>{{ DopingInfo.title }}</h3>
        <span>{{ DopingInfo.description }}</span>
      </div>
    </div>
    <div class="doping-content">
      <div class="select">
        <h4>{{ t("shop.adverts.dopingModal.chooseTime") }}</h4>
        <a-select
          v-model:value="price"
          size="large"
          defaultValue="Seçim Yapılmadı"
        >
          <template :key="index" v-for="(doping, index) in DopingPrices">
            <a-select-option
              @click="
                $emit('selectPrice', {
                  price: doping.Price,
                  type,
                  time: doping.Text,
                })
              "
              :value="doping.Price"
              >{{ doping.Text }} ({{ doping.Price }}.00
              {{ t("currency") }})</a-select-option
            >
          </template>
        </a-select>
      </div>
      <div class="desc">
        <h4>{{ t("shop.adverts.dopingModal.endshowcase") }}</h4>
        <span class="date" v-if="DopingDetail" :class="type">
          {{type=='homepage'&&DopingDetail.isBoost!=0? DopingDetail.BoostDatetime:'' }}
           {{type=='notification'&&DopingDetail.isSocialPinned!=0? DopingDetail.SocialPinnedDatetime:'' }}
            {{type=='market'&&DopingDetail.isPinned!=0? DopingDetail.PinnedDatetime:'' }}
             {{type=='highlight'&&DopingDetail.isFeatured!=0? DopingDetail.FeaturedDatetime:'' }}
        </span>
        <span class="end-time" v-if="DopingDetail" :class="type">{{
          DopingDetail.KalanSure
        }}</span>
      </div>
      <div class="price">
        <h4>{{ t("shop.adverts.dopingModal.price") }}</h4>
        <span v-if="typeof price == 'number'"
          >{{ price }}.00 {{ t("currency") }}</span
        >
        <span v-else>0 {{ t("currency") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
const props = defineProps({
  type: String,
  DopingPrices: Object,
  DopingInfo: Object,
  DopingDetail: Object,
});
const price = ref("Seçim Yapılmadı");
const clicked = () => {
  console.log(price.value);
};
</script>

<style lang="scss" scoped>
.doping-modal-card {
  padding: 5px 12px 30px 12px;
  width: calc(100% - 25px);
  background-color: #fff;
  border-radius: 20px;
  margin: 10px 0px;
  .ant-select {
    width: 100%;
  }
  .doping-header {
    display: flex;
    padding-top: 5px;
    .icon {
      background: #f5f5f5;
      width: 50px;
      height: 50px;
      border-radius: 4px;
      padding: 5px 3px 3px 5px;
      img {
        height: 40px;
        width: 40px;
      }
    }
    .title {
      position: relative;
      padding-left: 15px;
      max-width: 400px;
      h3 {
        font-size: 14px;
        font-weight: 400;
      }
      span {
        transform: translateY(-5px);
        font-size: 11px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &:before {
        content: "";
        background-color: #f1f2f6;
        width: calc(100% + 45px);
        left: -33px;
        height: 1px;
        position: absolute;
        bottom: -5px;
      }
    }
  }
  .doping-content {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    .select {
      font-size: 12px;
      .ant-select-lg {
        font-size: 14px !important;
      }
    }
    .desc {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      margin-top: 25px;
      .homepage {
        color: #3776d4;
      }
      .notification {
        color: #a67ccb;
      }
      .market {
        color: #7ccb81;
      }
      .highlight {
        color: #cba97c;
      }
      h4 {
        font-weight: 400;
        line-height: 5px;
      }
      .end-time {
        font-size: 11px;
      }
    }
    .price {
      display: flex;
      flex-direction: column;
      margin-top: 25px;
      line-height: 0.7em;
      h4 {
        font-weight: 400;
        font-size: 12px;
      }
      span {
        color: #afafaf;
        font-size: 12px;
      }
    }
  }
}
</style>

