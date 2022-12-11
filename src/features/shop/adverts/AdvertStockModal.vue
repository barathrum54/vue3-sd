<template>
  <sdModal
    v-if="selectedStock"
    :visible="modalVisibility"
    :onCancel="handleModalVisiblity"
    class="advertStockModal"
    width="60%"
    :closable="false"
  >
    <template #head>
      <div class="title">
        <h4>İlan Stokları Düzenle</h4>
        <div class="searchAndMore">
          <sdButton
            type="danger"
            :disabled="selectedKeys.length > 0 ? false : true"
            @click="removeBatchStock(selectedKeys)"
          >
            Toplu Sil
          </sdButton>
          <sdAutoComplete
            placeholder="İlan Ara"
            v-if="selectedStock"
            :dataSource="searchStock"
            @keyup="searchAdvert"
            v-model:value="searchValue"
            patterns
            width="80%"
          />
          <sdDropdown placement="bottomLeft">
            <a><i class="bx bx-dots-horizontal-rounded bx-sm"></i></a>
            <template #overlay>
              <a-upload
                v-model:file-list="upload.fileList"
                name="file"
                :multiple="true"
                :beforeUpload="handleUploadStockAction"
                v-model:fileList="upload.fileList"
              >
                <a to="#">
                  <i class="bx bx-upload"></i>
                  <span>Txt veya Excel Olarak Yükle</span>
                </a>
              </a-upload>
              <a to="#" @click="exportStockToXlsx">
                <i class="bx bx-download"></i>
                <span>Excel Olarak İndir</span>
              </a>
              <a to="#" @click="exportStocksToTxt">
                <i class="bx bx-download"></i>
                <span>Txt Olarak İndir</span>
              </a>
              <a to="#">
                <i class="bx bx-trash-alt"></i>
                <span>Tüm Stokları Sil</span>
              </a>
              <a to="#">
                <i class="bx bx-search"></i>
                <span>Stoklarda Ara</span>
              </a>
            </template>
          </sdDropdown>
        </div>
      </div>
    </template>
    <a-row v-if="selectedStock">
      <a-col class="stock-left-side" :sm="24" :md="24" :lg="6" :xl="6">
        <AdvertCard
          :title="selectedStockAdvert.title"
          :id="selectedStockAdvert.id"
          :state="selectedStockAdvert.state"
          :description="selectedStockAdvert.description"
          :finishDateKalan="selectedStockAdvert.finishDateKalan"
          :price="selectedStockAdvert.price"
          :url="selectedStockAdvert.url"
          :boost="selectedStockAdvert.boost"
          :featured="selectedStockAdvert.featured"
          :categoryName="selectedStockAdvert.categoryName"
          :pinned="selectedStockAdvert.pinned"
          :socialpinned="selectedStockAdvert.socialPinned"
          :yukariTasi="selectedStockAdvert.yukariTasi"
          :yukariTasiDatetimeText="selectedStockAdvert.yukariTasiDatetimeText"
          :ilanKalanSaniye="selectedStockAdvert.finishKalanTime"
          :topDescription="true"
        >
          <template #top-description
            >Bu ilanınıza ait stoklarda düzenleme işlemi yapıyorsunuz.
          </template>
        </AdvertCard>
      </a-col>
      <a-col class="stock-right-side" :sm="24" :md="24" :lg="18" :xl="18">
        <a-upload-dragger
          class="is-upload only-drag"
          name="file"
          :multiple="true"
          :beforeUpload="handleUploadStockAction"
          v-model:fileList="upload.fileList"
          :openFileDialogOnClick="false"
        >
          <a-table
            class="stockTable"
            :columns="columns"
            :data-source="data"
            :pagination="false"
            :row-selection="rowSelection"
            :scroll="{ y: 500 }"
          >
            <template #operation="{ record }"
              ><i @click="removeStock(record)" class="bx bx-trash"></i>
            </template>
          </a-table>
        </a-upload-dragger>
      </a-col>
    </a-row>
  </sdModal>
