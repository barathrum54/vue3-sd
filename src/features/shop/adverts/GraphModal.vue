<template>
  <sdModal
    :visible="ModalVisibility"
    :onCancel="handleModalVisibility"
    width="60%"
    title="İlan Grafiği (Görüntüleme Raporu)"
  >
    <a-row>
      <a-col class="orders-left-side" :sm="24" :md="24" :lg="6" :xl="6">
        <AdvertCard
          :title="selectedGraphAdvert.title"
          :id="selectedGraphAdvert.id"
          :state="selectedGraphAdvert.state"
          :description="selectedGraphAdvert.description"
          :finishDateKalan="selectedGraphAdvert.finishDateKalan"
          :price="selectedGraphAdvert.price"
          :url="selectedGraphAdvert.url"
          :boost="selectedGraphAdvert.boost"
          :featured="selectedGraphAdvert.featured"
          :categoryName="selectedGraphAdvert.categoryName"
          :pinned="selectedGraphAdvert.pinned"
          :socialpinned="selectedGraphAdvert.socialPinned"
          :yukariTasi="selectedGraphAdvert.yukariTasi"
          :yukariTasiDatetimeText="selectedGraphAdvert.yukariTasiDatetimeText"
          :ilanKalanSaniye="selectedGraphAdvert.finishKalanTime"
          :topDescription="true"
        >
          <template #top-description>
            Bu ilanınıza ait görüntülenme raporunu görüntülüyorsunuz.
          </template>
        </AdvertCard>
      </a-col>
      <a-col class="orders-right-side" :sm="24" :md="24" :lg="18" :xl="18">
        <Chart
          v-if="!loading"
          class="graph"
          type="line"
          id="graph"
          :labels="labels"
          :datasets="dataSet"
          :options="{
            maintainAspectRatio: true,
            elements: {
              z: 9999,
            },
            legend: {
              display: false,
            },
            hover: {
              intersect: false,
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    z: 1,
                    tickMarkLength: 0,
                  },
                  ticks: {
                    padding: 10,
                  },
                },
              ],
            },
          }"
        />
      </a-col>
    </a-row>
  </sdModal>
</template>

<script setup>
import { ref, watch, computed , defineAsyncComponent} from "vue";
import Chart from "@/components/springDash/utilities/chartjs";
import { chartLinearGradient } from "@/components/springDash/utilities/utilities";
const AdvertCard = defineAsyncComponent(() =>
  import("@/components/IS/shop/adverts/AdvertCard")
);
const ModalVisibility = ref(false);
const props = defineProps({
  selectedGraph: Object,
  selectedGraphAdvert: Object,
});
const labels = ref([]);
const dataSet = ref([]);
const loading = ref(false);
const setDataSet = (data, borderColor, borderWidth) => {
  dataSet.value = [
    {
      label: "Satış Sayısı",
      data: data,
      backgroundColor: () => chartMethods("graph", ["#5F63F230", "#ffffff05"]),
      fill: true,
      borderColor: borderColor,
      borderWidth: borderWidth,
      pointStyle: "circle",
      pointRadius: "0",
      hoverRadius: "9",
      drawTicks: false,
      pointBorderColor: "#fff",
      pointBackgroundColor: borderColor,
      hoverBorderWidth: 5,
    },
  ];
};
function chartMethods(elementId, color) {
  return chartLinearGradient(document.querySelector(`.${elementId}`), 300, {
    start: color[0],
    end: color[1],
  });
}
const handleModalVisibility = () => {
  ModalVisibility.value = false;
};
watch(
  () => props.selectedGraph,
  () => {
    console.log(props.selectedGraph);
    labels.value = props.selectedGraph.labels;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    });
    setDataSet(props.selectedGraph.datas, "#5F63F2", 3);

    ModalVisibility.value = true;
  }
);
</script>


<style lang="scss" scoped>
.orders-left-side {
  padding: 10px;
  background-color: #fbfbfb;
  border-radius: 5px;
}
.orders-right-side {
  background: #fbfbfb;
}
</style>