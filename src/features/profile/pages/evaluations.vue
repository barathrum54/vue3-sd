<template>
  <div>
    <a-row class="evaluation-container">
      <a-col class="evaluation-leftside" :span="18">
        <sdCards headless>
          <div class="evaluation-header">
            <sdHeading as="h5">
              <a-row>
                <a-col class="author" :span="22">
                  <div style="margin-right: 10px">
                    <img
                      :style="{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }"
                      :src="`https://cdn.itemsatis.com/avatar/${userStore.getAvatar}`"
                      alt=""
                    />
                  </div>
                  <div>
                    <span class="author-username">{{
                      userStore.getUsername
                    }}</span>
                    <p class="author-date">3 gün önce</p>
                  </div>
                </a-col>
                <a-col class="dot-icon" :span="2">
                  <sdDropdown>
                    <template #overlay>
                      <router-link to="#">
                        <sdFeatherIcons type="slash" size="14" />
                        <span>Yorumu Bildir</span>
                      </router-link>
                    </template>
                    <a to="#">
                      <sdFeatherIcons size="24" type="more-horizontal" />
                    </a> </sdDropdown
                ></a-col>
              </a-row>
              <a-row class="message">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
                atque ut dolor natus consectetur nemo maxime modi eveniet
                dignissimos, cum earum molestiae voluptatum, expedita, minus
                asperiores officia nesciunt et fuga soluta odit esse placeat
                neque? Eius, non, excepturi voluptates sint qui quis amet
                voluptatum illum possimus ut incidunt totam id.
              </a-row>
            </sdHeading>
          </div>
          <div v-if="isReply" class="evaluation-isReply">
            <div class="evaluation-isReply-brace">
              <hr class="evaluation-hr isReply-hr" />
              <span class="evaluation-isReply-brace-title">Mağaza Yanıtı</span>
            </div>
            <div class="evaluation-isRepy-body">
              <sdHeading as="h5">
                <a-row>
                  <a-col class="author" :span="22">
                    <div style="margin-right: 10px">
                      <img
                        :style="{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }"
                        :src="`https://cdn.itemsatis.com/avatar/${userStore.getAvatar}`"
                        alt=""
                      />
                    </div>
                    <div>
                      <span class="author-username">{{
                        userStore.getUsername
                      }}</span>
                      <p class="author-date">3 gün önce</p>
                    </div>
                  </a-col>
                </a-row>
                <a-row class="message">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Veniam atque ut dolor natus consectetur nemo maxime modi
                  eveniet dignissimos, cum earum molestiae voluptatum, expedita,
                  minus asperiores officia nesciunt et fuga soluta odit esse
                  placeat neque? Eius, non, excepturi voluptates sint qui quis
                  amet voluptatum illum possimus ut incidunt totam id.
                </a-row>
              </sdHeading>
            </div>
          </div>
          <div class="evaluation-body">
            <hr class="evaluation-hr" />
            <a-row class="scoring-body" :span="24">
              <div class="scoring">
                <span class="scoring-score low-score">1.7</span>
                <p class="scoring-title">Genel Ort.</p>
              </div>
              <div class="scoring">
                <span class="scoring-score mid-score">3.5</span>
                <p class="scoring-title">Güvenilirlik</p>
              </div>
              <div class="scoring">
                <span class="scoring-score low-score">2.1</span>
                <p class="scoring-title">İletişim</p>
              </div>
              <div class="scoring">
                <span class="scoring-score high-score">4.7</span>
                <p class="scoring-title">Teslimat</p>
              </div>
              <div class="scoring">
                <span class="scoring-score high-score">4.2</span>
                <p class="scoring-title">Memnuniyet</p>
              </div>
            </a-row>
          </div>
          <div v-if="!isReply">
            <hr class="evaluation-hr" />
            <a-row class="evaluation-reply">
              <a-col :xs="4" :lg="3" :xl="1" class="reply-avatar">
                <div>
                  <img
                    :style="{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }"
                    :src="`https://cdn.itemsatis.com/avatar/${userStore.getAvatar}`"
                    alt=""
                  />
                </div>
              </a-col>
              <a-col :xs="20" :lg="21" :xl="22" class="reply-box">
                <Footer>
                  <form @submit="handleSubmit">
                    <div class="chatbox-reply-form d-flex">
                      <div class="chatbox-reply-input">
                        <span class="smile-icon">
                          <div class="isEmoji" v-if="emojiCheck">
                            <emojiPickers
                              @is-emoji-click="insert"
                            ></emojiPickers>
                          </div>
                          <a @click="emojiCheckChange"
                            ><sdFeatherIcons type="smile" size="24"
                          /></a>
                        </span>
                        <input
                          @change="handleChange"
                          placeholder="Buraya yazın..."
                          name="chat"
                          id="chat"
                          :style="{ width: '100%' }"
                          :value="replyInput"
                        />
                      </div>
                      <div class="chatbox-reply-action d-flex">
                        <sdButton
                          @click="handleSubmit"
                          type="primary"
                          class="btn-send"
                        >
                          <sdFeatherIcons type="send" size="18" />
                        </sdButton>
                      </div>
                    </div>
                  </form>
                </Footer>
              </a-col>
            </a-row>
          </div>
        </sdCards>
      </a-col>
      <a-col :span="6">
        <a-row>
          <div class="evaluation-rightside">
            <h3 class="evaluation-rightside-title">
              Kullanıcının Satın Aldığı İlan
            </h3>
            <div class="evaluation-rightside-img">
              <img
                :src="`https://cdn.itemsatis.com/avatar/${userStore.getAvatar}`"
              />
            </div>
            <div class="evaluation-rightside-advertTitle">
              <span>[ULTRA VİP] %100 TR 10-120 SKIN AR...</span>
              <p>Vaorant Random Hesabı</p>
            </div>
            <a-row class="evaluation-rightside-advertFooter">
              <a-col
                :span="10"
                class="evaluation-rightside-advertFooter-leftside"
              >
                <span>İlan Fiyatı</span>
                <p>15.00 $</p>
              </a-col>
              <a-col
                :span="14"
                class="evaluation-rightside-advertFooter-rigthside"
              >
                <span>Satın Alma Tarihi</span>
                <p>18 Nisan 2022 , 03:33</p>
              </a-col>
            </a-row>
          </div>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { useUserStore } from "@/store/user/user.store";
