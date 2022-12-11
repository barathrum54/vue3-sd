import { useHttps } from "@/config/http/http.js";
import { useAuthStore } from "@/store/auth/auth.store.js";

const authStore = useAuthStore();
const https = useHttps();

const getAllNotificationsServices = async ({ page }) => {
  const response = await https.post(
    "/MyNotifications",
    `Page=${page}&Limit=10`
  );

  return response;
};
const getSearchedNotificationsServices = async (query, page) => {
  const response = await https.post(
    "/MyNotifications",
    `Page=${page}&Limit=10&Search=${query}`
  );
  return response;
};
const getAwaitingActionsNotificationsServices = async ({ page }) => {
  const response = await https.post(
    "/MyNotifications",
    `Page=${page}&Limit=10&onlyAction=1`
  );
  return response;
};

const getSystemNotificationsServices = async ({ page }) => {
  const response = await https.post(
    "/MyNotifications",
    `Page=${page}&Limit=10&onlySystem=1`
  );
  return response;
};
const getUnReadNotificationsServices = async ({ page }) => {
  const res = await https.post("/MyNotifications", `Page=${page}&Limit=10`);
  const data = [];
  res.data.notifications.map((notification, key) => {
    if (notification.seen == 0) {
      data.push(notification);
    }
  });
  return data;
};

const getUnReadNotificationsCount = async () => {
  const response = await https.post("/MyNotifications");

  const data = [];
  response.data.notifications.map((notification, key) => {
    if (notification.seen == 0) {
      data.push(notification);
    }
  });
  console.log(data);
  return data.length;
};
const deleteNotification = async ({ Id }) => {
  const response = await https.post(
    "/deleteNotification",
    `notificationID=${Id}`
  );
  console.log(response);
  return response;
};
const getNotificationDetail = async ({ Id }) => {
  const response = await https.post("/getNotificationDetail", `Id=${Id}`);
  return response;
};
const confirmBuyerOrder = async ({ Data1, purchaseId }) => {
  const response = await https.post(
    "/userAction",
    `TeslimAldimOnay=${Data1}&purchaseID=${purchaseId}`
  );
  return response;
};
const rejectBuyerOrder = async ({ Data1, purchaseId }) => {
  const response = await https.post(
    "/userAction",
    `TeslimAlmadimOnay=${Data1}&purchaseID=${purchaseId}`
  );
  return response;
};
const sendRejectProof = async ({ Data1, purchaseId, formState }) => {
  const Kanit = formState.value.link;
  const Aciklama = formState.value.aciklama;
  let Paylas = formState.value.paylasim;
  if (Paylas == true) {
    Paylas = 1;
  } else {
    Paylas = 0;
  }
  console.log(formState);
  const response = await https.post(
    "/userAction",
    `SaticiRedKanit=${Data1}&purchaseID=${purchaseId}&Kanit=${Kanit}&Aciklama=${Aciklama}&Paylas=${Paylas}`
  );
  return response;
};
const rejectStockBuyOrder = async ({ Data1, purchaseId, Kanit }) => {
  const response = await https.post(
    "/userAction",
    `OtomatikTeslimAlmadimOnay=${Data1}&purchaseID=${purchaseId}&AliciKaniti=${Kanit}`
  );
  return response;
};
const confirmStockBuyOrder = async ({ Data1, purchaseId }) => {
  const response = await https.post(
    "/userAction",
    `OtomatikTeslimAldimOnay=${Data1}&purchaseID=${purchaseId}`
  );
  return response;
};
const confirmSellOrder = async ({ Data1, purchaseId }) => {
  const response = await https.post(
    "/userAction",
    `TeslimatOnay=${Data1}&purchaseID=${purchaseId}`
  );
  return response;
};
const rejectSellOrder = async (Data1, purchaseId) => {
  const response = await https.post(
    "/userAction",
    `TeslimatRedSatici=${Data1}&purchaseID=${purchaseId}`
  );
  return response;
};

const sendReview = async (Data1, purchaseID, formData) => {
  const response = await https.post(
    "/userAction",
    `DegerlendirmeForm=${Data1}&purchaseID=${purchaseID}&Guvenilirlik=${formData.guvenilirlik}&Memnuniyet=${formData.memnuniyet}&Iletisim=${formData.iletisim}&Teslimat=${formData.teslimat}&Yorum=${formData.yorumunuz}`
  );
  return response;
};
const getDebugNotifications = async ({ PostId }) => {
  const response = await https.post(
    "/readyForDeliveryPost",
    `postID=${PostId}`
  );
  return response;
};
const readyForDeliveryPost = async ({ PostId }) => {
  const response = await https.post(
    "/readyForDeliveryPost",
    `postID=${PostId}`
  );
  return response;
};
export {
  getAllNotificationsServices,
  getUnReadNotificationsServices,
  deleteNotification,
  getUnReadNotificationsCount,
  getNotificationDetail,
  getAwaitingActionsNotificationsServices,
  getSystemNotificationsServices,
  getSearchedNotificationsServices,
  confirmBuyerOrder,
  rejectBuyerOrder,
  sendRejectProof,
  rejectStockBuyOrder,
  confirmStockBuyOrder,
  confirmSellOrder,
  rejectSellOrder,
  sendReview,
  getDebugNotifications,
  readyForDeliveryPost,
};