</template>

<script setup>
import { ref, computed, inject, watch, defineAsyncComponent } from "vue";
import { removeStocks } from "@/services/shop/adverts/adverts.service";
import { CloudDownloadOutlined, CalendarTwoTone } from "@ant-design/icons-vue";
import Swal from "sweetalert2";
import HeaderSearch from "@/components/springDash/header-search/HeaderSearch";
import {
  readTxtAndConvertToArray,
  readBlobAsXlsx,
  saveToXlsx,
  saveToTxt,
} from "@/utility/import/import.helper";
const AdvertCard = defineAsyncComponent(() =>
  import("@/components/IS/shop/adverts/AdvertCard")
);
const props = defineProps({
  selectedStockAdvert: Object,
  selectedStocks: Array,
});

const debounce = inject("debounce");
const useUniqueId = inject("useUniqueId");

const removedStock = ref();
const searchValue = ref("");
const data = ref([]);
const upload = ref({
  fileList: [],
});

const exportStockToXlsx = () => {
  const input = data.value.map((stock) => ({
    stock: stock.stockData,
  }));
  saveToXlsx(
    input,
    props.selectedStockAdvert.title.replaceAll(" ", "-") + "_stocks"
  );
};

const exportStocksToTxt = () => {
  const input = data.value.map((stock) => stock.stockData);
  saveToTxt(
    input,
    props.selectedStockAdvert.title.replaceAll(" ", "-") + "_stocks"
  );
};
const selectedKeys = ref([]);
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    selectedKeys.value = selectedRowKeys;
    console.log(selectedKeys.value);
  },
  onSelect: (record, selected, selectedRows) => {},
  onSelectAll: (selected, selectedRows, changeRows) => {
    // console.log(selected, selectedRows, changeRows);
  },
};
const handleUploadStockAction = async (file) => {
  if (!file) return false;
  const parsers = {
    "text/plain": uploadStockForTxt,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      uploadStockForXlsx,
  };
  if (!parsers[file.type] || typeof parsers[file.type] !== "function") {
    Swal.fire({
      html: "Yükleyeceğiniz dosya .txt veya .xlsx formatında olmalıdır. Lütfen dosya tipinizi kontrol ediniz.",
      icon,
    });
    return;
  }
  await parsers[file.type](file);
  Swal.fire({
    title: "Başarılı",
    html: "Stoklar başarıyla yüklendi",
    icon: "success",
  });
  return false;
};

const uploadStockForTxt = async (file) => {
  const lines = await readTxtAndConvertToArray(file);
  if (!lines) return;
  lines.forEach((line) => {
    addStockFromFile(line);
  });
};

const uploadStockForXlsx = async (file) => {
  const pages = await readBlobAsXlsx(file);
  addStockFromXlsxPages(pages);
};

const addStockFromXlsxPages = (pages) => {
  pages.forEach((rows) => {
    rows.forEach((line) => {
      if (!!line.Stock || !!line.stock) {
        addStockFromFile(
          JSON.stringify(line.Stock || line.stock).replaceAll(`\"`, "")
        );
        return;
      }
      if (
        (!!line.password || !!line.Password) &&
        (!!line.username || !!line.Username)
      ) {
        addStockFromFile(
          `${line.username || line.Username}:${line.password || line.Password}`
        );
      }
    });
  });
};

const addStockFromFile = (content) => {
  data.value.push({
    key: useUniqueId(),
    stockData: content,
  });
};

