<template>
  <PerformanceChartWrapper>
    <sdCards v-if="report" :title="t('shop.dashboard.last30DayChart.title')">
      <Pstates style="padding: 0 15px; margin-bottom: 0">
        <div
          v-for="(type, index) in chartTypes"
          @click="() => onTabClick(type)"
          class="growth-upward"
          :class="{ active: type.active }"
          role="button"
        >
          <p>{{ t(type.text) }}</p>
          <sdHeading as="h1" class="chartHeadingText">
            {{ type.calculateTitle(type.heading) }}
          </sdHeading>
        </div>
      </Pstates>
      <div v-if="preIsLoading" class="sd-spin">
        <a-spin />
      </div>
      <div
        v-else
        class="performance-lineChart"
        style="padding: 15px; padding-top: 0"
      >
        <sdChartContainer class="parentContainer">
          <Chart
            v-if="dataset.length > 0"
            class="performance"
            type="line"
            id="performance"
            :labels="report.days"
            :datasets="dataset"
            :options="chartOptions"
            :height="height"
          />
        </sdChartContainer>
      </div>
    </sdCards>
  </PerformanceChartWrapper>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from "vue";
import {
  chartLinearGradient,
  customTooltips,
} from "@/components/springDash/utilities/utilities";
import { getMonthlyReport } from "@/services/shop/dailyReport/shopMonthlyReportService";
import Chart from "@/components/springDash/utilities/chartjs";
import { PerformanceChartWrapper, Pstates } from "@/views/shop/style.js";

const { t, d } = useI18n({ useScope: "global" });

const purchaseWord = "shop.dashboard.last30DayChart.purchaseWord";
const earningWord = "shop.dashboard.last30DayChart.earningWord";
const customerWord = "shop.dashboard.last30DayChart.customerWord";

const loading = ref(false);
const chartOptions = ref({});
const dataset = ref([]);
const preIsLoading = ref(false);
const height = computed(() => (window.innerWidth <= 630 ? 200 : 130));
const report = ref({
  totalEarning: 0,
  totalPurchase: 0,
  totalCustomer: 0,
  maxEarning: 0,
  maxPurchase: 0,
  days: [],
  earnings: [],
  purchases: [],
});
const initialChartOptions = {
  title: "",
  data: [],
  max: 0,
  active: false,
  calculateTitle: (text) => text,
};
const initialTypes = () => ({
  earning: {
    ...initialChartOptions,
    id: 0,
    text: "shop.dashboard.last30DayChart.orderAmount",
    heading: report.value.totalEarning.toFixed(2),
    calculateTitle: (text) => text + " " + t("currency"),
    borderColor: "#5F63F2",
  },
  purchase: {
    ...initialChartOptions,
    id: 1,
    text: "shop.dashboard.last30DayChart.numberOfOrders",
    heading: report.value.totalPurchase,
    borderColor: "#FF69A5",
  },
  customer: {
    ...initialChartOptions,
    id: 2,
    text: "shop.dashboard.last30DayChart.customerCount",
    heading: report.value.totalCustomer,
    borderColor: "rgb(75, 192, 192)",
  },
});
const _chartTypes = ref({
  ...initialTypes(),
});

const chartTypes = computed({
  get: () => _chartTypes.value,
  set: (value) => {
    _chartTypes.value = value;
  },
});
const getReport = async () => {
  const _report = await getMonthlyReport().catch(onFail);
  loading.value = false;
  if (!_report) return;
  report.value = _report;
  setChartArrays(_report);
  setChartOptions(_report, chartTypes.value.earning);
  setDataset(_report, chartTypes.value.earning);
};

const onFail = () => {
  loading.value = false;
};

const setChartArrays = (chart) => {
  if (!!chart) {
    const initial = initialTypes();
    chartTypes.value = {
      earning: {
        ...initial.earning,
        title: earningWord,
        data: chart.earnings,
        max: chart.maxEarning,
        useCurrency: true,
        active: true,
      },
      purchase: {
        ...initial.purchase,
        title: purchaseWord,
        data: chart.purchases,
        max: chart.maxPurchase,
      },
      customer: {
        ...initial.customer,
        title: customerWord,
        data: chart.customers,
        max: chart.maxCustomer,
      },
    };
  }
};

