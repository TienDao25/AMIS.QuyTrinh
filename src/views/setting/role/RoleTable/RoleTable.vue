<template>
  <!-- <div style="height: calc(100% - 60px - 40px);"> -->
  <DxDataGrid
    id="dataGrid"
    height="100%"
    :data-source="listRole"
    key-expr="RoleID"
    :allow-column-resizing="false"
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
    @cell-prepared="onCellPrepared"
      @row-prepared="onRowPrepared"
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
      :header-cell-template="item.cellHeader"
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
      :showBorders="false"
      cssClass="row-action"
      alignment="left"
      :allow-resizing="false"
      :fixed="fixedColumn"
      fixed-position="right"
    />

    <template #cellButton="{ data }">
      <div
        class="flex justify-flexend m-x-8 button-group row-action"
        style="width: max-content !important; height: 100%" 
        v-show="isShowButtons == data.rowIndex"
      >
        <!-- -->

        <MsButtonIconVue
          :classIcon="'icon-copy'"
          :titleIcon="Resource.Button.Dulicate"
          @click.stop="onClickBtnDulicate(data)"
        />
        <MsButtonIconVue
          :classIcon="'mi-pencil'"
          :titleIcon="Resource.Button.Edit"
          @click.stop="onClickBtnEdit(data)"
        />
        <MsButtonIconVue
          v-show="data.data.RoleStatus != Enum.Role.RoleStatus.Deleted"
          :classIcon="'icon-delete-custom'"
          :titleIcon="Resource.Button.Delete"
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
    <template #cellHeader="{ data }">
      <div class="flex">
        <div>{{ columns[data.columnIndex].caption }}</div>
        <div
          v-if="data.columnIndex == showDown"
          class="m-l-4 icon-arrow-down"
        ></div>
        <div
          v-if="data.columnIndex == showUp"
          class="m-l-4 icon-arrow-up"
        ></div>
      </div>
    </template>
  </DxDataGrid>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
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
          // if (data.rowType === "header") {
          //   data.cellElement.classList.add("table-header");
          // }
          // data.cellElement.classList.add("custom-cell");
          // if (data.columnIndex === data?.row?.cells?.length - 1) {
          //   data.cellElement.classList.add("row-action");
          // }
        } else {
          this.isShowButtons = -1;
          // data.rowElement.classList.add("custom-row");
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
        this.showIcon(e);
        this.$emit(
          "onClickHeaderTable",
          this.columns[e.columnIndex].field,
          this.showUp > -1 ? Enum.TypeSort.ASC : Enum.TypeSort.DESC
        );
      }
    },

    /**
     * Hiện thị mũi tên
     * Author: TienDao (11/01/2023)
     */
    showIcon(e) {
      if (this.showDown != e.columnIndex && this.showUp != e.columnIndex) {
        this.showDown = -1;
        this.showUp = e.columnIndex;
      } else {
        if (this.showDown > -1) {
          this.showDown = -1;
          this.showUp = e.columnIndex;
          return;
        }
        if (this.showUp > -1) {
          this.showUp = -1;
          this.showDown = e.columnIndex;
          return;
        }
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
          cellHeader: "cellHeader",
        },
        {
          field: "RoleDescription",
          width: 200,
          caption: Resource.Entity.Role.RoleDescription,
          type: "text",
          minWidth: 100,
          cellTemplate: "Text",
          cellHeader: "cellHeader",
        },
        {
          field: "RoleStatus",
          width: 140,
          caption: Resource.Entity.Role.RoleStatus,
          type: "text",
          minWidth: 100,
          cellTemplate: "RoleStatus",
          cellHeader: "cellHeader",
        },
        {
          field: "CreatedDate",
          width: 130,
          caption: Resource.Entity.Base.CreatedDate,
          type: "date",
          minWidth: 100,
          cellTemplate: "Date",
          cellHeader: "cellHeader",
        },
        {
          field: "CreatedBy",
          width: 150,
          caption: Resource.Entity.Base.CreatedBy,
          type: "text",
          minWidth: 100,
          cellTemplate: "Text",
          cellHeader: "cellHeader",
        },
        {
          field: "ModifiedDate",
          width: 160,
          caption: Resource.Entity.Base.ModifiedDate,
          type: "date",
          minWidth: 100,
          cellTemplate: "Date",
          cellHeader: "cellHeader",
        },
        {
          field: "ModifiedBy",
          width: 170,
          caption: Resource.Entity.Base.ModifiedBy,
          type: "text",
          minWidth: 100,
          cellTemplate: "Text",
          cellHeader: "cellHeader",
        },
      ],

      //Hiện nút chức năng
      isShowButtons: -1,

      //Cột hiện thị nút
      showDown: -1,
      showUp: -1,
    };
  },
};
</script>

<style>
@import url(@/css/base.css);
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
  /* border-bottom: none !important */
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
.dx-datagrid-text-content {
  font-weight: 700;
  letter-spacing: 0.14px;
  color: #171b2a;
}
.dx-datagrid-content .dx-datagrid-table {
  border-collapse: inherit !important;
  border-spacing: 0;
  margin: 0;
  max-width: 10px;
}
</style>