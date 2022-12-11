<template>
<div :class="{'is-input-error':error}">
  <slot name="input">
  </slot>
  <p v-if="error" class="text-danger">
    {{errorText}}
  </p>
  </div>
</template>

<script setup>
defineProps({
  errorText: String,
  error:Boolean,
})
</script>

<style lang="scss">
.is-input-error{
  input {
    border: 1px solid red;
    &:hover{
      border: 1px solid red;
    }
  }
  p{
    color: red;
  }
}
</style>