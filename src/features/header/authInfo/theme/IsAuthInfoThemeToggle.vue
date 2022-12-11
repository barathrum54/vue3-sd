<template>
    <div style="display: flex;">
      <a to="#" class="head-example" @click.prevent="toggleTheme">
        <sdFeatherIcons :type="darkMode ? 'moon' : 'sun'" size="20" />
      </a>
    </div>
</template>

<script setup>
import {useConfigStore} from "@/store/config/config.store";
import {computed} from "vue";

const configStore = useConfigStore();

const darkMode = computed(() => configStore.getDarkMode);

const toggleTheme = () => {
  configStore.setDarkMode(!darkMode.value);
}
</script>

<style scoped>
.head-example {
  display: block;
  line-height: normal;
  margin: 0 3px;
}
</style>