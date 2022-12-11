<template>
  <KnowledgebaseTopWrap>
    <div class="sDash_knowledgetop">
      <h3 class="sDash_knowledgetop__title">Sana nasıl yardımcı olabilirim?</h3>
      <div class="sDash_knowledgetop__search--form">
        <a-form name="login" layout="vertical">
          <div class="sDash_knowledgetop__formInner">

            <a-form-item class="sDash_search-input">
              <a-input
                  v-model:value="searchKey"
                  class="pl-1"
                  placeholder="Herhangi bir başlık arayın..."
                  @change="$emit('is:search', searchKey)"
              />
            </a-form-item>
            <a-form-item>
              <sdButton class="btn-search" html-type="submit" type="primary" size="large"> Ara </sdButton>
            </a-form-item>
          </div>
        </a-form>
      </div>
      <div class="sDash_knowledgetop__popular--topics">
        <ul>
          <li>
            <span class="popular-topics-title">En çok arananlar:</span>
          </li>
          <li
            v-for="(help, index) in mostSearchedHelps"
            :key="index"
          >
            <a
                @click="() => onClickMostSearched(help)"
            >{{help.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </KnowledgebaseTopWrap>
</template>

<script setup>
import {ref} from "vue"
import { KnowledgebaseTopWrap } from './style'

const searchKey = ref("");

const emit = defineEmits(["is:search", "is:most-click"]);

const onClickMostSearched = ({title, category}) => {
  console.log('sa')
  searchKey.value = title;
  emit("is:search", searchKey.value)
}

const mostSearchedHelps = [
  {
    title: "Para çekme kuralları nedir?",
    category: "paymentAndBalance",
  },
  {
    title: "Minimum fiyat listesi",
    category: "postProgress",
  },
  {
    title: "İlan alışveriş sistemi nasıl işliyor?",
    category: "postProgress",
  }
];

</script>

<style scoped>

</style>