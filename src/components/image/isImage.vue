<template>
  <img
    v-if="!!source"
    :src="source"
    :class="[classes, {'percent': usePercent}]"
    :width="width"
    :height="height"
    :alt="alt"
    loading="lazy"
  />
</template>

<script setup>
import Config from "@/constants/config";
import { ref } from "vue";

defineProps({
  source: {
    required: true,
  },
  width: {
    required: false,
  },
  height: {
    required: false,
  },
  classes: {
    required: false,
  },
  alt: {
    required: false,
    default: "",
  },
  radius: {
    required: false,
    default: "0%",
  },
  marginRL: {
    required: false,
    default: "0",
  },
  fit: {
    type: String,
    default: "initial",
    validator: param => ["initial", "inherit", "cover", "contain", "fill", "none", "unset"].includes(param)
  },
  usePercent: {
    type: Boolean,
    default: false
  }
});

const API = ref(Config.UPLOAD);
const key = ref("");
const handleError = (event) => {};
</script>

<style lang="scss" scoped>
.is-default-image-bg {
  background-color: #f1f1f1;
}
img {
  border-radius: v-bind(radius);
  object-fit: v-bind(fit);
  &.percent {
    width: v-bind(width);
    height: v-bind(height);
  }
}
</style>
