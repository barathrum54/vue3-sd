<template>
    <div style="display: flex;">
      <a to="#" class="head-example" @click.prevent="pushHelpCenter">
        <sdFeatherIcons type="help-circle" size="20" />
      </a>
    </div>
</template>

<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";

const router=useRouter();
const pushHelpCenter = () => {
  router.push("/faq")
}
</script>

<style scoped>
.head-example {
  display: block;
  line-height: normal;
  margin: 0 3px;
}
</style>