<template>
  <sdPageHeader
    :title="t('shop.adverts.title')"
    :subTitle="t('shop.adverts.subtitle') + ':' + posts.length"
    class="itemsatis-page-header"
  >
    <template v-slot:buttons>
      <div class="page-header-actions">
        <sdButton size="small" type="primary">
          <sdFeatherIcons type="plus" size="14" />
          {{ t("shop.adverts.createAdvert") }}
        </sdButton>
      </div>
    </template>
  </sdPageHeader>

  <a-row :gutter="25">
    
    <a-col :xs="24">
      <AdvertSorting>
        <div class="project-sort-bar">
          <div class="project-sort-search">
            <sdAutoComplete
              :placeholder="t('shop.adverts.searchPlaceholder')"
              :dataSource="posts"
              @keyup="searchAdvert"
              v-model:value="searchValue"
              patterns
            />
          </div>
          <div class="project-sort-nav">
            <nav>
              <ul>
                <li
                  :key="category.id"
                  v-for="category in categories"
                  :class="
                    categoryActive === category.id ? 'active' : 'deactive'
                  "
                  @click="changeState(category.id)"
                >
                  <a @click="() => onChangeCategory(category.id)" to="#">
                    {{ category.text }}
                    <!-- <a-badge
                      :number-style="{
                        backgroundColor: 'rgba(255, 0, 0,0.1)',
                        color: 'red',
                        boxShadow: '0 0 0 1px #d9d9d9 inset',
                      }"
                      class="badge-danger"
                      :count="postCount"
                    /> -->
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="project-sort-group">
            <div class="sort-group">
              <span>{{ t("shop.adverts.sort") }}:</span>
              <a-select
                @change="changeSorting"
                :defaultValue="sortingDefaultValue"
              >
                <a-select-option
                  :key="sortingOption.id"
                  v-for="sortingOption in sortingOptions"
                  >{{ sortingOption.text }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
      </AdvertSorting>
      <div>
        <a-row :gutter="[25, 25]">
          <a-col class="noAdvertAlertWrapper" v-if="noAdvertAlert" :span="24">
            <a-empty description="Hiç İlanınız Bulunmamaktadır."> </a-empty>
          </a-col>
          <!-- <a-skeleton :paragraph="{ rows: 0 }"   active="active" /> -->
          <div v-if="loading" class="skeleton">
            <a-col
              :key="index"
              v-for="(skeleton, index) in 6"
              :xl="4"
              :lg="8"
              :xs="24"
            >
              <is-skeleton active type="input" width="240px" height="200px" />
              <is-skeleton active title />
              <is-skeleton active type="input" width="200px" height="50px" />
              <is-skeleton active type="input" width="60px" height="50px" />
              <is-skeleton
                type="input"
                style="margin: 10px 0px 0px 10px"
                width="130px"
                height="50px"
              />
            </a-col>
          </div>
          <template v-if="posts">
            <a-col v-for="post in posts" :key="post.Id" class="advertCard">
              <Suspense>
                <template #default>
                  <AdvertCard
                    @selectAdvert="selectAdvert"
                    @openDopingModal="openDopingModal"
                    @openStockModal="openStockModal"
                    @getPostAfterIncreaseTime="getPostsWithQuery"
                    @openOrdersModal="openOrdersModal"
                    @openGraphModal="openGraphModal"
                    @handleIncreaseTimeModalVisibility="handleModalVisibility"
                    @handleStateOfAdvertModalVisibility="handleModalVisibility"
                    :title="post.Title"
                    :id="post.Id"
                    :state="post.State"
                    :description="post.Description"
                    :finishDateKalan="post.FinishDateKalan"
                    :price="post.Price"
                    :url="post.Url"
                    :boost="post.Boost"
                    :featured="post.Featured"
                    :categoryName="post.categoryName"
                    :pinned="post.Pinned"
                    :selectedAdverts="selectedAdverts"
                    :socialpinned="post.SocialPinned"
                    :yukariTasi="post.YukariTasi"
                    :yukariTasiDatetimeText="post.YukariTasiDatetimeText"
                    :ilanKalanSaniye="post.FinishKalanTime"
                    :postType="post.postType"
                    :useActions="true"
                  />
                </template>
              </Suspense>
            </a-col>
          </template>

          <div>
            <DopingModal
              @closeModal="closeModal"
              :selectedDopingAdvert="selectedAdvert"
            />
          </div>
          <div>
            <AdvertStockModal
              :selectedStockAdvert="selectedAdvert"
              :selectedStocks="selectedStocks"
            />
          </div>
          <div>
            <OrdersModal
              :selectedAdvertOrders="selectedAdvertOrders"
              :selectedOrderAdvert="selectedAdvert"
            />
          </div>
          <div>
            <GraphModal
              :selectedGraph="selectedGraph"
              :selectedGraphAdvert="selectedAdvert"
            />
          </div>
        </a-row>
        <a-row>
          <a-col>
            <div class="selectedAmount">
              {{ selectedAdverts.length }}
              {{ t("shop.adverts.selectedAdvert") }}
            </div>
            <div class="selectedMenu">
              <a-select
                style="margin-left: 5px"
                :defaultValue="selectedOptions[0].text"
                v-model:value="selectMenuValue"
                @change="changeMenuValue"
              >
                <a-select-option
                  :key="selectedOption.id"
                  v-for="selectedOption in selectedOptions"
                  >{{ selectedOption.text }}
                </a-select-option>
              </a-select>
              <sdButton
                size="small"
                :transparented="true"
                type="primary"
                style="margin-bottom: 8px"
                @click="handleBatchProcess"
              >
                {{ t("shop.adverts.batchProcessApply") }}
              </sdButton>
            </div>
          </a-col>
        </a-row>
        <a-col>
          <div class="pagination">
            <a-pagination
              @change="handlePageCount"
              @showSizeChange="handlePostInPageCount"
              v-model:pageSize="postLimit"
              v-model:current="current"
              size="large"
              :total="postCount"
            />
          </div>
        </a-col>
      </div>
    </a-col>
  </a-row>
  <sdModal
    title="İlan Süresi Güncelleme"
    :visible="increaseTimeModalVisibility"
    :onCancel="() => handleModalVisibility({ name: 'increaseTime' })"
    width="50%"
    style="max-width: 600px;"
  >
    <h3 class="">{{ t("shop.adverts.advertCard.increaseAdvertTime") }}</h3>
    <div class="increaseTimeModal">
      <a-select
        :defaultValue="increaseTimeOptions[0].text"
        v-model:value="increaseTimeValue"
      >
        <a-select-option
          :key="increaseTimeOption.id"
          v-for="increaseTimeOption in increaseTimeOptions"
          >{{ increaseTimeOption.text }}
        </a-select-option>
      </a-select>
      <sdButton block @click="increaseTime" type="advertChecked"
        >{{ t("shop.adverts.advertCard.approve") }}
      </sdButton>
    </div>
  </sdModal>
  <div v-if="dopingModalVisibility" class="blur-background"></div>
</template>

<script setup>
import {
  defineAsyncComponent,
  inject,
  onMounted,
  ref,
  watch,
  computed,
} from "vue";
import { AdvertSorting } from "./Style";

import { useRoute, useRouter } from "vue-router";
import {
  getPosts,
  searchPosts,
  unPublishPosts,
  getStocks,
  getMySoldOrders,
  getPostAnalytics,
  extendPosts,
  rePublishPost
} from "@/services/shop/adverts/adverts.service";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
const DopingModal = defineAsyncComponent(() =>
  import("@/features/shop/adverts/DopingModal.vue")
);
const AdvertStockModal = defineAsyncComponent(() =>
  import("@/features/shop/adverts/AdvertStockModal.vue")
);
const OrdersModal = defineAsyncComponent(() =>
  import("@/features/shop/adverts/OrdersModal.vue")
);
const GraphModal = defineAsyncComponent(() =>
  import("@/features/shop/adverts/GraphModal.vue")
);
const AdvertCard = defineAsyncComponent(() =>
  import("@/components/IS/shop/adverts/AdvertCard")
);
const { t } = useI18n({ useScope: "global" });
const dopingModalVisibility = ref(false);
const dopingModalRef = ref(null);
const selectedStocks = ref();
const sortingDefaultValue = computed(() => sortingOptions.value[0].text);
const selectedGraph = ref();
const increaseTimeModalVisibility = ref(false);
const increaseTimeValue = ref();
const selectedAdvertModalID = ref();
const current = ref(1);
const selectedAdverts = ref([]);
const loading = ref(true);
const searchValue = ref("");
const debounce = inject("debounce");
const noAdvertAlert = ref(false);
const selectedAdvert = ref();
const selectedAdvertOrders = ref();
const categoryActive = ref("active");
const state = ref("");
const sorting = ref("");
const userResulation = ref(0);
const advertCountInPage = ref(0);
const colCountInARow = ref(0);
const router = useRouter();
const route = useRoute();
const posts = ref([]);
const postCount = ref();
const categories = computed(() => [
  {
    id: "all",
    text: t("shop.adverts.menuAllAdverts"),
  },
  {
    id: "active",
    text: t("shop.adverts.menuActiveAdverts"),
  },
  // {
  //   id: "control",
  //   text: "Kontrol Gereken İlanlar",
  // },
  {
    id: "inactive",
    text: t("shop.adverts.menuInactiveAdverts"),
  },
  // {
  //   id: "draft",
  //   text: "Taslak",
  // },
]);
const sortingOptions = computed(() => [
  {
    id: "ai",
    text: t("shop.adverts.sortAI"),
  },
  {
    id: "ending",
    text: t("shop.adverts.sortDate"),
  },
  {
    id: "category",
    text: t("shop.adverts.sortCategory"),
  },
  {
    id: "price",
    text: t("shop.adverts.sortPrice"),
  },
  {
    id: "csv",
    text: t("shop.adverts.sortCSV"),
  },
]);
const selectedOptions = computed(() => [
  {
    id: "delete",
    text: t("shop.adverts.batchProcessRemove"),
  },
  {
    id: "up",
    text: t("shop.adverts.batchProcessMoveUp"),
  },
  {
    id: "doping",
    text: t("shop.adverts.batchProcessDoping"),
  },
]);
const selectMenuValue = ref(selectedOptions.value[0].id);
const increaseTimeOptions = computed(() => [
  {
    id: "1",
    text: `1  ${t("shop.adverts.advertCard.day")}`,
  },
  {
    id: "7",
    text: `7 ${t("shop.adverts.advertCard.day")}`,
  },
  {
    id: "14",
    text: `14 ${t("shop.adverts.advertCard.day")}`,
  },
  {
    id: "30",
    text: `30 ${t("shop.adverts.advertCard.day")}`,
  },
]);

const handleBatchProcess = async () => {
  if (selectMenuValue.value == "delete") {
    await unPublish();
  } else if (selectMenuValue.value == "up") {
    await moveUp();
  } else if (selectMenuValue.value == "doping") {
  }
};
const openDopingModal = ({
  title,
  id,
  state,
  description,
  finishDateKalan,
  price,
  url,
  pinned,
  categoryName,
  featured,
  boost,
  socialpinned,
  yukariTasi,
  yukariTasiDatetimeText,
  ilanKalanSaniye,
}) => {
  dopingModalVisibility.value = true;

  selectedAdvert.value = {
    title,
    id,
    state,
    description,
    finishDateKalan,
    price,
    url,
    pinned,
    categoryName,
    featured,
    boost,
    socialpinned,
    yukariTasi,
    yukariTasiDatetimeText,
    ilanKalanSaniye,
    dopingModalVisibility: dopingModalVisibility,
  };
};
const openStockModal = async ({
  title,
  id,
  state,
  description,
  finishDateKalan,
  price,
  url,
  pinned,
  categoryName,
  featured,
  boost,
  socialpinned,
  yukariTasi,
  yukariTasiDatetimeText,
  ilanKalanSaniye,
}) => {
  selectedStocks.value = await getStocks(id);
  if (selectedStocks.value.success) {
    selectedStocks.value = selectedStocks.value.stocks
    selectedAdvert.value = {
    title,
    id,
    state,
    description,
    finishDateKalan,
    price,
    url,
    pinned,
    categoryName,
    featured,
    boost,
    socialpinned,
    yukariTasi,
    yukariTasiDatetimeText,
    ilanKalanSaniye,
  };
  }else{

  }
  
};
const openOrdersModal = async ({
  title,
  id,
  state,
  description,
  finishDateKalan,
  price,
  url,
  pinned,
  categoryName,
  featured,
  boost,
  socialpinned,
  yukariTasi,
  yukariTasiDatetimeText,
  ilanKalanSaniye,
}) => {
  selectedAdvertOrders.value = await getMySoldOrders(id);

  console.log(selectedAdvertOrders.value);
  selectedAdvert.value = {
    title,
    id,
    state,
    description,
    finishDateKalan,
    price,
    url,
    pinned,
    categoryName,
    featured,
    boost,
    socialpinned,
    yukariTasi,
    yukariTasiDatetimeText,
    ilanKalanSaniye,
  };
};
const openGraphModal = async ({
  title,
  id,
  state,
  description,
  finishDateKalan,
  price,
  url,
  pinned,
  categoryName,
  featured,
  boost,
  socialpinned,
  yukariTasi,
  yukariTasiDatetimeText,
  ilanKalanSaniye,
}) => {
  selectedGraph.value = await getPostAnalytics(id);

  selectedAdvert.value = {
    title,
    id,
    state,
    description,
    finishDateKalan,
    price,
    url,
    pinned,
    categoryName,
    featured,
    boost,
    socialpinned,
    yukariTasi,
    yukariTasiDatetimeText,
    ilanKalanSaniye,
  };
};

const handleModalVisibility = ({ id = 0, name }) => {
  console.log(name);
  selectedAdvertModalID.value = id;
  if (name == "increaseTime") {
    handleIncreaseTimeModal();
  } else if (name == "stateOfAdvert") {
    handleStateOfAdvertModal(id);
  }
};
const handleIncreaseTimeModal = () => {
  increaseTimeModalVisibility.value = !increaseTimeModalVisibility.value;
};
const handleStateOfAdvertModal = (id) => {
  selectedAdvertModalID.value = id;
  Swal.fire({
    title: "İlan Aktifleştirme",
    html:
      `İlanınız pasif durumdan aktif duruma güncellenecektir. <br>` +
      "İşleme devam etmek istiyor musunuz ?",
    icon: "info",

    showCancelButton: true,
    confirmButtonText: "İlanı Aktifleştir",
    cancelButtonText: "İşlemi İptal Et",
    cancelButtonColor: "#F37E7E",
    confirmButtonColor: "#3FC3EE",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let data = await rePublishPost(id);
      if (data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "İlanınız başarıyla aktifleştirildi.",
          showConfirmButton: false,
        });
      } else {
        console.log(data.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "İlanın aktifleştirme işlemi başarısız.",
          html: `${data.message}`,
          showConfirmButton: false,
        });
      }
    } 
  });
};

