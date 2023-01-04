<template>
  <div class="body-custom">
    <div class="h-full container" style="padding: 16px 24px">
      <div class="content-header p-b-16">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div
              class="
                ms-icon-container
                flex
                items-center
                justify-center
                m-r-8
                ms-icon-
                btn-icon-1
              "
              title="Quay lại"
              @click="onClickReturnViewMain"
            >
              <div class="tooltip-container">
                <div class="con-ms-tooltip">
                  <i class="ms-icon notranslate icon-scale mi-arrow-left"></i>
                </div>
              </div>
            </div>
            <span class="font-20 bold">{{
              modeForm == Enum.ModeForm.Add ? "Thêm mới" : titleForm
            }}</span>
          </div>
          <div class="flex" v-if="modeForm == Enum.ModeForm.None">
            <MsButtonVue :isPrimary="true" :title="Resource.Button.Edit" />
          </div>
          <div class="flex" v-else>
            <MsButtonVue
              :isSecondary="true"
              :title="Resource.Button.Cancel"
              @click="onClickReturnViewMain"
            />
            <MsButtonVue
              :isPrimary="true"
              :title="Resource.Button.Save"
              @click="onClickBtnSave"
            />
          </div>
        </div>
      </div>

      <div
        class="content-main"
        style="background: transparent; height: calc(100vh - 148px)"
      >
        <div class="h-full w-full">
          <div class="p-24 bg-white">
            <h2>THÔNG TIN CHUNG</h2>
            <br />
            <div>
              <div>
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
                    class="ms-col ms-xs- ms-sm- ms-lg-"
                    style="margin-left: 0%; width: 48.3333%"
                  >
                    <MsInputVue
                      :label="'Tên vai trò'"
                      :placeholderText="'Nhập tên vai trò'"
                      :maxLength="225"
                      :errorText="error.RoleName"
                      :isRequired="true"
                      v-model="roleDetail.RoleName"
                      ref="roleName"
                    />
                  </div>
                  <div
                    class="ms-col ms-xs- ms-sm- ms-lg-"
                    style="margin-left: 0%; width: 3.33333%"
                  ></div>
                  <div
                    class="ms-col ms-xs- ms-sm- ms-lg-"
                    style="margin-left: 0%; width: 48.3333%"
                  >
                    <MsInputVue
                      :label="'Mô tả'"
                      :placeholderText="'Nhập mô tả'"
                      :maxLength="225"
                      :isRequired="false"
                      v-model="roleDetail.RoleDescribe"
                    />
                  </div>
                </div>

                <br />

                <div class="m-b-24">
                  <div class="title-block font-20 bold" style="margin-top: 0px">
                    {{ Resource.SubSystemType.Subjects.toUpperCase() }}
                  </div>
                  <div
                    style="margin-top: 20px"
                    v-for="(item, index) in listSubsytemAndPermission"
                    :key="index"
                  >
                    <div
                      v-if="item.SubSystemType == Enum.SubSystemType.Subjects"
                    >
                      <CheckboxPermission
                        :rowName="item.SubSystemName"
                        :isRow="item.SubSystemCode"
                        :isDisabled="
                          item.SubSystemCode == 'Dashboard' ||
                          item.SubSystemCode == 'Process'
                            ? true
                            : false
                        "
                        :subSystem="item"
                        :subSystemDetail="getSubSystemInObj(item.SubSystemCode)"
                        :ref="'subSystem' + index"
                        @valueCheckbox="takeValueCheckbox"
                        :indexList="index"
                      />
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="title-block font-20 bold" style="margin-top: 0px">
                    {{ Resource.SubSystemType.Establish.toUpperCase() }}
                  </div>
                  <div
                    style="margin-top: 20px"
                    v-for="(item, index) in listSubsytemAndPermission"
                    :key="index"
                  >
                    <div
                      v-if="item.SubSystemType == Enum.SubSystemType.Establish"
                    >
                      <CheckboxPermission
                        :rowName="item.SubSystemName"
                        :isRow="item.SubSystemCode"
                        :isDisabled="false"
                        :subSystem="item"
                        :subSystemDetail="getSubSystemInObj(item.SubSystemCode)"
                        :ref="'subSystem' + index"
                        @valueCheckbox="takeValueCheckbox"
                        :indexList="index"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MsLoadingVue v-show="isLoading" />
  </div>
</template>

<script>
// import { DxTooltip } from "devextreme-vue/tooltip";
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsInputVue from "@/components/base/MsInput/MsInput.vue";
import MsLoadingVue from "@/components/base/MsLoading/MsLoading.vue";

import CheckboxPermission from "./CheckboxPermission.vue";

// import axios from "axios";
import Enum from "@/js/enum/enum.js";
import RoleAPI from "@/apis/RoleAPI.js";
import Resource from "@/js/resource/resource";

