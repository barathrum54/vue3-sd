import { useHttps } from "@/config/http/http";
const https = useHttps();

export const getDailyReport = async () => {
  const response = await https.post("/merchant/v1/getDashboardReport", {});
  //response.data.OrderDelivered = 265; //hard code ekranda görüntü olması için
  //response.data.OrderWaitingDelivery=500;
  return response.data;
};
