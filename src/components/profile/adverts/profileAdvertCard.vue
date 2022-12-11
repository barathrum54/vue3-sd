<template>
  <div v-if="userAdvert.Title" style="margin:.5rem">
    <sdCards style="maxWidth:290px" :use-title="false">
      <div class="project-top">
        <div class="project-header images">
          <a-row>
            <a-col :xs="24">
              <div class="image-container">
                <img :src="userAdvert.Image"/>
              </div>
            </a-col>
            <a-row style="padding-inline: 20px" :xs="14">
              <div style="margin-top: .5rem" class="title" >
                <h5> {{userAdvert.Title }}</h5>
                <span> {{userAdvert.Category.Name }}</span>
              </div>
              <div  style="margin-bottom: 1rem" class="advertDescription">
                {{userAdvert.Description}}
              </div>
            </a-row>
          </a-row>
        </div>

      </div >
      <div style="padding-inline: 20px" class="project-bottom">
        <div class="project-assignees">
          <div
              class="d-flex justify-content-between align-items-center is-button-group">
            <div class="price">
              <strong style="color:#5F63F2 "> {{userAdvert.Price}}₺ </strong>
            </div><a :href=userAdvert.Url target="_blank">

            <button class="buttonAdvert">
              İncele
            </button>
          </a>
          </div>
        </div>
      </div>
    </sdCards>
  </div>
</template>
<script setup>
const props = defineProps({
  userAdvert:Object,
})
</script>
<style lang="scss">
@import "@/config/global.scss";

@media (min-width: $xxxl) and (max-width: $xxxxl) {
  .advertCard {
    flex: 0 0 12.5% !important;
    max-width: 12.5% !important;
  }
}

@media (min-width: 1921px) and (max-width: $xxxl) {
  .advertCard {
    flex: 0 0 14.2% !important;
    max-width: 14.2% !important;
  }
}

@media (min-width: $xl) and (max-width: $xxl) {
  .advertCard {
    flex: 0 0 20% !important;
    max-width: 20% !important;
  }
}

@media (min-width: $lg) and (max-width: $xl) {
  .advertCard {
    flex: 0 0 25% !important;
    max-width: 25% !important;
  }
}

@media (min-width: $md) and (max-width: $lg) {
  .advertCard {
    flex: 0 0 33.33333% !important;
    max-width: 33.33333% !important;
  }
}
</style>
<style scoped lang="scss">
.ant-select {
  width: 100% !important;
}
.advertDescription{
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
.ant-col {
  padding: 0 !important;
  width: 20% !important;
}

.ant-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}


.title {

  margin-top: 5px;
  width: 100%;

  span {
    max-width: 100%;
    display: flex;
    height: 20px;
    font-size: 13px;
    line-height: 1.1rem;
    margin-bottom: 6px;
  }

  h5 {
    margin-bottom: 5px;
    max-width: 100%;
    height: 18px;
    line-height: 1.2rem;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
  }
}

.image-container {
  width: 100%;
  height: 215px;
  background-color: #f5f5f5;
  border-radius: 4px;

  img {
    width: 100% !important;
    height: 215px;
    object-fit: cover;
    border-radius: 4px;
  }

}

.ant-card {
  // ant-card
  padding: 0 0px 20px 0px !important;
}

.button-space-around {
  justify-content: space-around;
  flex-wrap: wrap;
}

.ant-row {
  width: 100% !important;
}

button {
  border: none;
  border-color: transparent;
}

.ant-btn-advertRed:active {
  background-color: #f55656 !important;
  color: white !important;
}

.images {
  max-width: 100%;
  max-height: 100%;
}

.increaseTimeModal {
  display: flex;

  button {
    width: 30% !important;
    margin: 0 0px 0 10px;
    transform: translateY(-2px);
  }
}
.buttonAdvert{
  background-color: #5F63F2;
  color: white;
  padding: 8px 22px;
  border-radius: 4px;
  &:hover{
    background-color:#4720C9 ;
  }
}
</style>
