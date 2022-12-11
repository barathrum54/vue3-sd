<template>
  <div class="cover-image">
    <is-image width="100%" height="auto" fit="cover" :source="userCover" use-percent></is-image>

    <a-upload v-bind="props">
      <a to="#"> <sdFeatherIcons type="camera" size="16" /> Change Cover </a>
    </a-upload>
  </div>
</template>
<script setup>
defineProps({
  userCover : {
    type:String,
    default:""
  }
})
</script>
