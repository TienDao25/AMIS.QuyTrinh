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
    :noDataText="Resource.NoData"
    :wordWrapEnabled="true"
    @rowDblClick="onDbClickRow"
    css-class="css-header"
    :onCellHoverChanged="onCellHoverChanged"
    :column-resizing-mode="'widget'"
    :onCellClick="onCellClick"
  >
    <DxPager :enabled="false" />
    <DxPaging :enabled="true" :page-size="100" />
    <!-- @row-click="onClickRow" -->
    <!-- <DxScrolling column-rendering-mode="virtual" mode="infinite" /> -->

    <!-- :selection="{ mode: 'single' }" -->
    <DxColumn
      v-for="(item, index) in columns"
      :key="index"
      :data-field="item.field"
      :data-type="item.type"
      :caption="item.caption"
      :wordWrapEnabled="true"
      :cellHintEnabled="false"
      :cell-template="item.cellTemplate"
      :allow-fixing="true"
      :min-width="item.minWidth"
      :width="item.width"
      :allow-sorting="false"
    />
    <!-- -->
    <!-- :min-width="item.minWidth" -->

    <!-- <DxColumn type="buttons" :width="110">
          <DxButton text="sửa" icon="icon-copy" @click="onClickBtnEdit" />
          <DxButton text="xóa" @click="onClickBtnDelete" />
          <DxButton text="nhân bản" @click="onClickBtnDulicate" />
        </DxColumn> -->
    <DxColumn
      :allow-sorting="false"
      cell-template="cellButton"
      :min-width="140"
      alignment="left"
      :allow-resizing="false"
      css-class="row-action"
      :fixed="fixedColumn"
      fixed-position="right"
      :showBorders="false"
    />
    <!-- :fixed="true"
      fixed-position="right" -->
    <template #cellButton="{ data }">
      <div
        class="flex justify-flexend m-x-8 template-cell"
        style="width: max-content !important; height: 100%"
        v-show="isShowButtons == data.rowIndex"
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
          v-show="data.data.RoleStatus != Enum.Role.RoleStatus.Deleted"
          :classIcon="'icon-delete-custom'"
          :titleIcon="'Xóa'"
          @click.stop="onClickBtnDelete(data)"
        />
      </div>
    </template>
    <template #RoleStatus="{ data }">
      <div
        v-if="data.value == Enum.Role.RoleStatus.Active"
        style="color: rgb(102, 209, 129)"
        :title="formatStatus(data.value)"
      >
        {{ formatStatus(data.value) }}
      </div>
      <div v-else style="color: red" :title="formatStatus(data.value)">
        {{ formatStatus(data.value) }}
      </div>
      <!-- <div>{{ formatStatus(data.value) }}</div> -->
    </template>
    <template #Date="{ data }">
      <div
        :title="formatString(formatDate(data.value))"
        style="text-align: center"
      >
        {{ formatString(formatDate(data.value)) }}
      </div>
    </template>
    <template #Text="{ data }">
      <div :title="formatString(data.value)">
        {{ formatString(data.value) }}
      </div>
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

