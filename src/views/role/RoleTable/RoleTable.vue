<template>
  <div class="h-full">
    <!-- <div style="height: calc(100% - 60px - 40px);"> -->
    <DxDataGrid
      id="dataGrid"
      height="100%"
      :data-source="dataSource"
      key-expr="ID"
      :allow-column-resizing="true"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="false"
      @selection-changed="onSelectionChanged"
      :hover-state-enabled="true"
      alignment="center"
    >
      <!-- :selection="{ mode: 'single' }" -->
      <DxColumn
        data-field="CompanyName"
        data-type="text"
        caption="Tên vai trò"
        :width="250"
      />
      <DxColumn
        :columnAutoWidth="true"
        data-field="Address"
        data-type="text"
        caption="Mô tả"
        :min-width="136"
        :width="'inherit'"
      />

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
      <template #cellButton="{data}">
        <div
          class="flex justify-flexend m-x-8"
          style="width: max-content !important; height: 100%"
          v-show="isShowButtons"
        >
          <MsButtonIconVue
            :classIcon="'icon-copy'"
            :titleIcon="'Nhân bản'"
            @click="onClickBtnDulicate(data)"
          />
          <MsButtonIconVue
            :classIcon="'mi-pencil'"
            :titleIcon="'Sửa'"
            @click="onClickBtnEdit(data)"
          />
          <MsButtonIconVue
            :classIcon="'icon-delete-custom'"
            :titleIcon="'Xóa'"
            @click="onClickBtnDelete(data)"
          />
        </div>
      </template>
    </DxDataGrid>

    <!-- <DxButton text="Click me" @click="sayHelloWorld" /> -->
  </div>
</template>