const removeStock = (record) => {
  Swal.fire({
    title: "Stoktan Ürün Silme İşlemi",
    html:
      `Stoğunuzdan <b>${record.key}</b> numaralı  </br> <b>${record.stockData}</b> içerikli stok silinecektir. </br>` +
      "",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "İşlemi Onayla",
    cancelButtonText: "İşlemi İptal Et",
    cancelButtonColor: "#F37E7E",
    confirmButtonColor: "#3FC3EE",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const data = await removeStocks(props.selectedStockAdvert.id, record.key);
      console.log(data);
      if (data.success) {
        Swal.fire(
          "Silme İşlemi Başarılı",
          `Stoğunuzdan <b>${record.key}</b> numaralı  </br> <b>${record.stockData}</b> içerikli stok başarıyla silinmiştir. </br>`,
          "success"
        );
      } else {
        Swal.fire(
          "Silme İşlemi Başarısız",
          `<b>Oops Bir şeyler yanlış gitti. </b> </br>`,
          "error"
        );
      }
    }
  });
};
const removeBatchStock = (keys) => {
  Swal.fire({
    title: "Stoktan Ürün Silme İşlemi",
    html:
      `Aşağıdaki stoklar </b> silinecektir. </br>` +
      '<table style="overflow-y:"auto>' +
      "<tr>" +
      "<th>Stok Key</th>" +
      "</tr>" +
      `${keys.map((key) => {
        console.log(key);
        return `<tr><td> <b> ${key} </b></td></tr>`;
      })}` +
      "</table>",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "İşlemi Onayla",
    cancelButtonText: "İşlemi İptal Et",
    cancelButtonColor: "#F37E7E",
    confirmButtonColor: "#3FC3EE",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const data = await removeStocks(props.selectedStockAdvert.id, keys);
      if (data.success) {
        Swal.fire({
          title: "Silme İşlemi Başarılı",
          html:
            `Aşağıdaki stoklar başarıyla silinmiştir. </br>` +
            '<table style="overflow-y:"auto>' +
            "<tr>" +
            "<th>Stok Key</th>" +
            "</tr>" +
            `${keys.map((key) => {
              console.log(key);
              return `<tr><td> <b> ${key} </b> </td></tr>`;
            })}` +
            "</table>",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Silme İşlemi Başarısız",
          html: `Toplu stok silme işlemi başarısız`,
          icon: "error",
        });
      }
    }
  });
};
const searchStock = ref([]);
const searchData = ref([]);
const modalVisibility = ref(false);
watch(
  () => props.selectedStocks,
  () => {
    searchStock.value = [];
    searchValue.value = "";
    console.log(props.selectedStocks);
    data.value = [];
    searchData.value = [];
    if (props.selectedStockAdvert) {
      console.log(props.selectedStocks);
      props.selectedStocks.forEach((stock) => {
        data.value.push({
          key: stock.Id,
          stockData: stock.Value,
        });
        searchData.value.push({
          key: stock.Id,
          stockData: stock.Value,
        });
      });
      modalVisibility.value = true;
    }
    if (props.selectedStockAdvert) {
      props.selectedStocks.forEach((stock) => {
        searchStock.value.push({
          key: stock.Id,
          Title: stock.Value,
        });
      });
    }
  }
);
const selectedStock = computed(() => {
  return props.selectedStockAdvert;
});
const handleModalVisiblity = () => {
  modalVisibility.value = !modalVisibility.value;
};
const columns = [
  {
    title: "Stok İçeriği",
    dataIndex: "stockData",
    key: "stockData",
    width: "80%",
  },
  {
    title: "İşlem",
    dataIndex: "operation",
    slots: { customRender: "operation" },
  },
];

const searchAdvert = (e) =>
  debounce(() => {
    data.value = [];
    console.log(searchData.value);
    data.value = searchData.value.filter((dataItem) => {
      return dataItem.stockData
        .toLocaleLowerCase()
        .includes(searchValue.value.toLocaleLowerCase());
    });
  }, 300);
</script>
<style lang="scss" scoped>
@import "@/config/global.scss";
@import "@/config/styles/global.scss";

@media (max-width: $sm) {
  .advertStockModal {
    width: 100% !important;
  }
}