import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource";

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

    //trạng thái fixed của column
    fixedColumn: Boolean,
  },
  created() {},
  computed: {},
  methods: {
    /**
     * Sự kiện click nút sửa
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
    onClickBtnEdit(e) {
      try {
        this.$emit("onClickBtnEdit", e.row.data);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện click nút nhân bản
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDulicate(e) {
      try {
        this.isShowButtons = -1;
        this.$emit("onClickBtnDulicate", e.row.data);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện click nút xóa
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDelete(e) {
      try {
        this.isShowButtons = -1;
        this.$emit("onClickBtnDelete", e.row.data);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện db click vào hàng
     * @param {*} e
     * Author: TienDao (26/12/2022)
     */
    onDbClickRow(e) {
      try {
        this.isShowButtons = -1;
        this.$emit("onClickBtnEdit", e.data);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Format trạng thái
     * Author: TienDao (26/12/2022)
     */
    formatStatus(status) {
      try {
        switch (status) {
          case Enum.Role.RoleStatus.Active:
            return Resource.Status.Role.Active;
          case Enum.Role.RoleStatus.Deleted:
            return Resource.Status.Role.Deleted;
          default:
            return Resource.StringEmptyOrNull;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Format ngày tháng
     * Author: TienDao (26/12/2022)
     */
    formatDate(date) {
      try {
        if (date) {
          date = new Date(date);
          return (
            ("00" + date.getDate()).slice(-2) +
            "/" +
            ("00" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            date.getFullYear()
            //  +
            // " " +
            // ("00" + date.getHours()).slice(-2) +
            // ":" +
            // ("00" + date.getMinutes()).slice(-2) +
            // ":" +
            // ("00" + date.getSeconds()).slice(-2)
          );
        } else {
          return "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Format chuỗi
     * Author: TienDao (26/12/2022)
     */
    formatString(string) {
      try {
        return string ? string : Resource.StringEmptyOrNull;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hover vào hàng
     * Author: TienDao (30/12/2022)
     */
    onCellHoverChanged(data) {
      try {
        if (data.eventType == "mouseover") {
          this.isShowButtons = data.rowIndex;
        } else {
          this.isShowButtons = -1;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Click hàng
     * Author: TienDao (30/12/2022)
     */
    onSelectionChanged() {
      try {
        this.isShowButtons = -1;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Click cột
     * Author: TienDao (09/01/2023)
     */
    onCellClick(e) {
      if (e.rowType == "header" && e.columnIndex < this.columns.length) {
        console.log(e);
        console.log(this.columns[e.columnIndex].field);
        this.$emit("onClickHeaderTable",this.columns[e.columnIndex].field);
      }
    },
  },
  data() {
    return {
      Enum,
      Resource,
      columns: [
        {
          field: "RoleName",
          width: 200,
          caption: Resource.Entity.Role.RoleName,
          type: "text",
          minWidth: 100,
          cellTemplate: "Text",
        },
        {
          field: "RoleDescription",
          width: 200,
          caption: Resource.Entity.Role.RoleDescription,
          type: "text",
          minWidth: 100,
          cellTemplate: "Text",
        },
        {
          field: "RoleStatus",
          width: 150,
          caption: Resource.Entity.Role.RoleStatus,
          type: "text",
          minWidth: 100,
          cellTemplate: "RoleStatus",
        },
        {
          field: "CreatedDate",
          width: 130,
          caption: Resource.Entity.Base.CreatedDate,
          type: "date",
          minWidth: 100,
          cellTemplate: "Date",
        },
        {
          field: "CreatedBy",
          width: 150,
          caption: Resource.Entity.Base.CreatedBy,
          type: "text",
          minWidth: 100,
          cellTemplate: "Text",
        },
        {
          field: "ModifiedDate",
          width: 200,
          caption: Resource.Entity.Base.ModifiedDate,
          type: "date",
          minWidth: 100,
          cellTemplate: "Date",
        },
        {
          field: "ModifiedBy",
          width: 200,
          caption: Resource.Entity.Base.ModifiedBy,
          type: "text",
          minWidth: 100,
          cellTemplate: "Text",
        },
      ],
      isShowButtons: -1,
    };
  },
};
</script>

<style>
@import url(@/css/base.css);

/* .row-action {
  padding-right: 8px;
  z-index: 2;
} */
.dx-pointer-events-none.dx-first-cell {
  border-right: none !important;
}
.dx-datagrid-nodata {
  width: 155px !important;
  background: url(@/assets/img/EmptyRC1.3c8bf4c8.svg) -692px 16px no-repeat !important;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 200px;
}
.grid-container .dx-datagrid-nodata {
  color: #999;
  font-size: 15px;
  white-space: nowrap;
}
#dataGrid td {
  text-align: left;
  /* min-width: 80px; */
  /* max-width: 250px; */
  /* width: 250px; */
  position: relative;
}

.dx-data-row.dx-state-hover > td {
  cursor: pointer;
  background-color: #dbf4ff !important;
}

.dx-selection > td {
  cursor: pointer;
  background-color: #dbf4ff !important;
}

.dx-datagrid-headers {
  border-bottom: none;
}

.dx-datagrid .dx-row > td,
.dx-datagrid .dx-row > tr > td {
  max-height: 48px !important;
  height: 48px !important;
}

.grid-container .dx-datagrid .dx-row > td {
  padding: 0 16px;
  height: 48px !important;
  max-height: 48px !important;
  vertical-align: middle !important;
}

.dx-datagrid-text-content.dx-text-content-alignment-left {
  font-weight: 700;
  color: #000 !important;
}

.grid-container .dx-datagrid .dx-row-lines > td {
  border-bottom: 1px solid var(--border-color) !important;
}

.grid-container .dx-datagrid-headers .dx-row.dx-header-row {
  background-color: #fff !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

.grid-container
  .dx-datagrid-headers
  .dx-datagrid-table
  .dx-row
  > td:not(:last-child, :first-child) {
  border-bottom: none;
  border-left: 1px solid #e2e8f0;
}

.grid-container .dx-scrollable-simulated {
  overflow: auto !important;
}

/* .dx-datagrid-headers .dx-row.dx-data-row.dx-row-lines>td>.dx-template-wrapper {
  white-space: none !important;
  overflow: hidden !important;
  text-overflow: none !important;
} */
.dx-datagrid-rowsview .dx-row.dx-data-row.dx-row-lines > td > * {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.dx-datagrid-headers .dx-datagrid-content {
  margin-bottom: -1px !important;
}

.grid-container .dx-datagrid-headers .dx-datagrid-table .dx-row > td {
  border-bottom: none !important;
}

.grid-container .dx-datagrid-headers .dx-datagrid-table .dx-row > td {
  position: relative !important;
}

.grid-container
  .dx-datagrid-headers
  .dx-datagrid-table
  .dx-row
  > *:not(:first-child, :last-child):before {
  content: "" !important;
  position: absolute !important;
  top: 30% !important;
  left: 0px !important;
  background-color: #e2e8f0 !important;
  width: 1px !important;
  height: 20px !important;
}

.grid-container
  .dx-datagrid-content
  .dx-datagrid-table
  .dx-row
  > td:first-child,
.grid-container
  .dx-datagrid-content
  .dx-datagrid-table
  .dx-row
  > tr
  > td:first-child,
.grid-container .dx-datagrid .dx-datagrid-headers .dx-header-row > td {
  border-left: none !important;
}
.dx-datagrid-text-content{
    font-weight: 700;
    letter-spacing: .14px;
    color: #171b2a;
}
</style>