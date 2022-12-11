<template>
  <div class="wrap">
    <div class="input-wrap">
      <input
        type="text"
        placeholder="Filtrele"
        @keyup="_search"
        v-model="searchQuery"
      />
      <sdFeatherIcons v-if="!isFiltering()" type="search" />
      
      <sdFeatherIcons style="cursor:pointer" @click="finishSearch" v-else type="x" />
    </div>
    <small v-if="minimumCharError">Minimum 3 Karakter giriniz</small>
  </div>
</template>
<script setup>
import { debounce } from "lodash";
import { computed, ref, toRefs, onMounted, inject } from "vue";
const search = inject("_search");
const minimumCharError = ref(false);
const searchQuery = ref("");
const isFiltering = inject("isFiltering");
onMounted(() => {
});
const finishSearch = () => {
  search('');
  searchQuery.value = '';
}
const _search = debounce(() => {
  const e = searchQuery.value;
  search(e);
  if (e != "" && e.length < 3) {
    minimumCharError.value = true;
  } else {
    minimumCharError.value = false;
  }
}, 500);
</script>

<style scope>
input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
}
.wrap {
  display: flex;
  flex-flow: column;
}
.input-wrap {
  background-color: #f4f5f7;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  display: flex;
}
</style>
