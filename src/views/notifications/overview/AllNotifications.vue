<template>
  <Style
    class="table-responsive"
    :rowSelection="rowSelection"
    :rowKey="(record) => record.key"
    :rowClassName="(record, index) => (record.seen == 1 ? '' : 'unread')"
    :pageData="true"
    :columns="columns"
    :scroll="{ x: 100 }"
    :dataSource="data"
    @change="handleChange"
    :loading="{ indicator: '<div><Spin /></div>', spinning: isLoading }"
  />
</template>
<script>
import { Style, EmailAuthor, EmailHeader } from "./style";
import Topbar from "./Topbar";
import SearchBar from "./SearchBar";
import VueTypes from "vue-types";
import { computed, ref, toRefs, onMounted, inject, provide } from "vue";
import {
  getAllNotificationsServices,
  deleteNotification,
  getAwaitingActionsNotificationsServices,
  getDebugNotifications,
} from "@/services/notifications/shopsNotifications.service";
import { Notification } from "ant-design-vue";

const Content = {
  name: "Content",
  components: { Style, EmailAuthor, EmailHeader, Topbar },
  emits: ["search"],
  props: {
    isLoading: Boolean,
    searchData: VueTypes.arrayOf(VueTypes.object),
    email: VueTypes.arrayOf(VueTypes.object),
  },
  setup(props) {
    const notificationData = inject("notificationData");
    const pageData = inject("pageData");
    const data = inject("dataSource");
    const isFiltering = inject("isFiltering");
    const isLastPage = inject("isLastPage");
    const pageChange = inject("pageChange");

    const rtl = ref(false);
    const { email, searchData, isLoading } = toRefs(props);
    const emails = computed(() => email.value);
    const _isLoading = computed(() => isLoading.value);
    const selectedRowKeys = ref([]);
    const notData = ref(searchData);
    const sort = ref(false);
    const sortedInfo = ref([]);
    onMounted(() => {
    });

    const refreshState = (e) => {
      pageChange();
    };
    const debugNotifications = async () => {
      const response = await getDebugNotifications();
      console.log(response);
    };
    const deleteNotifications = async () => {
      if (selectedRowKeys.value.length > 0) {
        for (const Id of [...selectedRowKeys.value]) {
          const response = await deleteNotification({ Id });
        }
        if (selectedRowKeys.value.length < 2) {
          Notification["success"]({
            message: "İşlem Başarılı",
            description: "Bildirim başarıyla silindi",
          });
          pageChange(true);
        } else {
          Notification["success"]({
            message: "İşlem Başarılı",
            description: "Bildirimler başarıyla silindi",
          });
          pageChange(true);
        }
      } else
        message.error("Lütfen işlem yapmak istediğiniz bildirimi seçiniz.");
    };
    const cancelDeletedProcess = () => {
      if (selectedRowKeys.value.length > 0) {
        message.info("Bildirim silme işlemi iptal edildi.");
        selectedRowKeys.value = [];
      }
    };
    const isDisabled = computed(() => {
      return selectedRowKeys.value.length > 0;
    });

    const nextPage = () => {
      const isLast = isLastPage();
      console.log(isLast);
      if (!isLast) {
        pageData.value.page++;
        pageChange();
      }
    };

    const prevPage = () => {
      if (pageData.value.page > 1) {
        pageData.value.page--;
        pageChange();
      }
    };

    const columns = computed(() => [
      {
        title: (
          <Topbar
            refreshState={refreshState}
            isDisabled={isDisabled}
            isDeleteDisabled={false}
            deleteNotifications={deleteNotifications}
            cancelDeletedProcess={cancelDeletedProcess}
          />
        ),
        dataIndex: "name",
      } /*dataSource={searchData.value}*/,
      {
        title: (
          <div class="email-top-search">
            <SearchBar />
          </div>
        ),
        dataIndex: "content",
      },
      {
        title:
          isFiltering() == true ? null : (
            <>
              <div class="email-top-right d-flex align-items-center">
                <span class="page-number">{pageData.value.page}. sayfa</span>
                <div class="pageData-slider">
                  <router-link onClick={prevPage} class="btn-paging" to="#">
                    <sdFeatherIcons type={"chevron-left"} size="14" />
                  </router-link>
                  <router-link onClick={nextPage} class="btn-paging" to="#">
                    <sdFeatherIcons type={"chevron-right"} size="14" />
                  </router-link>
                </div>
              </div>
            </>
          ),
        dataIndex: "time",
        key: "time",
      },
    ]);

    const handleChange = (_, __, sorter) => {
      sortedInfo.value = sorter;
    };

    const onRowSelection = (filterObj) => {
      const { filter, byValue } = filterObj;

      const newSelectedRowKeys = emails.value
        .filter((value) => {
          return value[filter] === byValue;
        })
        .map((item) => item.id);
      selectedRowKeys.value = newSelectedRowKeys;
    };

    const onSelectChange = (selectedRowKey) => {
      selectedRowKeys.value = selectedRowKey;
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      hideDefaultSelections: false,
      getCheckboxProps: (record) => ({
        disabled: !record.deletable,
      }),
      selections: {
        key: "all",
        text: "Hepsi",
        onSelect: () => {
          const newSelectedRowKeys = notification.map((item) => item.Id);
          selectedRowKeys.value = newSelectedRowKeys;
        },
      },
    };
    return {
      rtl,
      selectedRowKeys,
      notData,
      emails,
      sort,
      refreshState,
      columns,
      handleChange,
      rowSelection,
      cancelDeletedProcess,
      deleteNotifications,
      data,
    };
  },
};
export default Content;
</script>

<style scoped>
.inbox-row-message {
  z-index: 99;
}
</style>
