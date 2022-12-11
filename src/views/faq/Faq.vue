<template>
  <div class="container">
    <sdPageHeader title="Yardım Merkezi"></sdPageHeader>
    <Main>
      <NoteWrapper>
        <a-row class="justify-content-center" :gutter="25">
          <a-col class="trigger-col leftside-margin" :span="24">
            <is-faq-top
              @is:search="searchingHelp"
            ></is-faq-top>
          </a-col>
          <a-col :xxl="6" :xl="8" :lg="9">
            <a-row class="trigger-col leftside-margin" :xxl="5" :xl="7" :lg="9" :xs="24">
              <is-faq-list :menu-list-names="categoryTitleKeys"></is-faq-list>
            </a-row>
            <a-row class="trigger-col leftside-margin" :xxl="5" :xl="7" :lg="9" :xs="24">
              <is-faq-create></is-faq-create>
            </a-row>
          </a-col>
          <a-col :xxl="18" :xl="16" :lg="15" :xs="24">
            <is-faq-detail :help-details="helpDetail"></is-faq-detail>
          </a-col>
        </a-row>
      </NoteWrapper>
    </Main>
  </div>
</template>
<script setup>
import {onMounted, ref, provide, computed, inject} from "vue"
import {NoteWrapper} from "./style";
import {Main} from "@/views/styled.js";
import IsFaqCreate from "@/features/faq/create/IsFaqCreate.vue";
import IsFaqList from "@/features/faq/list/IsFaqList.vue";
import IsFaqDetail from "@/features/faq/detail/IsFaqDetail.vue";
import {getFaqListServices} from "@/services/faq/faq.services"
import {useI18n} from "vue-i18n";
import IsFaqTop from "@/features/faq/top/IsFaqTop.vue";

const debounce = inject('debounce')
const checkLocalStorageCache = inject('checkLocalStorageCache')
const setLocalStorageCache = inject("setLocalStorageCache")
const getFromLocalStorageCache = inject("getFromLocalStorageCache")

const {t, d} = useI18n({useScope: "global"});

const categoryTitleKeys = ref([])
const selectedItem = ref(null);
const helpDetails = ref({})
const helpDetail = computed(() => helpDetails.value[selectedItem.value])

const searchingHelp = debounce((args) => searchWithLocaleStorage(args), 700);

const getFaqList = async () => {
  const response = await getFaqListServices();
  setLocalStorageCache({
    key: "faq:request-response",
    timeKey: "faq:last-request-time",
    value: response.data,
    time: 1800
  })
  setFaqList(response.data);
}

const setFaqList = (object) => {
  helpDetails.value = object;
  let selected = null;
  categoryTitleKeys.value = Object.entries(object).map(([key, value]) => {
    if(selected === null && value.length > 0) {
      selected = key;
    }
    return {
      key,
      title: key,
      count: value.length
    }
  })
  selectedItem.value = selected;
}

const searchWithLocaleStorage = (searchKey = '') => {
  console.log('saa', searchKey)
  const data = getFromLocalStorageCache({key: "faq:request-response", def: {}});
  const result = {};
  Object.entries(data).forEach(([key, value]) => {
    result[key] = value.filter(v => v.Title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()));
  })
  setFaqList(result);
}

const setFaqListFromCache = () => {
  const data = getFromLocalStorageCache({key: "faq:request-response", def: {}});
  if (!!!data && Object.keys(data).length > 0) {
    getFaqList();
    return;
  }
  setFaqList(data);
}

provide("selectedItem", selectedItem)

onMounted(() => {
  checkLocalStorageCache({
    key: "faq:last-request-time",
    empty: getFaqList,
    cached: setFaqListFromCache
  });
})
</script>

<style scoped>
.leftside-margin {
  margin-bottom: 20px;
}

.ant-card-body {
	padding: 25px !important;
}
</style>