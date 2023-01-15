<template>
  <div class="body-custom" style="position: relative">
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
              :title="Resource.Title.Return"
              @click="onClickReturnViewMain"
            >
              <div class="tooltip-container">
                <div class="con-ms-tooltip">
                  <i class="ms-icon notranslate icon-scale mi-arrow-left"></i>
                </div>
              </div>
            </div>
            <span class="font-20 bold">{{
              modeForm == Enum.ModeForm.Add ? Resource.Form.Add : titleForm
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
                      :label="Resource.Entity.Role.RoleName"
                      :placeholderText="Resource.Text.InputRoleName"
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
                      :label="Resource.Entity.Role.RoleDescription"
                      :placeholderText="Resource.Text.InputDescription"
                      :maxLength="225"
                      :isRequired="false"
                      v-model="roleDetail.RoleDescription"
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
  watch: {
    "roleDetail.RoleName": function () {
      this.error.RoleName =
        Resource.Entity.Role.RoleName + " " + Resource.Text.NotNull;
    },
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
      try {
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
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Click quay lại màn hình chính
     * Author: TienDao (25/12/2022)
     */
    onClickReturnViewMain() {
      try {
        this.$emit("closeFormDetail");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * API lấy chi tiết vai trò
     * Author: TienDao (26/12/2022)
     */
    getRoleDetail() {
      try {
        this.isShowLoading();
        RoleAPI.getRoleDetailByID(this.roleID)
          .then((response) => {
            this.isShowLoading();
            // this.roleDetail = response.data;
            this.bindingData(response.data);
          })
          .catch((error) => {
            this.isShowLoading();
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
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Focus Input tên vai trò
     * Author: TienDao (28/12/2022)
     */
    focusInputRoleName() {
      try {
        this.$refs.roleName.focusInput();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Truyền dữ liệu vào form
     */
    bindingData(data) {
      try {
        this.roleDetail = data;
        this.titleForm = this.roleDetail.RoleName;
        if (this.modeForm == Enum.ModeForm.Dulicate) {
          this.roleDetail.RoleName += " - Copy";
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy phân quyền tương ứng
     * Author: TienDao 30/12/2022
     */
    getSubSystemInObj(subSystemCode) {
      try {
        var subSystem = {};
        this.roleDetail.ListSubsytemAndPermission?.forEach((item) => {
          if (item.SubSystemCode == subSystemCode) {
            subSystem = item;
            return false;
          }
        });
        return subSystem;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Click nút lưu
     * Author: TienDao (31/12/2022)
     */
    onClickBtnSave() {
      try {
        this.handlerData();

        //Validate
        if (this.validateData() == true) {
          this.callAPI();
          // return;
        } else {
          this.$refs.roleName.validateFalse();
          this.focusInputRoleName();
          //Thông báo lỗi
          // this.$emit("");
          // return;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Validate
     * Author: TienDao (01/01/2023)
     */
    validateData() {
      try {
        let isValid = true;
        if (!this.roleDetail.RoleName) {
          this.error.RoleName =
            Resource.Entity.Role.RoleName + " " + Resource.Text.NotNull;
          isValid = false;
        } else {
          this.error.RoleName = "";
        }
        return isValid;
      } catch (error) {
        console.log(error);
      }
    },

    //Gọi API
    callAPI() {
      try {
        if (
          this.modeForm == Enum.ModeForm.Add ||
          this.modeForm == Enum.ModeForm.Dulicate
        ) {
          this.insertRole();
        }
        if (this.modeForm == Enum.ModeForm.Update) {
          this.updateRole();
          //
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi API thêm mới vai trò
     * Author: TienDao (02/01/2023)
     */
    insertRole() {
      try {
        var requestClient = [
          {
            ModeForm: this.modeForm,
            RoleID: null,
            RoleCode: this.roleDetail.RoleCode ? this.roleDetail.RoleCode : "",
            RoleName: this.roleDetail.RoleName ? this.roleDetail.RoleName : "",
            RoleDescription: this.roleDetail.RoleDescription
              ? this.roleDetail.RoleDescriptio
              : "",
            Permissions: this.newList,
          },
        ];
        this.isShowLoading();
        RoleAPI.insertRole(requestClient)
          .then((response) => {
            console.log(response);
            this.isShowLoading();
            this.$emit("closeFormAndInsertUpdateSuccess");
          })
          .catch((error) => {
            this.isShowLoading();
            console.log(error);
            if (error.response) {
              switch (error.response.status) {
                case Enum.StatusCode.BadRequest:
                  this.error.RoleName = error.response.data.MoreInfo[0];
                  this.$refs.roleName.validateFalse();
                  this.$emit("showDialogError", error.response.data.MoreInfo);
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
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi API thêm mới vai trò
     * Author: TienDao (02/01/2023)
     */
    updateRole() {
      try {
        var requestClient = {
          ModeForm: this.modeForm,
          RoleID: this.roleDetail.RoleID,
          RoleCode: this.roleDetail.RoleCode ? this.roleDetail.RoleCode : "",
          RoleName: this.roleDetail.RoleName ? this.roleDetail.RoleName : "",
          RoleDescription: this.roleDetail.RoleDescription
            ? this.roleDetail.RoleDescriptio
            : "",
          Permissions: this.newList,
        };
        this.isShowLoading();
        RoleAPI.updateRole(requestClient)
          .then((response) => {
            console.log(response);
            this.isShowLoading();
            this.$emit("closeFormAndInsertUpdateSuccess");
          })
          .catch((error) => {
            this.isShowLoading();
            console.log(error);
            if (error.response) {
              switch (error.response.status) {
                case Enum.StatusCode.BadRequest:
                  this.error.RoleName = error.response.data.MoreInfo[0];
                  this.$refs.roleName.validateFalse();
                  this.$emit("showDialogError", error.response.data.MoreInfo);
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
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Nhận giá trị checkbox
     * @param {*} value
     * @param {*} index
     * Author: TienDao (02/01/2023)
     */
    takeValueCheckbox(value, index) {
      try {
        this.listCheckbox[index] = value;
      } catch (error) {
        console.log(error);
      }
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
      try {
        this.newList = [];
        this.newListSubsytemAndPermission = [...this.listSubsytemAndPermission];
        this.setPermissionStateAdd();
        if (this.modeForm == Enum.ModeForm.Update) {
          this.setPermissionStateNone();
          this.setPermissionStateDelete();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Chuyển mảng checkbox thành danh sách phân quyền mới
     * => các quyền mặc định thêm state là 1 (thêm)
     * Author: TienDao (10/01/2023)
     */
    setPermissionStateAdd() {
      this.listSubsytemAndPermission.forEach((subSystem, subSystemIndex) => {
        //Lấy giá trị các checkbox
        this.$refs["subSystem" + subSystemIndex][0].clickOnBtnSave();
        subSystem.ListPermissions.forEach((permission, permissionsIndex) => {
          if (this.listCheckbox[subSystemIndex]) {
            if (this.listCheckbox[subSystemIndex][permissionsIndex] == true) {
              this.newListSubsytemAndPermission[subSystemIndex].ListPermissions[
                permissionsIndex
              ].state = Enum.State.Add;
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
    },

    /**
     * Lấy ra id có cả trong vai trò cũ && vai trò mới
     * .gán => state = 0
     * Author: TienDao (10/01/2023)
     */
    setPermissionStateNone() {
      this.newList.forEach((item) => {
        if (this.roleDetail.ListSubsytemAndPermission) {
          this.roleDetail.ListSubsytemAndPermission.forEach((subSystem) => {
            if (item.SubSystemID == subSystem.SubSystemID) {
              subSystem.ListPermissions.forEach((permission) => {
                if (item.PermissionID == permission.PermissionID) {
                  item.State = Enum.State.None;
                }
              });
            }
          });
        }
      });
    },

    /**
     * Lấy ra id có trong vai trò cũ && không có trong vai trò mới.
     * gán => state = 2 (Xóa)
     * Author: Tiến Đạo (10/01/2023)
     */
    setPermissionStateDelete() {
      if (this.roleDetail.ListSubsytemAndPermission) {
        this.roleDetail.ListSubsytemAndPermission.forEach((subSystem) => {
          subSystem.ListPermissions.forEach((permission) => {
            var isHas = false;
            this.newList.forEach((item) => {
              if (item.SubSystemID == subSystem.SubSystemID) {
                if (item.PermissionID == permission.PermissionID) {
                  isHas = true;
                }
              }
            });
            if (!isHas) {
              this.newList.push({
                SubSystemID: subSystem.SubSystemID,
                SubSystemCode: subSystem.SubSystemCode,
                PermissionID: permission.PermissionID,
                PermissionCode: permission.PermissionCode,
                State: Enum.State.Detele,
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
        RoleStatus: Enum.Role.RoleStatus.Active,
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
        RoleName: Resource.Entity.Role.RoleName + " " + Resource.Text.NotNull,
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