const closeModal = () => {
  dopingModalVisibility.value = false; //samiye danışılacak başka bir yöntemi olabilir -furkan
};

const postLimit = computed(() =>
  route.query.postPerPage ? route.query.postPerPage : advertCountInPage.value
);

const toogleLoading = () => {
  loading.value = !loading.value;
};

const searchAdvert = (e) => debounce(async () => {
    posts.value = (await searchPosts(searchValue.value)) || [];
    if (posts.value) {
      postCount.value = posts.value.totalRow;
      posts.value = posts.value.datas;
    } else {
      postCount.value = posts.value.length;
    }
  }, 300);

const selectAdvert = (id) => {
  if (selectedAdverts.value.includes(id)) {
    selectedAdverts.value = selectedAdverts.value.filter(
      (listId) => listId != id
    );
  } else {
    selectedAdverts.value.push(id);
  }
};
const onChangeCategory = (value) => {
  toogleLoading();
  posts.value = [];
  noAdvertAlert.value = false;
  categoryActive.value = value;
};

const unPublish = async () => {
  const data = await unPublishPosts(selectedAdverts.value);
  if (data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `İlanınız başarıyla yayından kaldırıldı.`,
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "İşlem Başarısız",
      html: `${data.message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
const moveUp = async () => {
  const data = await unPublishPosts(selectedAdverts.value);
  if (data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `İlanınız başarıyla yukarı taşınmıştır.`,
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "İşlem Başarısız",
      html: `${data.message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
const increaseTime = async () => {
  const data = await extendPosts(
    selectedAdvertModalID.value,
    increaseTimeValue.value
  );

  if (data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `İşlem Başarılı`,
      html: `İlan süreniz ${increaseTimeValue.value} gün arttırıldı.`,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "İşlem Başarısız",
      html: `${data.message}`,
      showConfirmButton: false,
    });
  }
};
const getUserResulation = () => {
  userResulation.value = window.innerWidth;

  if (userResulation.value > 2800) {
    advertCountInPage.value = 50;
  } else if (userResulation.value >= 2600) {
    advertCountInPage.value = 45;
  } else if (userResulation.value >= 2350) {
    advertCountInPage.value = 40;
  } else if (userResulation.value >= 2100) {
    advertCountInPage.value = 35;
  } else if (userResulation.value >= 1800) {
    advertCountInPage.value = 30;
  } else if (userResulation.value >= 1550) {
    advertCountInPage.value = 25;
  } else if (userResulation.value >= 1300) {
    advertCountInPage.value = 16;
  } else if (userResulation.value >= 780) {
    advertCountInPage.value = 12;
  } else {
    advertCountInPage.value = 10;
  }
};

const getPostsAsync = async (state = "active", order, pageNumber) => {
  posts.value = await getPosts(
    state,
    order,
    pageNumber,
    advertCountInPage.value
  );
  postCount.value = posts.value.totalRow;
  if (posts.value.datas.length > 0) {
    loading.value = false;
    noAdvertAlert.value = false;
  } else {
    loading.value = false;
    noAdvertAlert.value = true;
  }
  posts.value = posts.value.datas;
};

const changeSorting = (e) => {
  toogleLoading();
  posts.value = [];
  router.push({ path: route.path, query: { ...route.query, sorting: e } });
  sorting.value = e;
  getPostsAsync(state.value, e);
};
const changeState = async (id) => {
  router.push({ path: route.path, query: { ...route.query, state: id } });

  state.value = id;

  getPostsAsync(id, sorting.value);
};

const handlePageCount = (pageNumber) => {
  toogleLoading();
  posts.value = [];
  router.push({
    path: route.path,
    query: { ...route.query, page: pageNumber },
  });

  getPostsAsync(state.value, sorting.value, pageNumber);
};
const handlePostInPageCount = (postPerPage) => {
  postLimit.value = postPerPage;
  router.push({
    path: route.path,
    query: { ...route.query, postPerPage: postPerPage },
  });
};
const getPostsWithQuery = () => {
  getPostsAsync(route.query.state, route.query.sorting, route.query.page);
};
const checkCategoryActive = () => {
  if (route.query.state) {
    categoryActive.value = route.query.state;
  } else {
  }
};
const setIncreaseTimeDefaultValue = () => {
  increaseTimeValue.value = increaseTimeOptions.value[0].id;
};
onMounted(() => {
  getUserResulation();
  getPostsWithQuery();
  checkCategoryActive();
  setIncreaseTimeDefaultValue();
});
</script>
<style lang="scss" >
.increaseTimeModal {
  .ant-select {
    width: 100% !important;
    margin-left: 10px !important;
  }
}
</style>
<style lang='scss' scoped>
@import "@/config/global.scss";

.skeleton {
  display: flex;
}
.noAdvertAlertWrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 5%;
}
.blur-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  z-index: 998;
}

