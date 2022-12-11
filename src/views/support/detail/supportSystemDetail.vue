<template>
  <div> 
    <sdPageHeader :title="t('supportSystem.detail.title')"> </sdPageHeader>
    <MailDetailsWrapper>
      <sdCards>
        <template #button>
          <MailRightAction v-if="detail">
            <a-button v-if="detail.details.State != 3" type="primary" danger @click="closeMyTicket"
              ><a>Talebi Kapat</a></a-button
            >
          </MailRightAction>
        </template>
        <template #title>
          <MessageAction>
            <a-tooltip
              placement="bottom"
              :title="t('supportSystem.detail.back')"
            >
              <router-link to="/supports">
                <sdFeatherIcons type="arrow-left" size="14" />
              </router-link>
            </a-tooltip>
            <a-tooltip
              placement="bottom"
              :title="t('supportSystem.detail.refresh')"
            >
              <router-link to="#">
                <sdFeatherIcons type="rotate-cw" size="18" />
              </router-link>
            </a-tooltip>
            <!-- <a-tooltip placement="bottom" title="Archive">
            <router-link to="#">
              <sdFeatherIcons type="archive" size="18" />
            </router-link>
          </a-tooltip>
          <a-tooltip placement="bottom" title="Info">
            <router-link to="#">
              <sdFeatherIcons type="alert-octagon" size="18" />
            </router-link>
          </a-tooltip>
          <a-tooltip placement="bottom" title="Delete">
            <router-link to="#">
              <sdFeatherIcons type="trash" size="18" />
            </router-link>
          </a-tooltip>
          <a-tooltip placement="bottom" title="Read">
            <router-link to="#">
              <sdFeatherIcons type="book-open" size="18" />
            </router-link>
          </a-tooltip>
          <a-tooltip placement="bottom" title="Folder">
            <router-link to="#">
              <sdFeatherIcons type="folder" size="18" />
            </router-link>
          </a-tooltip> -->
          </MessageAction>
        </template>
        <a-row :gutter="15">
          <a-col v-if="detail" :span="24">
            <MessageDetails>
              <div class="d-flex justify-content-between align-items-center">
                <div
                  style="width: 100%"
                  class="
                    message-box
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <sdHeading as="h2">
                    {{ detail.details.Title }}
                  </sdHeading>
                  <span v-if="detail"
                    >{{ t("supportSystem.detail.createdAt") }}:
                    {{ detail.details.CreatedDatetime }}
                  </span>
                </div>
              </div>
              <br />
              <div
                v-for="(messages, index) in detail.messages"
                :key="index"
                class="message"
              >
                <div
                  class="
                    message-box
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div class="message-author">
                    <img
                      :style="{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                      }"
                      :src="`${messages.Avatar}`"
                      alt=""
                    />
                    <div v-if="messages.UserName == fullName">
                      <sdHeading as="h4">{{ userName }}</sdHeading>
                      <p>{{ messages.UserName }}</p>
                    </div>
                    <div v-else>
                      <sdHeading as="h4">{{ messages.UserName }}</sdHeading>
                    </div>
                  </div>
                  <div class="message-excerpt">
                    <span> {{ messages.Datetime }} </span>
                  </div>
                </div>
                <div class="message-body">
                  <p>{{ messages.Message }}</p>
                </div>
                <div
                  v-if="messages.images"
                  class="message-attachments attachments"
                >
                  <div
                    v-for="(images, index) in messages.images"
                    :key="index"
                    class="attachments"
                  >
                    <figure>
                      <div class="attachment-image">
                        <img
                          :src="`${images.Image}`"
                          style="width: 200px; height: 150px"
                        />
                      </div>
                      <div class="attachment-hover">
                        <router-link class="btn-link" to="#">
                          <sdFeatherIcons type="download" />
                        </router-link>
                        <router-link class="btn-link" to="#">
                          <sdFeatherIcons type="share-2" />
                        </router-link>
                      </div>
                      <figcaption>
                        <sdHeading as="h4">Attached.jpg</sdHeading>
                        <p>256.5 KB</p>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <hr />
              </div>
            </MessageDetails>
          </a-col>
        </a-row>
      </sdCards>
      <div v-if="detail">
        <a-row
          v-if="detail.details.State != 3"
          style="margin: 40px 20px; display: flex; flex-direction: row"
        >
          <a-col
            style="margin-top: 5px"
            :xxl="1"
            :xl="2"
            :lg="2"
            :md="2"
            :sm="3"
            :xs="4"
          >
            <img
              :style="{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
              }"
              :src="`${$api.CDN_AVATAR_API + avatar}`"
              alt=""
            />
          </a-col>
          <a-col :xxl="23" :xl="22" :lg="22" :md="22" :sm="21" :xs="20">
            <sdCards headless class="supportDetailReplyCard">
              <div class="supportDetailReplyInfoBody">
                <a-row>
                  <a-col :xxl="1" :xl="1" :lg="1" :md="2" :sm="3" :xs="4"
                    ><sdFeatherIcons type="info" size="30"
                  /></a-col>
                  <a-col :xxl="23" :xl="23" :lg="23" :md="22" :sm="21" :xs="20">
                    <h4 style="color: #2c99ff">
                      {{ t("supportSystem.detail.replyInfoheader") }}
                    </h4>
                    <p>
                      {{ t("supportSystem.detail.replyInfoBody") }}
                    </p>
                  </a-col>
                </a-row>
              </div>
              <div style="margin: 25px 25px 10px 25px">
                <a-textarea
                  :autosize="{ minRows: 5 }"
                  v-model:value="formState.replyMessage"
                  :placeholder="
                    t('supportSystem.detail.replyTextAreaPlaceHolder')
                  "
                ></a-textarea>
              </div>
              <hr />
              <div class="replySupport">
                <a-button
                  type="primary"
                  size="medium"
                  style="margin-right: 15px"
                  @click="() => replySupport()"
                >
                  {{ t("supportSystem.detail.replyButton") }}
                </a-button>
                <a-upload
                  v-model:file-list="fileList"
                  :beforeUpload="beforeUploadFile"
                  :remove="removeFile"
                >
                  <sdFeatherIcons type="paperclip" color="#9299b8" size="20" />
                </a-upload>
              </div>
            </sdCards>
          </a-col>
        </a-row>
        <a-row
          v-else
          style="margin: 40px 20px; display: flex; flex-direction: row"
        >
          <sdCards headless>
            <div class="supportDetailNoReplyInfoBody">
              <a-row>
                <a-col :xxl="1" :xl="1" :lg="1" :md="2" :sm="3" :xs="4"
                  ><sdFeatherIcons type="info" size="30"
                /></a-col>
                <a-col :xxl="23" :xl="23" :lg="23" :md="22" :sm="21" :xs="20">
                  <h4 style="color: #ff4d4f">
                    {{ t("supportSystem.detail.noReplyInfoHeader") }}
                  </h4>
                  <p>{{ t("supportSystem.detail.noReplyInfoBody") }}</p>
                </a-col>
              </a-row>
            </div></sdCards
          >
        </a-row>
      </div>
    </MailDetailsWrapper>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, reactive, inject } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  MailDetailsWrapper,
  MessageAction,
  MessageDetails,
  ReplyList,
  MessageReply,
  MailRightAction,
} from "./style";
import { useUserStore } from "@/store/user/user.store.js";
import { useRouter, useRoute } from "vue-router";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { message, Modal } from "ant-design-vue";
import {
  getSupportDetailServices,
  replyTicketServices,
  closeMyTicketServices,
} from "@/services/support/supportServices.js";

