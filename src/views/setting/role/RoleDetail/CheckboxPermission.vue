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
          v-if="subSystem.ListPermissions.length > 1"
        >
          <MsCheckboxVue
            v-model="checkAllBox"
            @clickOnCheckbox="clickOnCheckAll"
          />
          <div class="m-r-4 cursor-pointer text-over">
            <span>Tất cả</span>
          </div>
        </div>
        <div
          class="flex items-center w-full m-b-8"
          v-for="(item, index) in subSystem.ListPermissions"
          :key="index"
        >
          <MsCheckboxVue
            v-model="checkbox[index]"
            :isDisabled="checkValueCheckbox(item, index)"
            @clickOnCheckbox="clickOnPermissionsCheck"
            :indexPermission="index"
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
    indexList: Number,
  },
  watch: {
    subSystemDetail: {
      /**
       * Xử lý khi có mảng phân quyền
       * Xét giá trị checkbox tương ứng
       * Author: TienDao (30/12/2022)
       */
      handler() {
        try {
          //Kiểm tra Mảng phân quyền rỗng hay không (để thực hiện foreach)
          //Rỗng
          if (
            Object.keys(this.subSystemDetail).length == 0 &&
            this.subSystemDetail.constructor == Object
          ) {
            this.checkbox = new Array(
              this.subSystem.ListPermissions.length
            ).fill(false);
          }
          //Không rỗng
          else {
            //Gán giá trị các quyền tương ứng cho checkbox (binding dữ liệu)
            this.subSystem.ListPermissions.forEach((permission, index) => {
              //Sau khi gặp giá trị quyền tướng ứng thì k lặp lại việc gắn giá trị
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
        } catch (error) {
          console.log(error);
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
        try {
          //xử lý ô click chọn quyền (ngoài màn hình)
          if (this.checkbox.filter((value) => value == true).length > 0) {
            this.checkboxAll = true;
          } else {
            this.checkboxAll = false;
          }

          //Xử lý ô chọn tất cả (trong mennu context)
          if (
            this.checkbox.filter((value) => value == true).length ==
            this.subSystem.ListPermissions.length
          ) {
            this.checkAllBox = true;
          } else {
            this.checkAllBox = false;
          }
        } catch (error) {
          console.log(error);
        }
      },
      deep: true,
    },
  },
  created() {
    try {
      this.indexPermissionView();
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    try {
      this.indexPermissionView();
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    /**
     * Text hiển thị các quyền
     * Author: TienDao(31/12/2022)
     */
    textDisplay() {
      let arr = [];
      //for lần lượt => đẩy giá trị tương ứng vào mảng hiện thị
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
      try {
        //Gán giá trị true cho các quyền mặc định

        //Tổng quan - toàn quyền
        if (
          this.subSystem.SubSystemCode == "Dashboard" &&
          permission.PermissionCode == "FullPermission"
        ) {
          this.checkbox[index] = true;
          return true;
        }

        //Lượt chạy - lượt chạy của tôi
        if (
          this.subSystem.SubSystemCode == "Process" &&
          permission.PermissionCode == "MyProcess"
        ) {
          this.checkbox[index] = true;
          return true;
        }
      } catch (error) {
        console.log(error);
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
      try {
        // Kiểm tra và gán lại giá trị tương ứng cho mảng checkbox
        if (value == true) {
          this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
            true
          );
        } else {
          this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
            false
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Click nút Lưu trên form
     * Author: TienDao (02/01/2023)
     */
    clickOnBtnSave() {
      try {
        this.$emit("valueCheckbox", this.checkbox, this.indexList);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sk click vào ô tất cả
     * @param {*} value
     * Author: TienDao (03/01/2023)
     */
    clickOnCheckAll(value) {
      try {
        // Kiểm tra và gán lại giá trị tương ứng cho mảng checkbox
        if (value == true) {
          this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
            true
          );
        } else {
          this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
            false
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy index của quyền xem
     * Author: TienDao (03/01/2023)
     */
    indexPermissionView() {
      try {
        this.subSystem.ListPermissions.forEach((item, index) => {
          if (item.PermissionCode == "View") {
            this.indexView = index;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xử lý sk click chọn quyền
     * Author: TienDao (03/01/2023)
     */
    clickOnPermissionsCheck(value, index) {
      try {
        //Xử lý click quyền xem
        if (index == this.indexView && value == false) {
          this.checkbox = new Array(this.subSystem.ListPermissions.length).fill(
            false
          );
        }
        if (index != this.indexView && value == true) {
          this.checkbox[this.indexView] = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      //Danh sách phân quyền-quyền mới
      newSubSystem: {},

      //Giá trị mảng chọn
      checkbox: [],

      checkAllBox: Boolean,

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

      //index quyền xem
      indexView: 0,
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