.project-sort-bar {
  padding: 0 12px;
}

.ant-row:nth-child(1) {
  position: relative;
  padding: 0 20px;

  .dopingModal {
    position: fixed;
    top: 0;
    bottom: 15px;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 1038px;
    background-color: #fff;
    top: 8%;
    left: 50vw;
    transform: translateX(-50%);
    z-index: 999;
    border-radius: 5px;
  }

  @media (max-width: $sm) {
    .dopingModal {
      width: 100vw;
    }
  }
  @media (max-width: $lg) {
    .dopingModal {
      width: 85vw;
    }
  }
}
.increaseTimeModal {
  .ant-select-lg {
    widows: 100%;
  }
  button {
    margin: 0 0px 0 10px;
    transform: translateY(5px);
  }
}
.selectedAmount {
  position: absolute;
  left: 15%;
  top: 25%;
}

.selectedMenu {
  margin-top: 50%;
  transform: translateY(-10%);
  margin-left: 15px;
  height: 100px;
  position: relative;

  .ant-select-show-arrow {
    width: 200px;
  }

  button {
    position: absolute;
    left: 105%;
    top: 0;
  }
}

.pagination {
  position: absolute;
  right: 1%;
  transform: translateY(-380%);
}

@media (max-width: $sm) {
  .pagination {
    position: absolute;
    right: 30%;
    transform: translateY(-200%);
  }
}
</style>
