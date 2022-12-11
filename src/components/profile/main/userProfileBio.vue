<template>
  <UserBioBox>
    <sdCards headless>
      <article class="user-info">
        <sdHeading as="h5" class="user-info__title">User Bio</sdHeading>
        <p>
          {{user.Bio }}
        </p>
      </article>
      <address v-if="isUserMe" class="user-info">
        <sdHeading as="h5" class="user-info__title">İletişim Bilgilerim</sdHeading>
        <ul class="user-info__contact">
          <li><sdFeatherIcons type="mail" size="14" /> <span>{{userMail}}</span></li>
          <li><sdFeatherIcons type="phone" size="14" /> <span> {{phoneNumberFormat(userPhone)}}</span></li>
        </ul>
      </address>
      <div class="user-info">
        <sdHeading as="h5" class="user-info__title">KATEGORİLER</sdHeading>
        <div class="user-info__skills">
          <sdButton v-for="category in user.advertCategories" type="light" outlined class="btn-outlined"> {{ category.Name}}</sdButton>
        </div>
          <div v-if="user.advertCategories.length==0">Herhangi bir kategori bulunamadı.</div>
      </div>
      <div class="user-info">
        <h5 class="user-info__title">BAŞARIMLAR</h5>
        <div  class="d-flex">

         <div v-for="(medal,index) in user.Medals" :key="index">
           <a-tooltip :title="medal.Title">

             <span style="padding-inline: 5px"  >
          <img height="50"  :src="'https://itemsatis.com/'+ medal.Image">
          </span>

          </a-tooltip>
         </div>
          <div v-if="user.Medals.length==0">Herhangi bir başarım bulunamadı.</div>

        </div>
      </div>
    </sdCards>
  </UserBioBox>
</template>
<script setup>
import { UserBioBox } from '@/features/profile/style';
import Swal from "sweetalert2";
import {useUserStore} from "@/store/user/user.store";
import {useRoute} from "vue-router";
import {computed} from "vue";
const userStore = useUserStore();
const route = useRoute()
const params = useRoute()
const props = defineProps ({
  user:{
    type:Object,
    default: {advertCategories:[],Medals:[]}
  },
})
const userId = computed(() => userStore.getId);
const userPhone = computed(() => userStore.getPhone);
const userMail = computed(() => userStore.getMailAddress)
const isUserMe = computed(() => {
  if(userId.value===route.params.id) return true
  else return false
})
const phoneNumberFormat = (phone) => {
  return '0' + phone.slice(0,3) + ' ' + phone.slice(3,6)+ ' ' + phone.slice(6,8) + ' ' + phone.slice(8)
}

</script>

