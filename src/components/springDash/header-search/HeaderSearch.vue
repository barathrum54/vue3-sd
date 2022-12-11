<template>
  <Div
    class="certain-category-search-wrapper"
    :style="{ width: '100%' }"
    :darkMode="darkMode"
  >
    <a-row class="ant-row-middle">
      <a-col :md="2" :xs="1" :class="rtl ? 'text-left' : 'text-right'">
        <span class="certain-category-icon">
          <sdFeatherIcons type="search" />
        </span>
      </a-col>
      <a-col :md="22" :xs="23">
        <sdPopover
          :placement="!rtl ? 'bottomLeft' : 'bottomRight'"
          v-model="visible"
          title="Arama Listesi"
          action="click"
        >
          <template v-slot:content>
            <div>
              <router-link v-for="item in filteredData" :key="item.id" @click="writeToSearchBar" to="#">
                {{ item.title }}
                
              </router-link>
              <router-link v-if="filteredData.length === 0" to="#">
                Data Not Found.....
              </router-link>
            </div>
          </template>
          <a-input
            :placeholder="placeholder?placeholder:'Ara'"
            @input="(e) => search(e, searchData)"
          />
        </sdPopover>
      </a-col>
    </a-row>
  </Div>
</template>

<script setup>
import { Div } from "./header-search-style";
import { ref } from "vue";

const props = defineProps({
  searchData:Array,
  placeholder:String
}
  
);
const searchData = ref(props.searchData);
const rtl = ref(false);
const filteredData = ref(props.searchData);
const visible = ref(false);
const writeToSearchBar=()=>{
  console.log("çalıştı");
}
const search = (e, searchDatas) => {
  
  const data = searchDatas.filter((item) => {
    return item.title.toLowerCase().includes(e.target.value.toLowerCase());
  });
  filteredData.value = data;
};
const hide = () => {
  visible.value = false;
};
</script>