export default {
  components: {
    // DxTooltip,
    MsButtonVue,
    MsInputVue,
    MsLoadingVue,
    CheckboxPermission,
  },
  props: {
    // Trường hợp của popup
    modeForm: Number,

    //ID vai trò cần sửa/nhân bản
    roleID: String,

    //Toàn bộ Danh sách phân quyền và quyền
    listSubsytemAndPermission: Array,
  },
  created() {
    this.init();
  },
  mounted() {
    this.focusInputRoleName();
  },

  methods: {
    /**
     * Khởi tạo form
     * Author: TienDao (26/12/2022)
     */
    init() {
      switch (this.modeForm) {
        case Enum.ModeForm.Add:
          this.bindingData({});
          break;
        case Enum.ModeForm.Update:
          this.getRoleDetail();
          break;
        case Enum.ModeForm.Dulicate:
          this.getRoleDetail();
          break;
      }
    },

    /**
     * Click quay lại màn hình chính
     * Author: TienDao (25/12/2022)
     */
    onClickReturnViewMain() {
      this.$emit("closeFormDetail");
    },

    /**
     * API lấy chi tiết vai trò
     * Author: TienDao (26/12/2022)
     */
    getRoleDetail() {
      RoleAPI.getRoleDetailByID(this.roleID)
        .then((response) => {
          console.log(response);
          // this.roleDetail = response.data;
          this.bindingData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case Enum.StatusCode.BadRequest:
                this.$emit("showDialogError", error.response.data.UerMsg);
                break;
              case Enum.StatusCode.InternalServerError:
                this.$emit("showDialogError", error.response.data.UserMsg);
                break;
              default:
                this.$emit("showDialogError", Resource.Dialog.TextError);
            }
          } else {
            this.$emit("showDialogError", Resource.Dialog.TextError);
          }
        })
        .finally(() => {
          // this.isShowLoading();
        });
    },

    /**
     * Focus Input tên vai trò
     * Author: TienDao (28/12/2022)
     */
    focusInputRoleName() {
      this.$refs.roleName.focusInput();
    },

    /**
     * Truyền dữ liệu vào form
     */
    bindingData(data) {
      this.roleDetail = data;
      this.titleForm = this.roleDetail.RoleName;
      if (this.modeForm == Enum.ModeForm.Dulicate) {
        this.roleDetail.RoleName += " - Copy";
      }
      console.log(this.roleDetail);
      console.log(this.listSubsytemAndPermission);
    },

    /**
     * Lấy phân quyền tương ứng
     * Author: TienDao 30/12/2022
     */
    getSubSystemInObj(subSystemCode) {
      var subSystem = {};
      this.roleDetail.ListSubsytemAndPermission?.forEach((item) => {
        if (item.SubSystemCode == subSystemCode) {
          subSystem = item;
          return false;
        }
      });
      // console.log(subSystem);
      return subSystem;
    },

    /**
     * Click nút lưu
     * Author: TienDao (31/12/2022)
     */
    onClickBtnSave() {
      console.log(this.$refs);
      console.log(this.listSubsytemAndPermission);
      console.log(this.listCheckbox);
      this.listSubSystemID = [];
      this.listPermissionID = [];
      this.listSubsytemAndPermission.forEach((subSystem, subSystemIndex) => {
        this.$refs["subSystem" + subSystemIndex][0].clickOnBtnSave();
        subSystem.ListPermissions.forEach((permission, permissionsIndex) => {
          if (this.listCheckbox[subSystemIndex]) {
            if (this.listCheckbox[subSystemIndex][permissionsIndex] == true) {
              this.listSubSystemID.push(subSystem.SubSystemID);
              this.listPermissionID.push(permission.PermissionID);
              // this.roleDetail.listSubsytemAndPermission.list
            }
          }
        });
      });
      console.log(this.modeForm);
      console.log(this.roleDetail);
      console.log("listSubSystemID: " + this.listSubSystemID);
      console.log("listPremissionID: " + this.listPermissionID);

      this.handlerData();

      //Validate
      if (this.validateData() == true) {
        // this.callAPI();
        // return;
      } else {
        this.$refs.roleName.validateFalse();
        //Thông báo lỗi
        // this.$emit("");
        // return;
      }
    },

    /**
     * Validate
     * Author: TienDao (01/01/2023)
     */
    validateData() {
      let isValid = true;
      if (!this.roleDetail.RoleName) {
        this.error.RoleName = "Tên vai trò không được để trống";
        isValid = false;
      } else {
        this.error.RoleName = "";
      }
      return isValid;
    },

    //Gọi API
    callAPI() {
      if (
        this.modeForm == Enum.ModeForm.Add ||
        this.modeForm == Enum.ModeForm.Dulicate
      ) {
        this.addRole();
      }
      if (this.modeForm == Enum.ModeForm.Update) {
        //
      }
    },

    /**
     * Gọi API thêm mới vai trò
     * Author: TienDao (02/01/2023)
     */
    addRole() {
      this.isShowLoading();
      RoleAPI.addRole(
        this.modeForm,
        this.roleDetail,
        this.listSubSystemID,
        this.listPermissionID
      )
        .then((response) => {
          this.isShowLoading();
          console.log(response);
          this.$emit("closeFormAndAddSuccess");
        })
        .catch((error) => {
          this.isShowLoading();
          console.log(error);
          if (error.response) {
            switch (error.response.status) {
              case Enum.StatusCode.BadRequest:
                this.$emit("showDialogError", error.response.data.MoreInfo);
                break;
              case Enum.StatusCode.InternalServerError:
                this.$emit("showDialogError", error.response.data.UserMsg);
                break;
              case Enum.StatusCode.NotFound:
                this.$emit("showDialogError", error.response.data.UserMsg);
                break;
              default:
                this.$emit("showDialogError", Resource.Dialog.TextError);
            }
          } else {
            this.$emit("showDialogError", Resource.Dialog.TextError);
          }
        });
    },

    /**
     * Nhận giá trị checkbox
     * @param {*} value
     * @param {*} index
     * Author: TienDao (02/01/2023)
     */
    takeValueCheckbox(value, index) {
      console.log("index: " + index);
      console.log("value: " + value);
      this.listCheckbox[index] = value;
    },

    /**
     * Ẩn/hiện loading
     * Author: TienDao (02/01/20220)
     */
    isShowLoading() {
      this.isLoading = !this.isLoading;
    },

    /**
     * Xử lý data cho đầu vào api
     * Author: TienDao (04/01/20220)
     */
    handlerData() {
      alert("Xử lý data!!!");
      this.newList = [];
      this.newListSubsytemAndPermission = [...this.listSubsytemAndPermission];
      //Chuyển mảng checkbox thành danh sách phân quyền mới => các quyền mặc định thêm state là 1 (thêm)
      this.listSubsytemAndPermission.forEach((subSystem, subSystemIndex) => {
        this.$refs["subSystem" + subSystemIndex][0].clickOnBtnSave();
        subSystem.ListPermissions.forEach((permission, permissionsIndex) => {
          if (this.listCheckbox[subSystemIndex]) {
            if (this.listCheckbox[subSystemIndex][permissionsIndex] == true) {
              this.newListSubsytemAndPermission[subSystemIndex].ListPermissions[
                permissionsIndex
              ].state = Enum.State.Add;
              // this.roleDetail.listSubsytemAndPermission.list
              this.newList.push({
                SubSystemID: subSystem.SubSystemID,
                SubSystemCode: subSystem.SubSystemCode,
                PermissionID: permission.PermissionID,
                PermissionCode: permission.PermissionCode,
                State: Enum.State.Add,
              });
            }
          }
        });
      });
      if (this.modeForm == Enum.ModeForm.Update) {
        //Lấy ra id có trong vai trò cũ và vai trò mới => state = 0
        this.newList.forEach((item) => {
          this.roleDetail.ListSubsytemAndPermission.forEach((subSystem) => {
            if (item.SubSystemID == subSystem.SubSystemID) {
              subSystem.ListPermissions.forEach((permission) => {
                if (item.PermissionID == permission.PermissionID) {
                  item.State = Enum.State.None;
                }
              });
            }
          });
        });
        //Lấy ra id có trong vai trò cũ, không có trong vai trò mới => state = 2 (Xóa)
        this.roleDetail.ListSubsytemAndPermission.forEach((subSystem) => {
          // var isHas = false;
          this.newList.forEach((item) => {
            if (item.SubSystemID == subSystem.SubSystemID) {
              subSystem.ListPermissions.forEach((permission) => {
                if (item.PermissionID == permission.PermissionID) {
                  // isHas = true;
                } else {
                  this.newList.push({
                    SubSystemID: subSystem.SubSystemID,
                    SubSystemCode: subSystem.SubSystemCode,
                    PermissionID: permission.PermissionID,
                    PermissionCode: permission.PermissionCode,
                    State: Enum.State.Detele,
                  });
                }
              });
            }
          });
        });
      }
    },
  },
  data() {
    return {
      Enum,
      Resource,
      //Chi tiết vai trò
      roleDetail: {
        RoleName: null,
        RoleDescription: "",
      },

      //Danh sách xử lý so sánh 2 mảng phân quyền
      newList: [],

      //Trạng thái hiện thị Loading
      isLoading: false,

      //tiêu đề form
      titleForm: "",

      //Danh sách trạng thái phân quyền - quyền tương ứng đã chọn
      listCheckbox: [],

      //Lỗi
      error: {
        RoleName: "Tên vai trò không được để trống",
      },

      //Danh sách ID phân quyền
      listSubSystemID: [],

      //Danh sách quyền tương ứng
      listPermissionID: [],

      //Danh sách phân quyền (đã thêm state)
      newListSubsytemAndPermission: [],
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
#process-permission .body-custom {
  width: 100%;
  overflow: auto;
}
.btn-icon-1 {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
}

.btn-icon-1:hover {
  background-color: #eff1f6 !important;
}
.content-main {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}
</style>