const { t, d } = useI18n({ useScope: "global" });
const { params } = useRoute();
const route = useRoute();
const router = useRouter();
const detail = ref("");
const userStore = useUserStore();
const avatar = computed(() => userStore.getAvatar);
const userName = computed(() => userStore.getUsername);
const fullName = computed(() => userStore.getFullname);
const fileList = ref([]);

const getDetail = async () => {
  const res = await getSupportDetailServices(route.params.id);
  detail.value = res.data;
};
const replySupport = async () => {
  const res = await replyTicketServices(formState);
  if (res.success == true) {
    clearForm();
    getDetail();
    message.success("Talebiniz başarıyla yanıtlandı");
  } else if (res.success == false) {
    clearForm();
    message.error(res.message);
  }
};
const closeMyTicket = async () => {
  Swal.fire({
    title: "Emin misiniz?",
    text: "Bu talebi kapatmak istediğinize emin misiniz?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Evet, Kapat!",
    cancelButtonText: "Vazgeç",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await closeMyTicketServices(route.params.id);
      if (res.success == true) {
        Swal.fire("Başarılı!", "Talebiniz başarıyla kapatıldı.", "success");
        router.push("/supports");
      } else if (res.success == false) {
        Swal.fire("Başarısız!", `${res.message}`, "error");
      }
    }
  });
};
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
onMounted(() => {
  getDetail();
});

const formState = reactive({
  ticketId: route.params.id,
  replyMessage: "",
  fileList: [],
});
const clearForm = () => {
  formState.replyMessage = "";
  formState.fileList = [];
  fileList.value = [];
};
</script>

<style lang="scss" scoped>
.message {
  height: 100%;
}
.attachments {
  display: flex !important;
  flex-direction: row !important;
}
.supportDetailReplyInfoBody {
  background-color: #dff0ff;
  color: #2c99ff;
  padding: 10px;
  margin: 0px 25px 25px 25px;
  border-radius: 5px;
}
.supportDetailNoReplyInfoBody {
  background-color: #dff0ff;
  color: #ff4d4f;
  padding: 20px;
  margin: 0px 25px;
  border-radius: 5px;
}
.supportDetailReplyCard {
  hr {
    background: #f1f2f6;
    margin: 20px 25px 20px 25px;
    border: 0 none;
    height: 1px;
  }
}
.replySupport {
  margin: 10px 25px;
}
</style>
