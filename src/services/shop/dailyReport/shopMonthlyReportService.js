import {useHttps} from "@/config/http/http";
import {getDateYYYYMMDD, getAfterDate} from "@/utility/date.helper";
import {sum} from "@/utility/arr.helper"

const https = useHttps();

export const getMonthlyReport = async () => {
    const response = await https.post("/merchant/v1/getOrderStats");
    const days = [],
        earnings = [],
        purchases = [],
        customers = [];
    let totalEarning = 0, totalPurchase = 0, totalCustomer = 0;
    if (response.data.success) {
        for (let index = -1; index < 29; index++) {
            const date = getDateYYYYMMDD(getAfterDate(new Date(), index + 1), "-");
            days.push(date.split("-")[2]);
            if (!!response.data.GraphData[date]) {
                earnings.push(+response.data.GraphData[date].TotalOrderPrice);
                purchases.push(+response.data.GraphData[date].TotalOrderCount);
                customers.push(+response.data.GraphData[date].TotalCostumerCount);
            } else {
                earnings.push(0);
                purchases.push(0);
                customers.push(0);
            }
        }
        totalEarning = earnings.reduce(sum);
        totalPurchase = purchases.reduce(sum);
        totalCustomer = customers.reduce(sum);
    }

    return {
        totalEarning,
        totalPurchase,
        totalCustomer,
        days,
        earnings,
        purchases,
        customers,
        maxEarning: Math.max(...earnings),
        maxPurchase: Math.max(...purchases),
        maxCustomer: Math.max(...customers),
    }
};
