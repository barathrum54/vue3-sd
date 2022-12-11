<template>
  <div class="slider-wrap">
    <a-row>
      <a-col :xl="24">
        <div class="slider-item">
          <div class="label-wrap">
            <h2 class="label">Güvenilirlik:</h2>
            <h2 class="point">{{ sliderData.guvenilirlik }}/10</h2>
          </div>
          <input
            class="slider"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="10"
            v-model="sliderData.guvenilirlik"
          />
        </div>
      </a-col>
      <a-col :xl="24">
        <div class="slider-item">
          <div class="label-wrap">
            <h2 class="label">Memnuniyet:</h2>
            <h2 class="point">{{ sliderData.memnuniyet }}/10</h2>
          </div>
          <input
            class="slider"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="10"
            v-model="sliderData.memnuniyet"
          />
        </div>
      </a-col>
      <a-col :xl="24">
        <div class="slider-item">
          <div class="label-wrap">
            <h2 class="label">İletişim:</h2>
            <h2 class="point">{{ sliderData.iletisim }}/10</h2>
          </div>
          <input
            class="slider"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="10"
            v-model="sliderData.iletisim"
          />
        </div>
      </a-col>

      <a-col :xl="24">
        <div class="slider-item">
          <div class="label-wrap">
            <h2 class="label">Teslimat:</h2>
            <h2 class="point">{{ sliderData.teslimat }}/10</h2>
          </div>
          <input
            class="slider"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="10"
            v-model="sliderData.teslimat"
          />
        </div>
      </a-col>
      <a-col :xl="24">
        <div class="slider-item">
          <div class="label-wrap">
            <h2 class="label">Yorumunuz:</h2>
          </div>
          <a-textarea
            v-model:value="sliderData.yorumunuz"
            placeholder="Lütfen satıcı hakkında yorumunuzu belirtiniz."
            class="textarea"
          >
          </a-textarea>
        </div>
      </a-col>
      <a-col :xl="24">
        <center>
          <a-spin style="margin-top: 15px" v-if="isLoading"></a-spin>
        </center>
        <a-button
          @click="postReview"
          type="primary"
          style="width: 100%; margin-top: 15px"
          v-if="!isLoading"
          >Değerlendirmeyi Gönder</a-button
        >
      </a-col>
      <a-col :xl="24" v-if="hasErrors">
        <h3 style="color: white">
          {{ errorMessage }} <span style="color: red">*</span>
        </h3>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { computed, ref, toRefs, onMounted, inject } from "vue";
import { sendReview } from "@/services/notifications/shopsNotifications.service";
import { useRouter } from "vue-router";
import { Notification } from "ant-design-vue";

const router = useRouter();

const openWindow = inject("openWindow");
const isLoading = ref(false);
const detailData = inject("detailData");

const hasErrors = ref(false);
const errorMessage = ref("");

const sliderData = ref({
  guvenilirlik: 10,
  memnuniyet: 10,
  iletisim: 10,
  teslimat: 10,
  yorumunuz: "",
});
const postReview = async () => {
  hasErrors.value = false;

  const Data1 = detailData.value.DataId_1;
  const purchaseId = detailData.value.purchaseID;
  let formData = sliderData.value;
  const commentText = formData.yorumunuz;
  console.log(formData.yorumunuz);

  if (commentText == "") {
    hasErrors.value = true;
    errorMessage.value = "Lütfen yorum ekleyiniz";
    return false;
  }
  isLoading.value = true;
  const response = await sendReview(Data1, purchaseId, formData);
  if (response?.data.success == false) {
    hasErrors.value = true;
    errorMessage.value = response.data.message;
  } else {
    Notification["success"]({
      message: "İşlem Başarılı",
      description: response.data.message,
    });

    finalize();
  }

  console.log(response);
  isLoading.value = false;
};
const finalize = () => {
  router.push(`/notifications`);
};
</script>
<style scoped>
.slider-wrap {
  padding: 20px;
  background: grey;
  width: 100%;
  border-radius: 5px;
}
.slider-item {
  display: flex;
  flex-flow: column;
}
.label {
  color: rgba(255, 255, 255, 0.879);
}
.point {
  color: rgba(255, 255, 255, 0.879);
}
.label-wrap {
  display: flex;
  justify-content: space-between;
}
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 25px;
  background: #ffffff;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 5px;
}
.textarea {
  opacity: 0.7;
  background: #ffffff;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: rgb(93, 93, 251); /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 5px;
}

.sdbtn {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
