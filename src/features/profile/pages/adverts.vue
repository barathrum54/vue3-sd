<template>
<div>
  <a-row>
    <a-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :xxl="6" v-for="advert in userAdvert">
      <profile-advert-card :userAdvert="advert"/>
    </a-col>

  </a-row>
  <a-row v-if="activeAdvertCount>8">
    <a-col>
      <div class="pagination">
        <a-pagination
            @change="handlePageCount"
            size="large"
            :total=activeAdvertCount
            v-model:current="current"
            pageSize=8
        />
      </div>
    </a-col>
  </a-row>
</div>
</template>

<script setup>
import ProfileAdvertCard from "@/components/profile/adverts/profileAdvertCard";
import {getUserProfileAdvertDataServices} from "@/services/userProfile/userProfileServices";
import {ref,onMounted,inject} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()
const params = useRoute()
const userAdvert =ref({advertCategories:[],Medals:[]})
const page=ref(1)
const current = ref(1);
const activeAdvertCount = inject('activeAdvertCount')
const getProfileAdvertData = async () => {
  const res = await getUserProfileAdvertDataServices(route.params.id,current.value)
  if(res.success) {
    userAdvert.value=res.data
    page.value++
  }
}
const handlePageCount = () => {
  getProfileAdvertData()
}
onMounted(() => {
  getProfileAdvertData()
})
</script>

<style scoped>

</style>