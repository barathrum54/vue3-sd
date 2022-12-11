<template>
  <div v-if="loading" class="sd-spin">
    <a-spin/>
  </div>
  <DailyReportCard v-else>
    <div class="overview-head">
      <sdHeading as="h4" class="mb-0" style="margin-bottom:0;">{{ t('shop.dashboard.dailyReport.title') }}</sdHeading>
      <p>{{ t('shop.dashboard.dailyReport.subtitle') }}</p>
    </div>
    <div class="overview-box">
      <sdCards headless>
        <div class="d-flex align-items-center justify-content-between">
          <div class="overview-box-single">
            <sdHeading as="h2" class="color-primary font-weight-normal">
              {{ report.OrderTotalPrice || 0 }} {{ t('currency') }}
            </sdHeading>
            <p>{{ t('shop.dashboard.dailyReport.totalPrice') }} ({{ t('currency') }})</p>
          </div>
          <div class="overview-box-single text-right font-weight-normal">
            <sdHeading class="font-weight-normal" as="h2">{{ report.OrderTotalCount }}</sdHeading>
            <p>{{ t('shop.dashboard.dailyReport.orderCount') }}</p>
          </div>
        </div>
        <a-progress :percent="(report.OrderDelivered * 100) / report.OrderTotalCount" :showInfo="false"
                    class="progress-primary"/>

        <p v-if="report.priceRate !== 0">
          <!-- <span class="growth-upward font-weight-normal">
            <sdFeatherIcons :type="report.priceRate > 0 ? 'arrow-up' : 'arrow-down'" size="14" />
            {{ report.priceRate > 0 ? report.priceRate : Math.abs(report.priceRate) }}% <span>{{t('shop.dashboard.dailyReport.compYesterday') }}</span>
          </span> -->
        </p>
      </sdCards>
    </div>

    <div class="overview-box mt-1">
      <sdCards headless>
        <div class="d-flex align-items-center justify-content-between">
          <div class="overview-box-single font-weight-normal">
            <sdHeading as="h2" class="color-info font-weight-normal">
              {{ report.OrderWaitingDelivery }}
            </sdHeading>
            <p>{{ t('shop.dashboard.dailyReport.pendingOrders') }}</p>
          </div>
          <div class="overview-box-single text-right font-weight-normal">
            <sdHeading as="h2" class="font-weight-normal">{{ report.OrderDelivered }}</sdHeading>
            <p>{{ t('shop.dashboard.dailyReport.deliveredOrders') }}</p>
          </div>
        </div>
        <a-progress :percent="(report.OrderWaitingDelivery * 100) / report.OrderTotalCount"
                    :showInfo="false"/>
        <p v-if="report.ordersRate !== 0">
          <!-- <span class="growth-downward font-weight-normal">
            <sdFeatherIcons :type="report.ordersRate > 0 ? 'arrow-up' : 'arrow-down'" size="14" />
            {{ report.ordersRate > 0 ? report.ordersRate : Math.abs(report.ordersRate) }}% <span>{{t('shop.dashboard.dailyReport.compYesterday') }}</span>
          </span> -->
        </p>
      </sdCards>
    </div>

  </DailyReportCard>
</template>

<script setup>
import {DailyReportCard} from "./DailyReportCard";
import {onMounted, ref} from "vue";
import {getDailyReport} from "@/services/shop/dailyReport/shopDailyReportService";
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'})

const report = ref({
  OrderTotalPrice: 0,
  OrderTotalCount: 0,
  OrderDelivered: 0,
  OrderWaitingDelivery: 0,
  priceRate: 0,
  ordersRate: 0
});
const loading = ref(false);

const getReport = async () => {
  const response = await getDailyReport().catch(onFail);
  loading.value = false;
  if (response.success) {
    report.value = {
      OrderTotalPrice: +response.OrderTotalPrice || 0,
      OrderTotalCount: +response.OrderTotalCount || 0,
      OrderDelivered: +response.OrderDelivered || 0,
      OrderWaitingDelivery: +response.OrderWaitingDelivery || 0,
      priceRate: response.priceRate || 0,
      ordersRate: response.ordersRate || 0
    };
  }
}

const onFail = () => {
  loading.value = false;
}

onMounted(() => {
  loading.value = true;
  getReport();
})
</script>
<style lang="scss" scoped>
.eLThxV { //en dış katman
  height: 100%;
}

* {
  font-weight: 400 !important;
}

.overview-head {
  p {
    color: #d6ddff;
    font-size: 12px;
  }
}
</style>