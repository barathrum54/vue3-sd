<template>
  <Style
    class="table-responsive"
    :rowSelection="rowSelection"
    :pagination="false"
    :columns="columns"
    :scroll="{ x: 100 }"
    :dataSource="data"
    :customRow="notificationDetail"
    @change="handleChange"
  />
</template>
<script>
import moment from "moment";
import { Style, EmailAuthor, EmailHeader } from "./style";
import Topbar from "./Topbar";
import { useRouter } from 'vue-router';
import VueTypes from "vue-types";
import { computed, ref, toRefs, onMounted, inject } from "vue";
import {
  getUnReadNotificationsServices,
  deleteNotification,
  getUnReadNotificationsCount,
} from "@/services/notifications/shopsNotifications.service";
import { message } from "ant-design-vue";

const Content = {
  name: "Content",
  components: { Style, EmailAuthor, EmailHeader, Topbar },
  props: {
    searchData: VueTypes.arrayOf(VueTypes.object).isRequired,
    email: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
  setup(props) {
    const pagination = inject("pagination");
    const refreshPagination = inject("refreshPagination");
    const router = useRouter();

    const getUnReadNotifications = async (params = pagination.value) => {
      const response = await getUnReadNotificationsServices(params);
      notificationData.value = response;
      if (params.prev) {
        pagination.value.page--;
      } else pagination.value.page++;
      pagination.value.isNext = response.length >= pagination.value.limit;
    };
    const getRefreshUnreadNotifications = async () => {
      const response = await getUnReadNotificationsServices({
        ...pagination.value,
        page: pagination.value.page - 1,
      });
      notificationData.value = response;
      selectedRowKeys.value = [];
    };
    const getCount = async () => {
      const response = await getUnReadNotificationsCount();
      pagination.value.totalCount = response;
    };
    onMounted(() => {
      refreshPagination();
      getUnReadNotifications();
      getCount();
    });
    const notificationData = ref([]);

    const { email, searchData } = toRefs(props);
    const emails = computed(() => email.value);

    const selectedRowKeys = ref([]);
    const notData = ref(searchData);
    const sort = ref(false);
    const sortedInfo = ref([]);

    const refreshState = (e) => {
      getRefreshUnreadNotifications();
    };
    const notificationDetail = (record) => {
      return {
        onClick: (event) => {
          router.push(`/notifications/notification/${record.key}`);
        },
      };
    };

    const deleteNotifications = async () => {
      if (selectedRowKeys.value.length > 0) {
        for (const Id of [...selectedRowKeys.value]) {
          await deleteNotification({ Id });
        }
        if (selectedRowKeys.value.length < 2)
          message.success("Bildirim başarıyla silindi.");
        else message.success("Bildirimler başarıyla silindi.");
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
      if (pagination.value.isNext) {
        getUnReadNotifications();
      }
    };

    const prevPage = () => {
      console.log(pagination.value.page);
      if (pagination.value.page > 2) {
        getUnReadNotifications({
          ...pagination.value,
          page: pagination.value.page - 2,
          prev: true,
        });
      }
    };

    const columns = computed(() => [
      {
        title: (
          <Topbar
            refreshState={refreshState}
            isDisabled={isDisabled}
            deleteNotifications={deleteNotifications}
            cancelDeletedProcess={cancelDeletedProcess}
          />
        ),
        dataIndex: "name",
      } /*dataSource={searchData.value}*/,
      {
        title: (
          <div class="email-top-search">
            <sdAutoComplete placeholder="Filtrele" width="80%" patterns />
          </div>
        ),
        dataIndex: "content",
      },
      {
        title: (
          <>
            <div class="email-top-right d-flex align-items-center">
              <span class="page-number">
                {pagination.value.page - 1}. sayfa
              </span>
              <div class="pagination-slider">
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

    const data = computed(() =>
      notificationData.value.map((notification, key) => {
        const { id, message, datetime, image, sender, isDeletable, Name } =
          notification;
        return {
          key: id,
          name: (
            <EmailAuthor>
              <img src={image} alt="" />
              <sdHeading as="h5">
                <a>{sender}</a>
              </sdHeading>
            </EmailAuthor>
          ),
          content: (
            <EmailHeader>
              <sdHeading as="h5">
                
                  {Name}
                
              </sdHeading>
              <div class="ant-row">
                <div class="text-ellipsis ant-col-lg-12 ant-col-md-20 ant-col-sm-12">
                  {message}
                </div>
              </div>
            </EmailHeader>
          ),
          time: <span class="email-time">{datetime}</span>,
          deletable: isDeletable,
        };
      })
    );

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
      hideDefaultSelections: true,
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
      selectedRowKeys,
      notificationDetail,
      notData,
      emails,
      sort,
      refreshState,
      data,
      columns,
      handleChange,
      rowSelection,
      cancelDeletedProcess,
      deleteNotifications,
    };
  },
};

export default Content;
</script>
<style scoped>
.text-ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50px;
}
</style>