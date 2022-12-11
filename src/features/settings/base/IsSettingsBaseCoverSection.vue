<template>
  <div class="cover-image">
    <is-image
      :source="$api.CDN_COVER_API + cover"
      alt="banner"
      radius="4px"
      class="width-100"
      fit="contain"
    ></is-image>
    <a-upload
        name="file"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="onChange"
    >
      <a to="#"> <sdFeatherIcons type="camera" size="16" />
        {{ t('settings.cover.changeCover') }} </a>
    </a-upload>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useUserStore} from "@/store/user/user.store";
import {useI18n} from "vue-i18n";

const userStore = useUserStore();
const {t, d} = useI18n({useScope: "global"});
const cover = computed(() => userStore.getCover)

const headers = ref({
  authorization: 'authorization-text',
})

const onChange = (info) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    //this.$message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    //this.$message.error(`${info.file.name} file upload failed.`);
  }
}
</script>
