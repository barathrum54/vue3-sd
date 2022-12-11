<template>
<div class="info-wrap">
    <h3>{{textContent}}</h3>
</div>
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  textContent: String,
})
</script>
<style scoped>
.info-wrap{
    border-radius: 5px;
    background: grey;
    padding: 10px;
    margin-inline : 25px;
    margin-bottom: 25px;
}
*{
    color: rgba(255, 255, 255, 0.9);
}
</style>
