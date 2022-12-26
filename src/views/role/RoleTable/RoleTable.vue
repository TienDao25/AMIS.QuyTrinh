<template>
  <!-- <div style="height: calc(100% - 60px - 40px);"> -->
  <DxDataGrid
    id="dataGrid"
    height="100%"
    :data-source="listRole"
    key-expr="RoleID"
    :allow-column-resizing="true"
    :show-column-lines="false"
    :show-row-lines="true"
    :show-borders="false"
    @selection-changed="onSelectionChanged"
    :hover-state-enabled="true"
    alignment="center"
    :noDataText="''"
    @rowDblClick="onDbClickRow"
  >
    <DxPager enabled="false" />
    <DxPaging enabled="false" :page-size="100" />
    <!-- @row-click="onClickRow" -->

    <!-- :selection="{ mode: 'single' }" -->
    <DxColumn
      v-for="(item, index) in columns"
      :key="index"
      :data-field="item.field"
      :data-type="item.type"
      :caption="item.caption"
      :width="item.width"
      :format="customizeText"
      :cell-template="item.cellTemplate"
    />
    <!-- <template #toolTip="{ data }">
      <div :title="data">{{ data.row.data }}</div>
      </template -->
    >
    <!-- :min-width="item.minWidth" -->

    <!-- <DxColumn type="buttons" :width="110">
          <DxButton text="sửa" icon="icon-copy" @click="onClickBtnEdit" />
          <DxButton text="xóa" @click="onClickBtnDelete" />
          <DxButton text="nhân bản" @click="onClickBtnDulicate" />
        </DxColumn> -->
    <DxColumn
      :allow-sorting="false"
      cell-template="cellButton"
      :min-width="136"
      :width="'auto'"
      alignment="left"
      :allow-resizing="false"
    />
    <template #cellButton="{ data }">
      <div
        class="flex justify-flexend m-x-8"
        style="width: max-content !important; height: 100%"
        v-show="isShowButtons"
      >
        <MsButtonIconVue
          :classIcon="'icon-copy'"
          :titleIcon="'Nhân bản'"
          @click.stop="onClickBtnDulicate(data)"
        />
        <MsButtonIconVue
          :classIcon="'mi-pencil'"
          :titleIcon="'Sửa'"
          @click.stop="onClickBtnEdit(data)"
        />
        <MsButtonIconVue
          :classIcon="'icon-delete-custom'"
          :titleIcon="'Xóa'"
          @click.stop="onClickBtnDelete(data)"
        />
      </div>
    </template>
    <template #RoleStatus="{ data }">
      <div
        v-if="data.value == ENUM.ROLE.ROLE_STATUS.Active"
        style="color: green; font-weight: bold"
      >
        {{ formatStatus(data.value) }}
      </div>
      <div v-else style="color: red; font-weight: bold">
        {{ formatStatus(data.value) }}
      </div>
      <!-- <div>{{ formatStatus(data.value) }}</div> -->
    </template>
    <template #Date="{ data }">
      <div>{{ formatString(formatDate(data.value)) }}</div>
    </template>
    <template #Text="{ data }">
      <div>{{ formatString(data.value) }}</div>
    </template>
  </DxDataGrid>
  <!-- <DxButton text="Click me" @click="sayHelloWorld" /> -->
</template>

<script>
// import DxButton from 'devextreme-vue/button';
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
  // DxButton
} from "devextreme-vue/data-grid";
import MsButtonIconVue from "@/components/base/MsButton/MsButtonIcon.vue";

import ENUM from "@/js/enum/enum";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    // DxButton,
    MsButtonIconVue,
    DxPager,
    DxPaging,
  },
  props: {
    //Danh sách vai trò
    listRole: Array,
  },
  created() {},
  methods: {

    /**
     * Sự kiện chọn hàng
     * @param {*} param0
     */
    onSelectionChanged({ selectedRowsData }) {
      console.log(selectedRowsData);
    },

    /**
     * Sự kiện click nút sửa
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
    onClickBtnEdit(e) {
      // console.log(e.row.data);
      this.$emit("onClickBtnEdit", e.row.data);
    },

    /**
     * Sự kiện click nút nhân bản
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDulicate(e) {
      // console.log(e.row.data);
      this.$emit("onClickBtnDulicate", e.row.data);
    },

    /**
     * Sự kiện click nút xóa
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDelete(e) {
      // console.log(e.row.data);
      this.$emit("onClickBtnDelete", e.row.data);
    },

    /**
     * Format/Check dữ liệu khi thêm vào bảng
     * Author: TienDao (26/12/2022)
     */
    customizeText(cellInfo) {
      console.log(cellInfo);
      return cellInfo.value;
    },
    // customizeText(cellInfo) {
    //   return cellInfo.value ? cellInfo.value : "_ _";
    // },

    /**
     * Sự kiện db click vào hàng
     * @param {*} e
     * Author: TienDao (26/12/2022)
     */
     onDbClickRow(e) {
      // console.log(e.data);
      this.$emit("onClickBtnEdit", e.data);
    },

    /**
     * Format trạng thái
     * Author: TienDao (26/12/2022)
     */
    formatStatus(status) {
      switch (status) {
        case ENUM.ROLE.ROLE_STATUS.Active:
          return "Đang hoạt động";
        case ENUM.ROLE.ROLE_STATUS.Deleted:
          return "Đã xóa";
        default:
          return "_ _";
      }
    },

    /**
     * Format ngày tháng
     * Author: TienDao (26/12/2022)
     */
    formatDate(date) {
      if (date) {
        date = new Date(date);
        return (
          (date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
          "/" +
          (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
          "/" +
          date.getFullYear()
        );
      }else{
        return ""
      }
    },

    /**
     * Format chuỗi
     * Author: TienDao (26/12/2022)
     */
     formatString(string){
      return string ? string : "_ _"
     }
  },
  data() {
    return {
      ENUM,
      columns: [
        {
          field: "RoleName",
          width: "200",
          caption: "Tên vai trò",
          type: "text",
          minWidth: "100",
          cellTemplate: "Text",
        },
        {
          field: "RoleDescribe",
          width: "300",
          caption: "Mô tả",
          type: "text",
          minWidth: "100",
          cellTemplate: "Text",
        },
        {
          field: "RoleStatus",
          width: "120",
          caption: "Trạng thái",
          type: "text",
          minWidth: "100",
          cellTemplate: "RoleStatus",
        },
        {
          field: "CreatedDate",
          width: "120",
          caption: "Ngày tạo",
          type: "date",
          minWidth: "100",
          cellTemplate: "Date",
        },
        {
          field: "CreatedBy",
          width: "120",
          caption: "Người tạo",
          type: "text",
          minWidth: "100",
          cellTemplate: "Text",
        },
        {
          field: "ModifiedDate",
          width: "120",
          caption: "Ngày sửa cuối cùng",
          type: "date",
          minWidth: "100",
          cellTemplate: "Date",
        },
        {
          field: "ModifiedBy",
          width: "120",
          caption: "Người sửa cuối cùng",
          type: "text",
          minWidth: "100",
          cellTemplate: "Text",
        },
      ],
      isShowButtons: true,
    };
  },
};
</script>

<style>
@import url(./RoleTable.css);
</style>