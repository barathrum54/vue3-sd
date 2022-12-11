import { useHttps } from "@/config/http/http.js";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth/auth.store.js";
const authStoreMain = useAuthStore();
const _TOKEN = authStoreMain.getToken;

const https = useHttps();
const baseUrl = ref("");

export const getOrderData = async (PageData, filterData) => {
  let Search = "";
  let StartDate = filterData.StartDate;
  let FinishDate = filterData.FinishDate;
  let State = filterData.State;
  switch (PageData.title) {
    case "soldPageTitle":
      baseUrl.value = "/merchant/v1/getMySoldOrders";
      break;

    case "boughtPageTitle":
      baseUrl.value = "/merchant/v1/getMyBoughtOrders";
      break;
    default:
  }
  console.log(PageData.title);

  const response = await https.post(
    baseUrl.value,
    `Page=${PageData.page}&Limit=${PageData.limit}&Search=${Search}&purchaseID=${filterData.purchaseId}&userName=${filterData.userName}&Title=${filterData.Title}&StartDate=${StartDate}&FinishDate=${FinishDate}&State=${State}`
  );

  return response;
};

export const getOrderDetail = (PageData, orderId) => {
  switch (PageData.title) {
    case "soldPageTitle":
      return getMySoldOrderDetail(orderId);
      break;

    case "boughtPageTitle":
      return getMyBoughtOrderDetail(orderId);
      break;
    default:
  }
};

const getMySoldOrderDetail = async (orderId) => {
  const response = await https.post(
    "/getMySoldOrderDetail",
    `orderID=${orderId}`
  );
  return response;
};

const getMyBoughtOrderDetail = async (orderId) => {
  const response = await https.post(
    "/getMyBoughtOrderDetail",
    `orderID=${orderId}`
  );

  return response;
};