import { Footer, BackShadowEmoji } from "./style";
import emojiPickers from "@/components/profile/evaluations/emojiPickers.vue";

const isReply = ref(false);
const replyInput = ref("");
const emojiCheck = ref(false);

const userStore = useUserStore();
onMounted(() => {
  console.log(userStore.getAvatar);
});
const emojiCheckChange = () => {
  emojiCheck.value = emojiCheck.value !== true;
};
const insert = (event) => {
  replyInput.value += event.detail.emoji.unicode;
};
</script>
<style lang="scss" scoped>
.evaluation-container {
  .evaluation-leftside {
    background: #f9f9f9;
    border-radius: 20px 0 20px 20px;
    .evaluation-header {
      .author {
        display: flex;
        flex-direction: row;
        padding: 2% 0% 0% 2%;
        .author-username {
          font-size: 1rem;
          font-family: Inter;
        }
        .author-date {
          font-size: 0.8rem;
          color: #9299b8;
          font-weight: normal;
          font-family: Inter;
        }
      }
      .dot-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .message {
        padding: 0% 2% 1% 2%;
        font-size: 0.9rem;
        font-weight: normal;
        font-family: Inter;
        color: #5a5f7d;
      }
    }
    .evaluation-body {
      .scoring-body {
        display: flex;
        justify-content: center;
        .scoring {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1% 0% 0% 5%;
          .scoring-title {
            font-size: 0.8rem;
            font-family: Inter;
            color: #9299b8;
          }
          .scoring-score {
            font-size: 1.6rem;
            font-weight: bold;
            font-family: Inter;
          }
          .low-score {
            color: #ff4d4f;
          }
          .mid-score {
            color: #fa8b0c;
          }
          .high-score {
            color: #009f30;
          }
        }
      }
    }
    .evaluation-reply {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1%;
      .reply-avatar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .evaluation-hr {
      border: 0 none;
      height: 1.6px;
      background: #f1f2f6;
    }
    .evaluation-isReply {
      .evaluation-isReply-brace {
        .isReply-hr {
          margin-top: 2%;
        }
        position: relative;
        height: 30px;
        .evaluation-isReply-brace-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: calc(-1rem + 3px);
          color: #5f63f2;
          padding: 3px 15px;
          border-radius: 14px;
          background: #efeffe;
        }
      }
      .evaluation-isRepy-body {
        .author {
          display: flex;
          flex-direction: row;
          padding: 0% 0% 0% 2%;
          .author-username {
            font-size: 1rem;
            font-family: Inter;
          }
          .author-date {
            font-size: 0.8rem;
            color: #9299b8;
            font-family: Inter;
          }
        }
        .dot-icon {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .message {
          padding: 0% 2% 1% 2%;
          font-size: 0.9rem;
          font-weight: normal;
          font-family: Inter;
          color: #5a5f7d;
        }
      }
    }
    .isEmoji {
      position: absolute !important;
      right: 10%;
      bottom: 100%;
    }
  }
  .evaluation-rightside {
    background: #f9f9f9;
    border-radius: 0px 10px 10px 0px;
    padding: 7% 7% 0% 7%;
    .evaluation-rightside-title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.9rem;
      font-weight: normal;
      font-family: Inter;
      color: #9299b8;
    }
    .evaluation-rightside-img {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-height: 200px;
        max-width: 100%;
        border-radius: 5%;
        object-fit: cover;
      }
    }
    .evaluation-rightside-advertTitle {
      margin-top: 5%;
      span {
        font-size: 13px;
        color: #444444;
        overflow-wrap: break-all;
        word-wrap: break-all;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
      }
      p {
        font-size: 11px;
        color: #707070;
      }
    }
    .evaluation-rightside-advertFooter {
      .evaluation-rightside-advertFooter-leftside {
        span {
          font-size: 11px;
          color: #707070;
        }
        p {
          font-size: 13px;
          font-weight: bold;
          color: #5f63f2;
        }
      }
      .evaluation-rightside-advertFooter-rigthside {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        span {
          font-size: 11px;
          color: #707070;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
