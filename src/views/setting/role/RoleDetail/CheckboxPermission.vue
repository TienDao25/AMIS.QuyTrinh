<template>
  <div
    class="ms-row"
    style="
      display: flex;
      width: 100%;
      line-height: 35px;
      text-indent: 0px;
      padding: 0px;
      margin-bottom: 16px;
    "
  >
    <div
      v-if="rowName"
      class="text-bold ms-col ms-xs- ms-sm- ms-lg-"
      style="margin-left: 0%; width: 25%"
    >
      {{ rowName }}
    </div>

    <div
      class="ms-col ms-xs- ms-sm- ms-lg- flex items-center col-options"
      style="margin-left: 0%; width: 33.3333%"
    >
      <div class="flex items-center w-full">
        <MsCheckboxVue
          v-model="checkboxAll"
          :isDisabled="isDisabled"
          @clickOnCheckbox="clickOnCheckbox"
        />

        <div
          class="m-r-4 cursor-pointer text-over"
          :id="isRow"
          @click="showWithShadingOptions"
        >
          <span :class="{ opacityText: opacityText }">{{ textDisplay }}</span>
        </div>
        <div
          class="mi-chevron-down cursor-pointer"
          @click="showWithShadingOptions"
        ></div>
      </div>
    </div>

    <DxPopover
      :width="'auto'"
      v-model:visible="withShadingOptionsVisible"
      :shading="true"
      :target="'#' + isRow"
      position="bottom"
      shading-color="rgba(0, 0, 0, 0)"
    >
      <!-- :width="300" -->

      <div>
        <div
          class="flex items-center w-full m-b-8"
          v-for="(item, index) in subSystem.ListPermissions"
          :key="index"
        >
          <MsCheckboxVue
            v-model="checkbox[index]"
            :isDisabled="checkValueCheckbox(item, index)"
          />
          <div class="m-r-4 cursor-pointer text-over">
            <span>{{ item.PermissionName }}</span>
          </div>
        </div>
      </div>
    </DxPopover>
  </div>
</template>

<script>
import { DxPopover } from "devextreme-vue/popover";
import MsCheckboxVue from "@/components/base/MsInput/MsCheckbox.vue";
export default {
  name: "MsCheckBox",
  components: {
    DxPopover,
    MsCheckboxVue,
  },
  props: {
    //Trạng thái
    isDisabled: Boolean,

    //Tên hàng
    rowName: String,

    //Obj Phân quyền tổng quát
    subSystem: Object,

    //Obj Phân quyền của vai trò
    subSystemDetail: Object,

    //id row
    isRow: String,

    //indexList
    indexList:Number
  },
  watch: {
    subSystemDetail: {
      /**
       * Xử lý khi có mảng phân quyền
       * Xét giá trị checkbox tương ứng
       * Author: TienDao (30/12/2022)
       */
      handler() {
        console.log(this.subSystem.ListPermissions.length);
        if (
          Object.keys(this.subSystemDetail).length == 0 &&
          this.subSystemDetail.constructor == Object
        ) {
          console.log("rong");
          this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
            false
          );
        } else {
          console.log("ton tai");
          this.subSystem.ListPermissions.forEach((permission, index) => {
            let temp = true;
            this.subSystemDetail.ListPermissions.forEach((item) => {
              if (temp) {
                if (permission.PermissionCode == item.PermissionCode) {
                  this.checkbox[index] = true;
                  temp = false;
                } else {
                  this.checkbox[index] = false;
                }
              }
            });
          });
        }
      },
      deep: true,
    },

    checkbox: {
      /**
       * Xử lý sự kiện checkbox thành phần
       * Author: TienDao (30/12/2022)
       */
      handler() {
        // console.log(this.subSystem.length);
        if (this.checkbox.filter((value) => value == true).length > 0) {
          this.checkboxAll = true;
        } else {
          this.checkboxAll = false;
        }
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  computed: {
    /**
     * Text hiển thị các quyền
     * Author: TienDao(31/12/2022)
     */
    textDisplay() {
      let arr = [];
      this.checkbox.forEach((item, index) => {
        if (item == true) {
          arr.push(this.subSystem.ListPermissions[index].PermissionName);
        }
      });
      return arr.length > 0 ? arr.join(", ") : "Chọn quyền";
    },

    /**
     * Text hiển thị các quyền
     * Author: TienDao(31/12/2022)
     */
    opacityText() {
      let count = this.checkbox.filter((value) => value == true).length;
      return count == 0 ? true : false;
    },
  },
  methods: {
    /**
     * Khởi tạo giá trị check box
     * Author: TienDao (31/12/2022)
     */
    checkValueCheckbox(permission, index) {
      if (
        this.subSystem.SubSystemCode == "Dashboard" &&
        permission.PermissionCode == "FullPermission"
      ) {
        this.checkbox[index] = true;
        return true;
        // FullPermission
      }
      if (
        this.subSystem.SubSystemCode == "Process" &&
        permission.PermissionCode == "MyProcess"
      ) {
        this.checkbox[index] = true;
        return true;
      }
    },

    /**
     * Hiện popup chọn quyền
     * Author: TienDao (30/12/2022)
     */
    showWithShadingOptions() {
      this.withShadingOptionsVisible = true;
    },

    /**
     * Sự kiện click nút check box toàn bộ
     * @param {Boolean} value giá trị ô checkbox toàn bộ
     */
    clickOnCheckbox(value) {
      if (value==true) {
        this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
          true
        );
      } else {
        this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
          false
        );
      }
    },

    /**
     * Click nút Lưu trên form
     * Author: TienDao (02/01/2023)
     */
    clickOnBtnSave(){
      this.$emit("valueCheckbox", this.checkbox,this.indexList);
    }
  },
  data() {
    return {
      //Danh sách phân quyền-quyền mới
      newSubSystem: {},

      //Giá trị mảng chọn
      checkbox: [],

      //Check box toàn bộ
      checkboxAll: false,

      //Show icon checkbox
      isIcon: true,

      //Hiện Popup chọn
      withShadingOptionsVisible: false,

      //Vị trí hiện
      animationConfig: {
        show: {
          type: "pop",
          from: {
            scale: 0,
          },
          to: {
            scale: 1,
          },
        },
        hide: {
          type: "fade",
          from: 1,
          to: 0,
        },
      },
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
.opacityText {
  opacity: 0.5;
}
.custom-checkbox {
  margin-top: -25px;
}
.ms-checkbox--input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.ms-checkbox .ms-checkbox--input {
  height: inherit;
}
input:disabled {
  color: #d7dce3 !important;
}
.checkmark {
  position: absolute;
  left: 0;
  height: 26px;
  width: 22px;
}
.disabled {
  opacity: 0.5 !important;
}
.ms-checkbox .checkmark {
  top: 0;
}
.container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 1px 0 0 32px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100%;
}
.ms-checkbox:focus .checkmark:not(.disabled),
.ms-checkbox:focus .icon-square-check-primary.checkmark,
.ms-checkbox:hover .checkmark:not(.disabled),
.ms-checkbox:hover .icon-square-check-primary.checkmark {
  border-radius: 50%;
  background-color: var(--primary) !important;
}
</style>