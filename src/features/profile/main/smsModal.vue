<template>
  <sdModal
      :visible="ModalVisibility"
      :onCancel="handleModalVisibility"
      width="600px"
  >
    <template #title>
     <div class="titleArea">
       <div class="titleHeader"> Kullanıcıya SMS Gönder </div>
       <div class="titleContent"> Bu panel üzerinden kullanıcıya SMS olarak mesaj gönderebilirsiniz.</div>
     </div>
    </template>
    <div>
  <div class="selectContent">
    <div> Şablon Seçimi </div>
   <div>
     <a-select
         ref="select"
         v-model:value="selectedText"
         style="width: 100%"
     >
       <a-select-option v-for="option in options1" @click="() => {key=option.value}" :key="option.value"
                        :value="option.label"> {{ option.label }}
       </a-select-option>

     </a-select>
   </div>
  </div>
      <label> Gönderilecek Mesaj</label>
      <div style="height: 150px" class="messageContent">
        {{ username }} kullanıcısından yeni bir mesajınız var! {{ selectedText }}
      </div>
      <sdButton block="true"  @click="sendSMSUser" type="primary"
      > SMS Gönder (0.50TL)
      </sdButton>
    </div>
  </sdModal>
</template>
<script setup>
import {ref,computed} from "vue";
import {sendSMSUserServices} from "@/services/userProfile/userProfileServices";
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";
import {useUserStore} from "@/store/user/user.store";
import Swal from "sweetalert2";
const userStore = useUserStore();
const username = computed(() => userStore.getUsername);
const route = useRoute()
const params = useRoute()
const key = ref(5)
const props = defineProps({
  ModalVisibility:Boolean,
  handleModalVisibility:Function,
})

const selectedText = ref("İlanınızı satın almak istiyorum. İtemsatış\'a girerek mesajıma cevap verir misin?")
const options1 = ref([
  {
    value: 5,
    label: 'İlanınızı satın almak istiyorum. İtemsatış\'a girerek mesajıma cevap verir misin?',
  },
  {
    value: 6,
    label: ' Merhaba benimle itemsatış üzerinden iletişime geçer misiniz?',
  },
  {
    value: 7,
    label: 'Bir ilanınız ile ilgileniyorum. Lütfen benimle İtemSatış üzerinden iletişime geçin.',
  },
  {
    value: 8,
    label: 'Bir ilanınız hakkında daha detaylı bilgi alabilmem mümkün mü?',
  },
]);
const sendSMSUser = async () => {
  const res = await sendSMSUserServices(route.params.id, key.value)
  if (!res.success) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `İşlem Başarısız`,
      html: `${res.message}`,
      showConfirmButton: false,
    });  }
  else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `${res.message}`,
      showConfirmButton: false,
    });
  }
}
</script>

<style scoped lang="scss">
.titleArea{
  .titleHeader{
    font-size: 20px;
  }
}
.selectContent{
margin-block: 2rem;
  >div {
        margin-block:1rem;
  }
}
.messageContent{
  width: 100%;
  height: auto;
  border: 1px solid #d9d9d9;
  padding: 8px;
  margin-bottom: 2rem;
}
</style>