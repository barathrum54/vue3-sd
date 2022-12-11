<template>
  <div class="supportCreate">
    <a-modal
      v-model:visible="visible"
      :title="t('supportSystem.header.modalTitle')"
      :ok-text="t('supportSystem.header.button')"
      @ok="handleSupportCreate()"
      @cancel="handleCancel()"
    >
      <a-alert
        :message="t('supportSystem.header.infoTitle')"
        type="info"
        class="mb-1"
        show-icon
      >
        <template #description>
          <p v-html="t('supportSystem.header.infoContent')"></p>
        </template>
      </a-alert>
      <a-form layout="vertical">
        <a-form-item :label="t('supportSystem.header.requestHeader')">
          <a-input
            v-model:value="formState.requestHeader"
            :placeholder="t('supportSystem.header.requestHeaderPlaceholder')"
            size="large"
          />
        </a-form-item>
        <a-form-item :label="t('supportSystem.header.requestCategory')">
          <a-select
            v-model:value="selectedCategory"
            :placeholder="t('supportSystem.header.requestCategoryPlaceholder')"
          >
            <a-select-option
              v-for="(item, index) in supportCategories"
              :key="index"
              >{{ item.Name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item :label="t('supportSystem.header.supportRequest')">
          <a-textarea
            :autosize="{ minRows: 5 }"
            v-model:value="formState.supportRequest"
            :placeholder="t('supportSystem.header.textAreaPlaceHolder')"
          ></a-textarea>
        </a-form-item>
        <a-form-item :label="t('supportSystem.header.requestAdditionalImages')">
          <Dragger
            :beforeUpload="beforeUploadFile"
            v-model:fileList="fileList"
            name="file"
            :remove="removeFile"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {{ t("supportSystem.header.dropzoneMessage") }}
            </p>
          </Dragger>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  getSupportCategoriesServices,
  sendNewTicketServices,
} from "@/services/support/supportServices.js";
import { Upload, message } from "ant-design-vue";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";
import { InboxOutlined } from "@ant-design/icons-vue";

const { t, d } = useI18n({ useScope: "global" });
const fileList = ref([]);
const { Dragger } = Upload;
const router = useRouter();
const emit = defineEmits(["update:supportCreateVisible"]);
const selectedCategory = ref(null);
const supportCategories = ref([]);
const props = defineProps({
  supportCreateVisible: Boolean,
});
const visible = computed({
  get() {
    return props.supportCreateVisible;
  },
  set(value) {
    emit("update:supportCreateVisible", value);
  },
});
const handleSupportCreate = async () => {
  if (supportCategories.value[selectedCategory.value])
    formState.requestCategory =
      supportCategories.value[selectedCategory.value].Id;
  const res = await sendNewTicketServices(formState);
  if (
    formState.requestHeader != "" &&
    formState.requestCategory != "" &&
    formState.supportRequest != "" &&
    formState.fileList != []
  ) {
    if (res.success == true) {
      handleCancel();
      Swal.fire({
        title: "Talebiniz oluşturuldu!",
        text: `${t('supportSystem.detail.replyInfoBody')}`,
        icon: "success",
        confirmButtonText: "Tamam",
      }).then( (result) => {
        if (result.isConfirmed) {
          router.push(`/supports/detail/${res.ticketID}`);
        }
      });
    } else if (res.success == false) {
      message.error(res.message);
      handleCancel();
    }
  } else {
    if (res.success == false) {
      message.error(res.message);
    }
  }
};
const handleCancel = () => {
  visible.value = false;
  clearForm();
};
const getSupportCategories = async () => {
  const res = await getSupportCategoriesServices();
  supportCategories.value = res.datas;
};
onMounted(() => {
  getSupportCategories();
});
const formState = reactive({
  requestHeader: "",
  requestCategory: "",
  supportRequest: "",
  fileList: [],
});
const beforeUploadFile = (param) => {
  if (
    param.type === "image/jpeg" ||
    param.type === "image/png" ||
    param.type === "image/jpg"
  ) {
    formState.fileList.push(param);
    message.success("Yükleme Başarılı");
    console.log(formState.fileList);
    return false;
  } else {
    message.error("Sadece resim dosyaları yükleyebilirsiniz");
  }
};
const removeFile = (param) => {
  formState.fileList.forEach((item, index) => {
    if (item.uid === param.uid) {
      formState.fileList.splice(index, 1);
    }
  });
};
const clearForm = () => {
  formState.requestHeader = "";
  formState.requestCategory = "";
  formState.supportRequest = "";
  formState.fileList = [];
  fileList.value = [];
};
</script>

<style scoped>
</style>