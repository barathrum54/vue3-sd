<template>
  <a-row :gutter="25">
    <a-col :xs="24">
      <ProjectList>
        <div class="table-responsive">
          <a-table
            :pagination="true"
            :dataSource="dataSource"
            :columns="columns"
          />
        </div>
      </ProjectList>
    </a-col>
  </a-row>
</template>
<script setup >

import { computed, ref, onMounted } from "vue";
import {
  ProjectPagination,
  ProjectListTitle,
  ProjectListAssignees,
  ProjectList,
} from "./style";
import { getSupportListServices } from "@/services/support/supportServices.js";

const columns = [
  {
    title: "Talep No",
    dataIndex: "project",
    key: "project",
    width: "10%",
  },
  {
    title: "Talep Başlığı",
    dataIndex: "startDate",
    key: "startDate",
    width: "30%",
  },
  {
    title: "Kategori",
    dataIndex: "status",
    key: "status",
    width: "15%",
  },
  {
    title: "Son Güncelleme",
    dataIndex: "deadline",
    key: "deadline",
    width: "20%",
  },
  {
    title: "Durum",
    dataIndex: "assigned",
    key: "assigned",
    width: "15%",
  },

  {
    title: "İşlem",
    dataIndex: "completion",
    key: "completion",
    width: "10%",
    className: "islem",
  },
];


const listData = ref([]);

const onShowSizeChange = (c, p) => {
  current.value = c;
  pageSize.value = p;
};


onMounted(() => {
  getAllList();
});

const getAllList = async () => {
  const response = await getSupportListServices();
  listData.value = response.data.datas;
};

const stateClass = (state) => {
  if (state == 1) return "state state-pending";
  else if (state == 2) return "state state-done";
  else if (state == 3) return "state state-closed";
};

const dataSource = computed(
  () =>
    listData.value.length &&
    listData.value.map((value) => {
      const { Id, Title, Name, State, StateText, Datetime } = value;
      return {
        key: Id,
        project: <ProjectListTitle>{Id}</ProjectListTitle>,
        startDate: <p class="support-title">{Title}</p>,
        deadline: <span>{Datetime}</span>,
        assigned: <p class={stateClass(State)}>{StateText}</p>,
        status: Name,
        completion: (
          <div class="project-list-progress">
            <router-link to={`/supports/detail/${Id}`}>
              <sdButton
                transparented
                type="primary"
                block="block"
                style="margin-bottom:8px; transform: translateY(4px);"
              >
                Talebi Görüntüle
              </sdButton>
            </router-link>
          </div>
        ),
      };
    })
);
</script>
<style lang="scss">
th.islem,
td.islem {
  text-align: center !important;
}
.state-closed {
  background-color: #FF4D4F;
}
.state-pending {
  background-color: #FFB24D;
}
.state-done {
  background-color: #4DA6FF;
}
.state {
  display: inline;
  padding: 5px 10px;
  color: white;
  border-radius: 13px;
  transform: translateY(6px);
}

.support-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 300px;
  transform: translateY(6px);
}
</style>