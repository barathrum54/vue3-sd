<template>
  <div>
    <sdPageHeader :title="t('shop.dashboard.title')"></sdPageHeader>
    <Main>
      <a-row justify="center" :gutter="20">
        <a-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="8"
            :xxl="8"
            class="xs-order-2 xs-mt-1 sm-order-2  sm-mt-2 md-order-2 md-mt-1"
        >
          <Suspense>
            <template #default>
              <DailyReport/>
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active/>
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="16"
            :xl="16"
            :xxl="16"
        >
          <Suspense>
            <template #default>
              <IsLast30DayChart/>
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active/>
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="16"
            :xl="14"
            :xxl="14"
            class="xs-order-3 xs-mb-2 xs-mt-1 sm-order-3 sm-mb-1 sm-mt-2 md-order-3 md-mb-2 md-mt-1 lg-mt-1 lg-mb-2 xl-mt-1 xl-mb-2 xxl-mt-1 xxl-mb-2"
        >
          <LastOrders/>
        </a-col>
        <a-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="10"
            :xxl="10"
            class="xs-order-2 xs-mt-1 sm-order-4 sm-mt-1 sm-mb-2 md-order-2 md-mt-1 lg-mt-1 lg-mb-2 xl-mt-1 xl-mb-2 xxl-mt-1 xxl-mb-2"
        >
          <LastNotification/>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import {Main} from "@/views/styled";
import {defineAsyncComponent} from "vue";
import {useI18n} from "vue-i18n";

const DailyReport = defineAsyncComponent(() =>
    import("@/features/shop/dashboard/dailyReport/IsShopDailyReport.vue")
);
const IsLast30DayChart = defineAsyncComponent(() =>
    import("@/features/shop/dashboard/30DayChart/IsLast30DayChart")
);
const LastOrders = defineAsyncComponent(() =>
    import("@/features/shop/dashboard/LastOrders/LastOrders")
);
const LastNotification = defineAsyncComponent(() =>
    import("@/features/shop/dashboard/LastNotifications/LastNotifications")
);
const {t} = useI18n({useScope: "global"});
</script>