const changeActiveState = (id) => {
  Object.values(chartTypes.value).forEach((chart) => {
    if (chart.id === id) {
      chart.active = true;
    } else {
      chart.active = false;
    }
  });
};

const onTabClick = (chart, secondary) => {
  changeActiveState(chart.id);
  preIsLoading.value = true;
  setTimeout(() => {
    preIsLoading.value = false;
  });
  setDataset(report.value, chart);
  setChartOptions(report.value, chart);
};

const calculateTooltipTitle = (title, primary) => {
  return primary.calculateTitle(title);
};

const setDataset = (chart, primary) => {
  if (!!!chart) return;
  dataset.value = [
    {
      data: primary.data,
      borderColor: primary.borderColor,
      borderWidth: 4,
      fill: true,
      backgroundColor: () =>
        chartMethods("performance", ["#5F63F230", "#ffffff05"]),
      label: primary.text,
      pointStyle: "circle",
      pointRadius: "0",
      hoverRadius: "9",
      pointBorderColor: "#fff",
      pointBackgroundColor: primary.borderColor,
      hoverBorderWidth: 5,
    },
  ];
};
const calculateTooltipDate = (day, day2) => {
  const now = new Date();
  if (now.getDate() > +day) {
    const date = new Date(now.setDate(+day));
    return d(new Date(date.setMonth(new Date().getMonth())), "short");
  } else {
    const date = new Date(now.setDate(+day));
    return d(new Date(date.setMonth(new Date().getMonth() - 1)), "short");
  }
};

const calculateTooltips = (primary, index) => {
  let result = "";
  Object.values(chartTypes.value).forEach((chart) => {
    if (chart.id !== primary.id) {
      let lineResult = `<br/><span class="chartjs-tooltip-key" style="background:${chart.borderColor}; border-color:#fff; border-width: 2px; border-radius: 30px"></span>`;
      lineResult += `<span class="chart-data">${chart.data[index]}${
        chart.useCurrency ? ` ${t("currency")}` : ""
      }</span>`;
      lineResult += `<span class="data-label"> ${t(chart.text)}</span>`;
      result += lineResult;
    }
  });
  return result;
};

const setChartOptions = (chart, primary) => {
  if (!!!chart) return;
  chartOptions.value = {
    maintainAspectRatio: true,
    elements: {
      z: 9999,
    },
    legend: {
      display: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    tooltips: {
      mode: "label",
      intersect: false,
      backgroundColor: "#ffffff",
      position: "average",
      enabled: false,
      custom: customTooltips,
      callbacks: {
        title(t) {
          return `<span class="font-family-poppins font-weight-normal ">${calculateTooltipDate(
            t[0].xLabel
          )}</span>`;
        },
        label(_t, d) {
          const { yLabel, index, datasetIndex } = _t;
          return `<span class="chart-data">${calculateTooltipTitle(
            yLabel,
            primary
          )}</span> <span class="data-label">${t(
            d.datasets[datasetIndex].label
          )}</span>
${calculateTooltips(primary, index)}`;
        },
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "#e5e9f2",
            borderDash: [3, 3],
            zeroLineColor: "#e5e9f2",
            zeroLineWidth: 1,
            zeroLineBorderDash: [3, 3],
          },
          ticks: {
            beginAtZero: true,
            fontSize: 13,
            fontColor: "#182b49",
            max: Math.floor(primary.max + primary.max * 0.25),
            stepSize: Math.floor(primary.max * 0.5),
            callback(label) {
              return `${Math.floor(label)}`;
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            zeroLineWidth: 2,
            zeroLineColor: "transparent",
            color: "transparent",
            z: 1,
            tickMarkLength: 0,
          },
          ticks: {
            padding: 10,
          },
        },
      ],
    },
  };
};

function chartMethods(elementId, color) {
  return chartLinearGradient(document.querySelector(`.${elementId}`), 300, {
    start: color[0],
    end: color[1],
  });
}

onMounted(() => {
  getReport();
});
</script>

<style lang="scss" scoped>
.iSfwFY {
  //Sipariş Raporu üst kısım
  display: flex !important;
  flex-direction: row !important;
  @media only screen and (max-width: 1600px) and (min-width: 770px) {
    .growth-upward:nth-child(2) {
      margin: 25px;
    }
  }
}

.chartHeadingText {
  margin-bottom: 0;
}
</style>