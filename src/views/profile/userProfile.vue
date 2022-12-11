<template>
<div>
  <sdPageHeader title="My Profile">
  </sdPageHeader>
  <Main>
    <a-row :gutter="25">
      <a-col :xxl="6" :lg="8" :md="10" :xs="24">
        <Suspense>
          <template #default>
            <userProfileCard :user="profileData" @is:change-follow-status="profileData.IsFollowed = $event" />
          </template>
          <template #fallback>
            <sdCards headless>
              <a-skeleton avatar active :paragraph="{ rows: 3 }" />
            </sdCards>
          </template>
        </Suspense>
        <Suspense>
          <template #default>
            <div style="margin-block:1rem">
              <userProfileBio :user="profileData" /> </div>
          </template>
          <template #fallback>
            <sdCards headless>
              <a-skeleton avatar active :paragraph="{ rows: 3 }" />
            </sdCards>
          </template>
        </Suspense>
      </a-col>
      <a-col :xxl="18" :lg="16" :md="14" :xs="24">
        <SettingWrapper>
          <Suspense>
            <template #default>
              <div class="coverWrapper">
                <userProfileHeaderBanner :userCover="profileData.Cover" />
                <nav class="profileTab-menu">
                  <ul>
                    <li>
                      <router-link :to="`/profile/${route.params.id}/adverts`">İlanlar</router-link>
                    </li>
                    <li>
                      <router-link :to="`/profile/${route.params.id}/summary`">Özet Ekran</router-link>
                    </li>
                    <li>
                      <router-link :to="`/profile/${route.params.id}/evaluations`">Değerlendirmeler</router-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </SettingWrapper>
      </a-col>
    </a-row>
  </Main>
</div>
</template>
<script setup>
import {onMounted,ref,provide} from "vue";
import { Main } from '@/views/styled.js'
import { SettingWrapper } from '@/features/profile/style';
import { useRoute } from 'vue-router';
import userProfileBio from "@/components/profile/main/userProfileBio.vue"
import userProfileCard from "@/components/profile/main/userProfileCard.vue"
import userProfileHeaderBanner from "@/components/profile/main/userProfileHeaderBanner.vue"
import {getUserProfileDataServices} from "@/services/userProfile/userProfileServices";
const { matched } = useRoute();
const route = useRoute()
const params = useRoute()
const { path } = matched[1];
const activeAdvertCount = ref(0)
const profileData =ref({advertCategories:[],Medals:[],CountOfActiveAdvert:0})
const getProfileData = async () => {
  const res = await getUserProfileDataServices(route.params.id)
  profileData.value=res.data
  activeAdvertCount.value=res.data.CountOfActiveAdvert
}
onMounted(() => {
  getProfileData()
  console.log(profileData.value.CountOfActiveAdvert)
  console.log(profileData.value)

})
provide('activeAdvertCount',activeAdvertCount)
</script>

<style scoped>

</style>