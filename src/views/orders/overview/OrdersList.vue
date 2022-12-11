<template>
  <div
    v-if="!isLoading"
    class="rowWrap"
    v-for="item in orderData"
    :key="item.Id"
  >
    <a-row class="orderRow" :class="{ expanded: item.expanded }">
      <a-col :xl="4" class="userDataCol">
        <img
          class="avatarWrap"
          :src="'https://cdn.itemsatis.com/avatar/' + item.UserAvatar"
        />
        <div class="infoWrap">
          <div class="subInfo">{{ item.Id }}</div>
          <div class="topInfo">
            {{ item.UserName }}
          </div>
        </div>
      </a-col>
      <a-col :xl="9" class="userDataCol">
        <img
          class="avatarWrap"
          :src="'https://cdn.itemsatis.com/' + item.AdvertImage"
        />
        <div class="infoWrap">
          <div class="topInfo">
            {{ ellipsis(item.Title, 4) }}
          </div>
          <div class="subInfo">{{ item.CategoryName }}</div>
        </div>
      </a-col>
      <a-col :xl="7" class="infoCol">
        <div class="dateTime">
          {{ item.Datetime }}
        </div>
        <div class="state">
          <div
            class="stateIndicator"
            :style="{ backgroundColor: item.StateColor }"
          ></div>
          {{ item.StateText }}
        </div>
      </a-col>
      <a-col :xl="2" class="priceCol">
        <span> {{ t('orders.orderList.advertPrice') }} </span>
        <div class="price">{{ item.Price }} ₺</div>
      </a-col>
      <a-col :xl="2" class="buttonCol">
        <div class="chevronWrap" @click="toggleDetail(item)">
          <a-spin style="padding-top: 5px" v-if="item.loading"></a-spin>
          <sdFeatherIcons
            v-if="!item.expanded && !item.loading"
            size="30"
            class="chevron"
            type="chevron-down"
          />
          <sdFeatherIcons
            v-else-if="item.expanded && !item.loading"
            size="30"
            class="chevron"
            type="chevron-up"
          />
        </div>
      </a-col>
    </a-row>
    <Transition name="detail-wrap">
      <a-row class="detailWrap" v-if="item.expanded">
        <a-col :xl="24" v-for="item in item.Logs" :key="item.Id">
          <a-row>
            <a-col :xl="1" class="icon">
              <img :src="item.Image" alt="" />
            </a-col>
            <a-col :xl="6" class="info">
              <div class="dateTime">{{ item.Datetime }}</div>
              <div class="stateTitle">{{ item.State }}</div>
            </a-col>
            <a-col :xl="16"></a-col>
          </a-row>
          <a-row>
            <a-col :xl="14" class="innerDetailRow">
              <div class="text">
                {{ item.Text }}
              </div>
              <div
                class="stock"
                v-if="
                  item.State == 'Sipariş teslim edildi' &&
                  orderDetail.value.Stock
                "
              >
                <span>{{ t('orders.orderList.deliveredStock') }}</span>
                <span class="stockText">
                  {{ orderDetail.value.Stock?.Value }}
                </span>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </Transition>
  </div>
  <h2 class="emptyDataHeader" v-if="!orderData.length && !isLoading">
    {{ t('orders.orderList.noOrdersFound') }}
    <br />
  </h2>

  <section v-if="isLoading == true">
    <a-skeleton
      v-for="index in 10"
      active
      avatar
      class="orderRow"
      :paragraph="{ rows: 1 }"
    />
  </section>
</template>
<script setup>
import {watch, inject, onMounted, computed, ref, onUnmounted} from "vue";
import {
  getOrderData,
  getOrderDetail,
} from "@/services/orders/ordersService.service";
import { ellipsis } from "@/utility/utility";
import { useRouter } from "vue-router";
import {useI18n} from "vue-i18n";
const {t, d} = useI18n({useScope: "global"});

const router = useRouter();
const pageData = inject("pageData");
const filterData = inject("filterData");
const isFiltering = inject("isFiltering");
const _orderData = ref([]);
const isLoading = ref(true);
const orderData = computed(() => {
	return _orderData.value.map((order, key) => {
		order.expanded = false;
		order.loading = false;
		return order;
	});
});
const emit = defineEmits(["filter", "clearFilters"]);

watch(
	() => [
		filterData.value.StartDate,
		filterData.value.FinishDate,
		filterData.value.Title,
		filterData.value.userName,
		filterData.value.purchaseId,
		pageData.value.page,
		router.currentRoute.value.name,
	],
	(data, oldData) => {
		getData();
	}
);

const orderDetail = {};
onMounted(() => {
	var routeName = router.currentRoute.value.name;
	pageData.value.page = 1;
	setPage(routeName);
	getData();
	emit("clearFilters");
});

const setPage = (routeName) => {
	switch (routeName) {
		case "soldOrders":
			pageData.value.title = "soldPageTitle";
			break;
		case "boughtOrders":
			pageData.value.title = "boughtPageTitle";
			break;

		default:
	}
};
const getData = async () => {
	console.log("getData Start");
	const response = await getOrderData(pageData.value, filterData.value);
	pageData.value.pagination = true;
	isLoading.value = true;

	_orderData.value = response.data.Datas;
	console.log(_orderData.value);
	if (response.data.Datas.length < pageData.value.limit) {
		pageData.value.isLastPage = true;
	} else {
		pageData.value.isLastPage = false;
	}
	if (response.data.Datas.length <= 0) {
		pageData.value.pagination = false;
	}
	isLoading.value = false;

	console.log("getData End");
};
const uncollapseAll = () => {
  _orderData.value.map((order, key) => {
    order.expanded = false;
  });
};
const toggleDetail = async (item) => {
  if (item.expanded == false) {
    if (item.detailData) {
      orderDetail.value = item.detailData;
    } else {
      item.loading = true;
      const response = await getOrderDetail(pageData.value, item.Id);
      item.loading = false;
      orderDetail.value = response.data;
      item.detailData = response.data;
    }
    uncollapseAll();
    item.expanded = true;
  } else {
    orderDetail.value = {};
    item.expanded = false;
  }
};
const clearFilters = () => {
  filterData.value = {
    Search: "",
    purchaseId: "",
    userName: "",
    Title: "",
    StartDate: "",
    FinishDate: "",
  };
};
</script>

<style lang="scss" scoped>
.orderRow.expanded {
  border-radius: 7px 7px 0px 0px;
  margin-bottom: 0px;
}

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
</style>
