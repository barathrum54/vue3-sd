<template>
  <ul v-if="chatData">
    <li
        v-for="(user, key) in chatData"
        @click="(e) => dataFiltering(e, user.email)"
        :key="key + 1"
        class="chat-link-signle"
    >
      <router-link :to="`${user.email}`">
        <div class="author-figure">
          <img :src="require(`@/static/img/chat-author/${user.img}`)" alt=""/>
          <span :class="user.active ? 'active' : 'inactive'"/>
        </div>
        <div class="author-info">
          <BlockSpan class="author-name">{{ user.userName }}</BlockSpan>

          <BlockSpan class="author-chatText">
            {{ textRefactor(user.content[user.content.length - 1].content, 5) }}
          </BlockSpan>
        </div>
        <div class="author-chatMeta">
          <BlockSpan>{{
              moment(user.id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY')
                  ? moment(user.id).format('hh:mm A')
                  : moment(user.id).format('dddd')
            }}
          </BlockSpan>
          <a-badge v-if="key <= 1" class="badge-success" :count="3"/>
        </div>
      </router-link>
    </li>
  </ul>
</template>
<script setup>
import moment from 'moment';
import {BlockSpan} from '@/views/chat/style';
import {textRefactor} from '@/components/springDash/utilities/utilities';
import {useRoute} from 'vue-router';
import {computed, ref} from 'vue';


const chatData = ref([])
const match = computed(() => useRoute().matched[1]);

const dataFiltering = (e, email) => {
  e.preventDefault();
};


</script>
