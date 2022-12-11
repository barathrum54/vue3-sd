<template>
  <div>
    <sdPageHeader :title="t(`orders.filterTitles.${pageData.title}`)"></sdPageHeader>

    <Main>
      <a-row :gutter="30">
        <a-col
            class="product-sidebar-col"
            :xxl="5"
            :xl="7"
            :lg="7"
            :md="10"
            :xs="24">
          <a-row

          >
            <template #default>
              <Filters @filter="(e) => filterData(e)" ref="_ClearFilters"/>
            </template>
          </a-row>
        </a-col>
        <a-col class="product-content-col" :xxl="19" :lg="17" :md="14" :xs="24">
          <a-row>

            <a-col :offset="22" :xl="2">
              <a-row class="pagination" v-if="pageData.pagination">
                <a-col :xl="16" style="text-align: center">
                  {{ pageData.page }}. {{ t('orders.orderList.page') }}
                </a-col>
                <a-col :xl="4">
                  <sdFeatherIcons
                      size="15"
                      class="paginate-chevron"
                      type="chevron-left"
                      @click="prevPage"
                  />
                </a-col>
                <a-col :xl="4">
                  <sdFeatherIcons
                      size="15"
                      class="paginate-chevron"
                      type="chevron-right"
                      @click="nextPage"
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <router-view
              :key="$route.name + ($route.params.id || '')"
              @clearFilters="clearFilters"
          ></router-view>
          <!--  -->
        </a-col>
      </a-row>
    </Main>
  </div>
</template>
<script setup>
import {computed, defineAsyncComponent, provide, ref} from "vue";
import {Main} from "../styled";
import {useI18n} from "vue-i18n";
const {t, d} = useI18n({useScope: "global"});

const _ClearFilters = ref();
const Filters = defineAsyncComponent(() => import("./overview/Filters"));
const pageData = ref({
  page: 1,
  isLastPage: false,
  title: "Title",
  limit: 10,
  pagination: true,
  isFiltering: false,
});
const _filterData = ref({
  Search: "",
  purchaseId: "",
  userName: "",
  Title: "",
  StartDate: "",
  FinishDate: "",
});
const _isFiltering = computed(() => {
  let ___filterData = Object.values(_filterData.value);

  let isFiltering = false;
  ___filterData.map((value, key) => {
    if (value != "") {
      isFiltering = true;
      console.log(value);
    }
  });
  pageData.value.isFiltering = isFiltering;
  return isFiltering;
});
const filterData = (e) => {
  console.log("FİLTER DATA");
  _filterData.value = {...e};
  pageData.value.page = 1;
  console.log(e);
};
const nextPage = () => {
  if (pageData.value.isLastPage == false) {
    pageData.value.page++;
  }
};
const prevPage = () => {
  if (pageData.value.page > 1) {
    pageData.value.page--;
  }
};
const clearFilters = () => {
  if (_ClearFilters.value && _ClearFilters.value.clearFilters) {
    _ClearFilters.value.clearFilters();
  }
};
provide("pageData", pageData);
provide("filterData", _filterData);
provide("isFiltering", _isFiltering);
</script>
<style lang="scss">
.pagination {
  margin-top: -30px;
}

.paginate-chevron {
  position: absolute;
  bottom: 3px;
  margin-left: 4px;
  cursor: pointer;
}
.filterClearText{
  margin: 1rem;

}
.clearFilters {
  cursor: pointer;
  color: red;
}
</style>
