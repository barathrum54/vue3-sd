import {defineAsyncComponent} from "vue";
import { ChartContainer } from '@/view/dashboard/style';

export const useSpringDash = (app) => {
    app.component("sdChartContainer", ChartContainer)
    app.component("sdHeading", defineAsyncComponent(() => import("@/components/springDash/heading/Heading.vue")))
    app.component("sdCards", defineAsyncComponent(() => import("@/components/springDash/cards/frame/CardsFrame.vue")))
  //  app.component("sdChartContainer", defineAsyncComponent(() => import("@/components/springDash/other/ChartContainer")))
    app.component("sdGoogleMaterialBarChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleMaterialBarChart));
    app.component("sdGoogleBasicBarChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleBasicBarChart));
    app.component("sdGoogleStackedChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleStackedChart));
    app.component("sdGoogleCustomColorChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleCustomColorChart));
    app.component("sdGoogleComboChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleComboChart));
    app.component("sdGoogleLineChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleLineChart));
    app.component("sdGoogleMultiLineChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleMultiLineChart));
    app.component("sdGoogleBasicPieChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").GoogleBasicPieChart));
    app.component("sdGoogle3dPieChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").Google3dPieChart));
    app.component("sdBubbleChart", defineAsyncComponent(() => import("@/components/springDash/charts/googleChart.vue").BubbleChart));
    app.component("sdAlerts", defineAsyncComponent(() => import("@/components/springDash/alerts/Alerts.vue")))
    app.component("sdButton", defineAsyncComponent(async() => (await import("@/components/springDash/buttons/Buttons.vue"))))
    app.component("sdBtnGroup", defineAsyncComponent(async() => (await import("@/components/springDash/buttons/ButtonsGroup.vue"))))
    app.component("sdDrawer", defineAsyncComponent(() => import("@/components/springDash/drawer/Drawer.vue")))
    app.component("sdCalendarButton", defineAsyncComponent(() => import("@/components/springDash/buttons/CalendarButton.vue")))
    app.component("sdExportButton", defineAsyncComponent(() => import("@/components/springDash/buttons/ExportButton.vue")))
    app.component("sdShareButton", defineAsyncComponent(() => import("@/components/springDash/buttons/ShareButton.vue")))
    app.component("sdPageHeader", defineAsyncComponent(async() => (await import("@/components/springDash/pageHeaders/PageHeaders.vue")).PageHeader))
    app.component("sdCascader", defineAsyncComponent(() => import("@/components/springDash/cascader/Cascader.vue")))
    app.component("sdAutoComplete", defineAsyncComponent(() => import("@/components/springDash/autoComplete/autoComplete.vue")))
    app.component("sdDropdown", defineAsyncComponent(() => import("@/components/springDash/dropdown/Dropdown.vue")))
    app.component("sdPopover", defineAsyncComponent(() => import("@/components/springDash/popup/Popup.vue")))
    app.component("sdFeatherIcons", defineAsyncComponent(() => import("@/components/springDash/utilities/featherIcons.vue")))
    app.component("sdModal", defineAsyncComponent(() => import("@/components/springDash/modals/Modals.vue")))
}
