<template>
  <div class="changesLog">
    <sdPageHeader :title="t('changesLog.title')"> </sdPageHeader>
    <Main>
      <a-row :span="24">
        <a-col :span="24">
          <sdCards :title="t('changesLog.title')">
              <TimeLinePointerIconWrap v-if="logData">
                <a-timeline  v-for="(item, index) in logData" :key="index">
                  <a-timeline-item :class="`timeline-${item.Type}`">
                    <template #dot>
                        <component :is="icon[item.Icon]"></component>
                    </template>
                    <span class="changesLogTitle">{{item.Title}}</span>
                    <h2 class="tags" style="font-size:0.8rem;">{{item.Date}}</h2>
                    <p v-html="item.Content" style="max-width: 80%;"/>
                  </a-timeline-item>
                </a-timeline>
              </TimeLinePointerIconWrap>
            <a-row class="changesLogButtonRow" :span="24">
              <a-button v-if="isActiveButton" @click="getAppChangesLog" class="changesLogButton" size="large">{{t("changesLog.button")}}</a-button>
            </a-row>
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import { TimeLinePointerIconWrap } from "./changesLog-styled";
import { ClockCircleOutlined } from "@ant-design/icons-vue";
import { Main } from "../styled";
import { useI18n } from "vue-i18n";
import {onMounted ,ref,reactive} from "vue"
import { getAppChangesLogServices } from "@/services/changesLog/changesLog.services.js";
import {SwRocket,
  SwShieldCheck,
  SwPenTool,
  SwNotification,
  SwUsers,
  SwLayers,
  SwPicture,
  SwClock,
  SwEllipse,} from "./icons"

const { t, d } = useI18n({ useScope: "global" });
const logData = ref([]);
const page = ref(0);
const isActiveButton=ref(true)
const limit=10;

const icon = reactive({
    default:<SwRocket size="20" color="#5F63F2"/>,
    security:<SwShieldCheck size="20" color="#2C99FF" />,
    maintenance:<SwPenTool size="24" color="#fa8b0c" />,
    notification:<SwNotification size="17" color="#FF69A5" />,
    users:<SwUsers size="21" color="#20c997" />,
    layers:<SwLayers size="21" color="#ff4d4f" />,
    picture:<SwPicture size="21" color="#5f63f2" />,
    clock:<SwClock size="21" color="#ff69a5" />
})

const getAppChangesLog = async () =>{
    page.value++;
    const res = await getAppChangesLogServices(page.value,limit);
    logData.value=[...logData.value, ...res.data]
    if(res.data.length==0 || res.data.length%limit!=0)
     isActiveButton.value=false
}

onMounted(()=>{
    getAppChangesLog();
})
</script>

<style lang="scss" scoped>
.changesLogButtonRow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:30px;
  .changesLogButton{
      background:#F8F9FB;
      font-weight: bold;
      border:none;
  }
}
.changesLogTitle{
    font-size:1rem; 
    font-weight:bold; 
    color:#272B41;
}
.ant-timeline-item-tail{
    border-left: 2px solid #272B41 !important
}
</style>