<script>
// import DxButton from 'devextreme-vue/button';
import {
  DxDataGrid,
  DxColumn,
  // DxButton
} from "devextreme-vue/data-grid";
import MsButtonIconVue from "@/components/base/MsButton/MsButtonIcon.vue";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    // DxButton,
    MsButtonIconVue,
  },
  methods: {
    sayHelloWorld() {
      alert("Hello world!");
    },

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
      console.log(e.row.data);
      this.$emit("onClickBtnEdit", e.row.data);
    },

    /**
     * Sự kiện click nút nhân bản
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
     onClickBtnDulicate(e) {
      console.log(e.row.data);
      this.$emit("onClickBtnDulicate", e.row.data);
    },

    /**
     * Sự kiện click nút xóa
     * @param {*} e
     * Author: TienDao (25/12/2022)
     */
     onClickBtnDelete(e) {
      console.log(e.row.data);
      this.$emit("onClickBtnDelete", e.row.data);
    },


  },
  data() {
    return {
      dataSource: [
        {
          ID: 1,
          CompanyName: "Super Mart of the West",
          Address: "702 SW 8th Street",
          City: "Bentonville",
          State: "Arkansas",
          Zipcode: 72716,
          Phone: "(800) 555-2797",
          Fax: "(800) 555-2171",
          Website: "http://www.nowebsitesupermart.com",
        },
        {
          ID: 2,
          CompanyName: "Electronics Depot",
          Address: "2455 Paces Ferry Road NW",
          City: "Atlanta",
          State: "Georgia",
          Zipcode: 30339,
          Phone: "(800) 595-3232",
          Fax: "(800) 595-3231",
          Website: "http://www.nowebsitedepot.com",
        },
        {
          ID: 3,
          CompanyName: "K&S Music",
          Address: "1000 Nicllet Mall",
          City: "Minneapolis",
          State: "Minnesota",
          Zipcode: 55403,
          Phone: "(612) 304-6073",
          Fax: "(612) 304-6074",
          Website: "http://www.nowebsitemusic.com",
        },
        {
          ID: 4,
          CompanyName: "Tom's Club",
          Address: "999 Lake Drive",
          City: "Issaquah",
          State: "Washington",
          Zipcode: 98027,
          Phone: "(800) 955-2292",
          Fax: "(800) 955-2293",
          Website: "http://www.nowebsitetomsclub.com",
        },
        {
          ID: 5,
          CompanyName: "E-Mart",
          Address: "3333 Beverly Rd",
          City: "Hoffman Estates",
          State: "Illinois",
          Zipcode: 60179,
          Phone: "(847) 286-2500",
          Fax: "(847) 286-2501",
          Website: "http://www.nowebsiteemart.com",
        },
        {
          ID: 6,
          CompanyName: "Walters",
          Address: "200 Wilmot Rd",
          City: "Deerfield",
          State: "Illinois",
          Zipcode: 60015,
          Phone: "(847) 940-2500",
          Fax: "(847) 940-2501",
          Website: "http://www.nowebsitewalters.com",
        },
        {
          ID: 7,
          CompanyName: "StereoShack",
          Address: "400 Commerce S",
          City: "Fort Worth",
          State: "Texas",
          Zipcode: 76102,
          Phone: "(817) 820-0741",
          Fax: "(817) 820-0742",
          Website: "http://www.nowebsiteshack.com",
        },
        {
          ID: 8,
          CompanyName: "Circuit Town",
          Address: "2200 Kensington Court",
          City: "Oak Brook",
          State: "Illinois",
          Zipcode: 60523,
          Phone: "(800) 955-2929",
          Fax: "(800) 955-9392",
          Website: "http://www.nowebsitecircuittown.com",
        },
        {
          ID: 9,
          CompanyName: "Premier Buy",
          Address: "7601 Penn Avenue South",
          City: "Richfield",
          State: "Minnesota",
          Zipcode: 55423,
          Phone: "(612) 291-1000",
          Fax: "(612) 291-2001",
          Website: "http://www.nowebsitepremierbuy.com",
        },
        {
          ID: 10,
          CompanyName: "ElectrixMax",
          Address: "263 Shuman Blvd",
          City: "Naperville",
          State: "Illinois",
          Zipcode: 60563,
          Phone: "(630) 438-7800",
          Fax: "(630) 438-7801",
          Website: "http://www.nowebsiteelectrixmax.com",
        },
        {
          ID: 11,
          CompanyName: "Video Emporium",
          Address: "1201 Elm Street",
          City: "Dallas",
          State: "Texas",
          Zipcode: 75270,
          Phone: "(214) 854-3000",
          Fax: "(214) 854-3001",
          Website: "http://www.nowebsitevideoemporium.com",
        },
        {
          ID: 12,
          CompanyName: "Screen Shop",
          Address: "1000 Lowes Blvd",
          City: "Mooresville",
          State: "North Carolina",
          Zipcode: 28117,
          Phone: "(800) 445-6937",
          Fax: "(800) 445-6938",
          Website: "http://www.nowebsitescreenshop.com",
        },
      ],
      columns: ["CompanyName", "City", "State", "Phone", "Fax"],
      isShowButtons: true,
    };
  },
};
</script>

<style>
#dataGrid td {
  text-align: left;
  min-width: 80px;
  max-width: 250px;
  /* width: 250px; */
}
.dx-data-row.dx-state-hover > td {
  cursor: pointer;
  background-color: #dbf4ff !important;
}

.dx-selection > td {
  cursor: pointer;
  background-color: #dbf4ff !important;
}
.dx-datagrid .dx-row > td,
.dx-datagrid .dx-row > tr > td {
  height: 48px !important;
}
.grid-container .dx-datagrid .dx-row > td {
  padding: 0 16px;
  height: 48px !important;
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
/* .grid-container .dx-datagrid-headers .dx-datagrid-table .dx-row > td:not(:last-child):before {
  content: "" !important;
  position: absolute !important;
  top: 30% !important;
  left: 0 !important;
  background-color: red !important;
  width: 1px !important;
  height: 20px !important;
  z-index: 23 !important;
} */
/* .grid-container .dx-scrollable-simulated {
    overflow: auto !important;
} */
</style>