@media (max-width: $md) {
  .advertStockModal {
    width: 100% !important;
  }
}

@media (max-width: $lg) {
  .advertStockModal {
    width: 90% !important;
  }
}
.swal2-html-container {
  height: 40vh !important;
}
</style>
<style lang="scss" scoped>
.searchAndMore {
  display: flex;
  align-items: center;
}

.title {
  display: flex;
  justify-content: space-between;
}

.stockTable {
  height: 100%;
}

.stock-left-side {
  padding: 10px;
  background-color: #fbfbfb;
  border-radius: 5px;

  .doping-alert {
    background-color: rgba(250, 139, 12, 0.2);
    color: rgba(250, 139, 12, 1);
    padding: 7px 15px;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    width: 100%;
  }

  .ant-col {
    padding: 0 !important;
  }

  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    row-gap: 12px !important;
  }

  .title {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    max-width: 100%;

    span {
      max-width: 100%;
      height: 36px;
      font-size: 14px;
      line-height: 1.1rem;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 12px;
    }

    h3 {
      margin-bottom: 10px;
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
    display: flex;
    justify-content: center; //fotoğraf 50% için  -furkan
    img {
      object-fit: contain;
      max-width: 90%;
      height: 215px;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .eHvyVL {
    // ant-card
    padding: 20px !important;
  }

  .button-space-around {
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .ant-row {
    width: 100% !important;
  }

  button {
    width: 100% !important;
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

  .image-desc {
    position: absolute;
    top: 0;
    left: 50%;
    margin-top: 10px;

    transform: translateX(-50%);
    max-width: 180px;
    white-space: nowrap;

    color: #fff !important;
    font-weight: 600;
    border-radius: 5px;

    .image-desc-blur-container {
      .image-desc-blur {
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
        border-radius: 5px;
        width: 180px;
        height: 30px;
        text-align: center;
      }
    }

    span {
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      color: white;
      height: 30px;
      width: 100%;
      text-align: center;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .upload-container {
    display: flex;

    .upload {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      border-radius: 3px;
      width: 32px;
      height: 27px;
    }

    .upload.PinnedShowCase {
      background-color: #cde4ec;
      color: #487484;
    }

    .upload.FeaturedShowCase {
      background-color: #ece4cd;
      color: #846a48;
    }

    .upload.SocialShowCase {
      background-color: #cdecd2;
      color: #488450;
    }

    .upload.BoostShowCase {
      background-color: #d2cdec;
      color: #624884;
    }
  }

  .project-timing {
    text-align: center;
    margin-top: 5px;
    position: relative;

    .timer-desc {
      display: none;
      top: -50px;
      left: -30px;
      position: absolute;
      background-color: #191919;
      height: 35px;
      color: #fff;
      font-size: 0.85em;
      border-radius: 4px;
      padding: 5px 10px;
      width: 196px;
      font-weight: 400;

      .triangle {
        position: absolute;
        width: 0;
        height: 0;
        left: 50%;
        transform: translateX(-50%);
        bottom: -15px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 20px solid #191919;
      }
    }

    .timer {
      width: 100%;
      padding: 2px;
      border-radius: 3px;
      margin-bottom: 15px;
      height: 26px;

      span:nth-child(2) {
        margin-left: 10px;

        &:hover {
          .timer-desc {
            display: inline-block;
          }
        }
      }
    }

    .timer.danger {
      background: #f5e0e0;
      color: #923a3a;
    }

    .price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 1.2em;
      margin-bottom: 10px;
      font-size: 1rem;

      span {
        font-weight: 400;
        font-size: 0.8rem;
      }
    }
  }
}

.stock-right-side {
  .bx-trash {
    padding: 5px;
    background-color: #fff;
    color: #f25f5f;
    border: 1px solid #f25f5f;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 400;
    font-size: 1.2rem;

    &:hover {
      background-color: #f25f5f;
      color: #fff;
    }
  }
}
</style>