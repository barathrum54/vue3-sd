<template>
  <sdUserCard>
    <smsModal :ModalVisibility="ModalVisibility" :handleModalVisibility="handleModalVisibility">
    </smsModal>
    <div class="card user-card">
      <sdCards  headless>
        <figure>
          <is-image fit="cover" width="150" height="150" :source="user.Avatar"> </is-image>
        </figure>
        <figcaption>
          <div class="card__content">
            <sdHeading class="card__name" as="h6">
              <a >{{ user.UserName }}</a>
            </sdHeading>
            <p class="card__designation">{{ user.UserType==2 && user.UserType==4 ? 'Mağaza Üyesi' : 'Kullanıcı' }}</p>
            <p style="margin-top: -1.5rem" class="card__designation">   <sdFeatherIcons type="map-pin" size="14" /> {{ user.City }} </p>
          </div>
          <div  v-if="!isUserMe" class="card__actions d-flex justify-content-evenly">
            <sdButton @click="ModalVisibility=true" size="default" type="white" outlined>
              <sdFeatherIcons type="phone" size="14" />
              <span>SMS Gönder</span>
            </sdButton>
            <sdButton @click="followingProcess" size="default" type="white" outlined>
              <sdFeatherIcons type="user-plus" size="14" />
              <span>{{user.IsFollowed==1? "Takipten çık" : "Takip et"}}</span>
            </sdButton>
          </div>
          <div class="card__info">
            <a-row :gutter="15">
              <a-col :xs="8">
                <div class="info-single">
                  <sdHeading class="info-single__title" as="h2"> {{user.CountOfReview}}</sdHeading>
                  <p>Değerlendirme</p>
                </div>
              </a-col>
              <a-col :xs="8">
                <div class="info-single">
                  <sdHeading class="info-single__title" as="h2">{{user.CountOfActiveAdvert }} </sdHeading>
                  <p>Aktif İlan</p>
                </div>
              </a-col>
              <a-col :xs="8">
                <div class="info-single">
                  <sdHeading class="info-single__title" as="h2"> {{ user.PositiveRep }} </sdHeading>
                  <p>Başarılı İşlem</p>
                </div>
              </a-col>
            </a-row>
          </div>
        </figcaption>
      </sdCards>
    </div>
  </sdUserCard>
</template>
<script setup>
import {ref,computed} from "vue"
import {SdUserCard} from "@/features/profile/style";
import {followUserServices, unFollowUserServices} from "@/services/userProfile/userProfileServices";
import smsModal from "@/features/profile/main/smsModal.vue"
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";
const route = useRoute()
const params = useRoute()
import {useUserStore} from "@/store/user/user.store";
import Swal from "sweetalert2";
const userStore = useUserStore();
const userId = computed(() => userStore.getId);
const isUserMe = computed(() => {
  if(userId.value===route.params.id) return true
  else return false
})

const props = defineProps ({
  user: {
    type:Object,

  },
})
const emit = defineEmits(["is:change-follow-status"])

const followingProcess = () => {
  if(props.user.IsFollowed==0) followUser()
  else unFollowUser()
}
const followUser= async () => {
  const res = await followUserServices(route.params.id)
  if(res.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `${res.message}`,
      showConfirmButton: false,
    });
    emit("is:change-follow-status", 1)
  }
  else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `İşlem Başarısız`,
      html: `${res.message}`,
      showConfirmButton: false,
    });
  }
}
const unFollowUser= async () => {
  const res = await unFollowUserServices(route.params.id)
  if(res.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `${res.message}`,
      showConfirmButton: false,
    });
    emit("is:change-follow-status", 0)
  }
  else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `İşlem Başarısız`,
      html: `${res.message}`,
      showConfirmButton: false,
    });
  }
}
const ModalVisibility = ref(false);
const handleModalVisibility = () => {
  ModalVisibility.value = false;
};
</script>
