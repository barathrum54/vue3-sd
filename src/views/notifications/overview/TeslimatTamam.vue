<template>
  <sdButton type="primary" :raised="true" class="mr-half">
    Banka Hesabı eklemek için tıklayın.
  </sdButton>
  <sdButton type="secondary" :raised="true">
    Para çekim talebi oluşturmak için tıklayın.
  </sdButton>
</template>
<script setup>
import { computed, ref, toRefs, onMounted, inject } from "vue";
const openWindow = inject("openWindow");
</script>
<style scoped>
.sdbtn {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
