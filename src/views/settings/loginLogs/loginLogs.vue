<template>
  <div class="content">
    <a-row>
      <a-col :xl="6">
        <h3 class="title">Erişim Kayıtları</h3>
      </a-col>
     
    </a-row>
    <a-row class="accountsWrap">
      <a-col :xl="24" class="accountsInner">
        <a-row class="accountsHeaders">
          <a-col :xl="6"> # </a-col>
          <a-col :xl="6"> IP Adresi </a-col>
          <a-col :xl="6"> Tarih </a-col>
          <a-col :xl="6"> Detay </a-col>
        </a-row>
        <a-row v-for="i in _logs" class="accountsRow">
          <a-col :xl="6">{{ i.Id }}</a-col>
          <a-col :xl="6">{{ i.IPAddress }}</a-col>
          <a-col :xl="6">{{ i.Datetime }}</a-col>
          <a-col :xl="6">{{ i.Details }}</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row v-if="canLoadMore">
      <a-col :offset="12" :xl="12">
        <a-button type="primary" @click="loadMore">Daha Fazla Göster</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";
import { getLoginLogs } from "@/services/settings/settings.service";

const _logs = ref([]);
const page = ref(1);
const canLoadMore = ref(true);
onMounted(() => {
  getData();
});
const getData = async () => {
  const response = await getLoginLogs(page.value);

  if (response.data.success == false) {
    canLoadMore.value = false;
  } else {
    if (response.data.datas.length) {
      response.data.datas.forEach((e) => {
        _logs.value.push(e);
      });
    }
    if (response.data.datas?.length < 20) {
      canLoadMore.value = false;
    }
  }

  console.log(response);
};
const loadMore = async () => {
  page.value += 1;
  getData();
};
</script>
<style lang="scss" scoped>
.subtitle {
  opacity: 0.9;
}

.accountsWrap {
  padding: 10px;
  display: flex;
  justify-content: center;
  border-top: 1pt solid rgba($color: #000000, $alpha: 0.05);
  .accountsInner {
    .accountsHeaders {
      background-color: #f8f9fb;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 15px;
      margin-top: 30px;
    }
    .accountsRow {
      padding: 10px;
      padding-left: 20px;
      .accountCol {
        display: flex;
        align-items: center;
        .icon {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .info {
          .title {
            font-size: 13px;
            font-weight: 500;
          }
          .subtitle {
            font-size: 11px;
            opacity: 0.8;
          }
        }
      }
      .stateCol {
        .state {
          width: fit-content;
          padding: 3px;
          padding-inline: 6px;
          border-radius: 10px;
          font-size: 11px;
        }
      }
      .actionsCol .actionBtn {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}


.content {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
}


</style>
