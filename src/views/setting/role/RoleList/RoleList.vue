<template>
  <div id="process-permission" style="height: 100%; width: calc(100%)">
    <div
      v-show="!isRoleDetail"
      class="h-full container body-custom"
      style="padding: 16px 24px"
    >
      <div class="content-header p-b-16">
        <div class="flex justify-between items-center header-custom">
          <div class="font-20 bold">{{ Resource.Entity.Role.Role }}</div>
          <MsButtonVue
            :isPrimary="true"
            :title="Resource.Button.Add"
            :includeIcon="true"
            :iconButton="'mi-plus-white'"
            @click="onClickBtnAdd"
          />
        </div>
      </div>

      <div
        class="content-main"
        style="background: transparent; height: calc(100vh - 140px)"
      >
        <div class="h-full w-full">
          <div class="flex items-center w-full bg-white" style="height: 60px">
            <div class="m-l-12">
              <div>
                <!-- style="height: 36px; width: 240px" -->
                <MsInputSreach
                  :placeholderText="Resource.Text.FindRole"
                  :iconPre="'mi-search'"
                  v-model="keyword"
                  :maxLength="255"
                />
              </div>
            </div>
            <MsBoxVue
              wrapperClass="mgr-8 mgl-8"
              :placeholder="Resource.Text.FilterByStatus"
              icon-class="svg-icon-process icon-role-setting-user role-icon"
              display-expr="StatusName"
              valueExpr="Value"
              :data-source="roleStatus"
              selection-mode="single"
              @valueChanged="clickOnSeletedStatus"
            />
          </div>

          <div class="w-full grid-no-paging bg-white" style="overflow: hidden">
            <div class="grid-container" style="height: calc(100% - 48px)">
              <div class="h-full">
                <RoleTable
                  :fixedColumn="!isDialog"
                  :listRole="listRole"
                  @onClickBtnEdit="onClickBtnEdit"
                  @onClickBtnDulicate="onClickBtnDulicate"
                  @onClickBtnDelete="onClickBtnDelete"
                  @onClickHeaderTable="onClickHeaderTable"
                />
                <MsLoadingVue v-show="isLoading" />
              </div>
            </div>
            <div class="paging">
              <RolePaging
                @changeNumberRecord="changeNumberRecord"
                :totalRecords="totalRecords"
                :pageCurrent="pageCurrent"
                :totalPages="totalPages"
                @onClickNextPage="onClickNextPage"
                @onClickPrePage="onClickPrePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <RoleDetail
      v-if="isRoleDetail"
      :modeForm="modeForm"
      :roleID="roleID"
      :listSubsytemAndPermission="listSubsytemAndPermission"
      @closeFormDetail="closeFormDetail"
      @showDialogError="showDialogError"
      @closeFormAndInsertUpdateSuccess="closeFormAndInsertUpdateSuccess"
      ref="roleDetail"
    />
    <RoleDialog
      v-show="isDialog"
      :roleID="roleID"
      :modeDialog="modeDialog"
      :descriptionDialog="descriptionDialog"
      :titleDialog="titleDialog"
      @closeDialog="closeDialog"
      @closeDialogAndDeleteSuccess="closeDialogAndDeleteSuccess"
      @showDialogError="showDialogError"
    />
    <MsNotificationVue
      v-if="isNotification"
      :bodyTextNotification="bodyTextNotification"
      :tittleNotification="tittleNotification"
      :classNotification="classNotification"
      :iconNotification="iconNotification"
    />
  </div>
</template>
  
  <script>
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsInputSreach from "@/components/base/MsInput/MsInputSreach.vue";
import MsLoadingVue from "@/components/base/MsLoading/MsLoading.vue";
import MsNotificationVue from "@/components/base/MsNotification/MsNotification.vue";
import MsBoxVue from "@/components/base/MsComboBox/MsBox.vue";

import RoleTable from "../RoleTable/RoleTable.vue";
import RoleDetail from "../RoleDetail/RoleDetail.vue";
import RolePaging from "../RolePaging/RolePaging.vue";
import RoleDialog from "../RoleDialog/RoleDialog.vue";

import RoleAPI from "@/apis/RoleAPI.js";
import SusSystemAPI from "@/apis/SusSystemAPI";
import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource.js";
export default {
  components: {
    MsLoadingVue,
    MsButtonVue,
    MsInputSreach,
    MsNotificationVue,
    MsBoxVue,
    RoleTable,
    RoleDetail,
    RolePaging,
    RoleDialog,
  },
  created() {
    this.getListRoleBFindPaging();
    this.getListSubSystem();
  },
  watch: {
    /**
     * Sự kiện khi nhập ô tìm kiếm
     */
    keyword: function () {
      try {
        this.pageCurrent = 1;
        clearTimeout(this.timeOutKeyword);
        this.timeOutKeyword = setTimeout(
          () => this.getListRoleBFindPaging(),
          500
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    /**
     * Sự kiện click nút thêm
     * Author: TienDao (26/12/2022)
     */
    onClickBtnAdd() {
      try {
        this.modeForm = Enum.ModeForm.Add;
        this.isRoleDetail = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện click nút sửa từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnEdit(role) {
      try {
        this.modeForm = Enum.ModeForm.Update;
        this.roleID = role.RoleID;
        this.isRoleDetail = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện click nút nhân bản từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDulicate(role) {
      try {
        this.modeForm = Enum.ModeForm.Dulicate;
        this.roleID = role.RoleID;
        this.isRoleDetail = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện click nút xóa từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDelete(role) {
      try {
        this.roleID = role.RoleID;
        this.modeDialog = Enum.ModeDialog.Delete;
        this.descriptionDialog = Resource.Dialog.Description.Role.Delete;
        this.titleDialog = Resource.Dialog.Title.Role.Delete;
        this.isDialog = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Đóng form chi tiết
     * Author: TienDao (26/12/2022)
     */
    closeFormDetail() {
      try {
        this.isRoleDetail = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * API Lấy danh sách vai trò theo tìm kiếm / phân trang
     * Author: TienDao (12/01/2022)
     */
    getListRoleBFindPaging() {
      try {
        var filter = [];
        //Xử lý phần tìm kiếm bằng input
        if (this.keyword) {
          filter.push({
            Relationship: "AND",
            Column: "",
            Operator: "",
            Value: "",
            SubQuery: {
              Operator: "AND",
              Detail: [],
            },
          });
          this.roleField.forEach((field) => {
            filter[0].SubQuery.Detail.push({
              Relationship: "OR",
              Column: field,
              Operator: "Like",
              Value: this.keyword,
              SubQuery: null,
            });
          });
        }

        //Xử lý phần lọc theo trạng thái
        if(this.statusSeleted!=Enum.Role.RoleStatus.All){
          filter.push({
            Relationship: "AND",
            Column: "RoleStatus",
            Operator: "=",
            Value: `${this.statusSeleted}`,
            SubQuery: null,
          });
        }
        var sort = {
          Selector: this.fieldSort,
          TypeSort: this.typeSort,
        };
        this.isShowLoading();
        RoleAPI.filterAndPaging(
          filter,
          this.numberRecord,
          (this.pageCurrent - 1) * this.numberRecord,
          sort
        )
          .then((response) => {
            this.isShowLoading();
            this.listRole = response.data.ListData;
            this.totalRecords = response.data.TotalRecords;
            if (this.totalRecords == 0) {
              this.totalPages = 1;
            } else {
              var n = this.totalRecords / this.numberRecord;
              if (n > Math.floor(n)) {
                this.totalPages = Math.floor(n) + 1;
              } else {
                this.totalPages = n;
              }
            }

            // this.loader();
          })
          .catch((error) => {
            this.isShowLoading();
            if (error.response) {
              switch (error.response.status) {
                case Enum.StatusCode.BadRequest:
                  this.showDialogError(error.response.data.UserMsg);
                  break;
                case Enum.StatusCode.InternalServerError:
                  this.showDialogError(error.response.data.UserMsg);
                  break;
                default:
                  this.showDialogError(Resource.Dialog.TextError);
              }
            } else {
              this.showDialogError(Resource.Dialog.TextError);
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
     * Nhận sự kiện thay đổi trang từ RolePaging
     * @param {Number} numberRecord số bản ghi/ 1 trang
     * Author: TienDao (26/12/2022)
     */
    changeNumberRecord(numberRecord) {
      try {
        this.numberRecord = numberRecord;
        this.pageCurrent = 1;
        this.getListRoleBFindPaging();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ẩn/hiện loading
     * Author: TienDao (26/12/20220)
     */
    isShowLoading() {
      this.isLoading = !this.isLoading;
    },

    /**
     * Nhận sự kiện click nút trang trước
     * Author: TienDao (26/12/2022)
     */
    onClickPrePage() {
      try {
        if (this.pageCurrent > 1) {
          this.pageCurrent--;
          this.getListRoleBFindPaging();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Nhận sự kiện click nút trang sau
     * Author: TienDao (26/12/2022)
     */ onClickNextPage() {
      try {
        if (this.pageCurrent < this.totalPages) {
          this.pageCurrent++;
          this.getListRoleBFindPaging();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Đóng Dialog
     * Author: TienDao (27/12/2022)
     */
    closeDialog() {
      try {
        this.isDialog = false;
        if (this.isRoleDetail) {
          this.$refs.roleDetail.focusInputRoleName();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Đóng Dialog và thông báo xóa thành công
     * Author: TienDao (27/12/2022)
     */
    closeDialogAndDeleteSuccess() {
      this.closeDialog();
      this.showNotificationDeleteSuccess();
    },

    /**
     * Thông báo xóa thành công
     * Author: TienDao (27/12/2022)
     */
    showNotificationDeleteSuccess() {
      try {
        this.bodyTextNotification = Resource.Notification.Body.DeleteSuccess;
        this.tittleNotification = Resource.Notification.Title.Success;
        this.classNotification = "tittle-successful";
        this.iconNotification = "icon-success";
        this.isNotification = true;
        this.getListRoleBFindPaging();
        setTimeout(() => (this.isNotification = false), 3000);
        // icon-success
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiện Dialog lỗi
     * @param {String / Array} message Thông tin hiển thị
     * Author: TienDao (27/12/2022)
     */
    showDialogError(message) {
      try {
        this.closeDialog();
        this.modeDialog = Enum.ModeDialog.Error;
        this.titleDialog = Resource.Dialog.TitleError;
        if (typeof message == "string") {
          this.descriptionDialog = message;
        } else {
          this.descriptionDialog = "";
          for (const item of message) {
            this.descriptionDialog += item + "</>";
          }
        }
        this.isDialog = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Api lấy danh sách phân quyền
     * Author: TienDao (28/12/2022)
     */
    getListSubSystem() {
      try {
        this.isShowLoading();
        SusSystemAPI.getListSubSystem()
          .then((response) => {
            this.isShowLoading();
            this.listSubsytemAndPermission = response.data;
            // this.loader();
          })
          .catch((error) => {
            this.isShowLoading();
            if (error.response) {
              switch (error.response.status) {
                case Enum.StatusCode.BadRequest:
                  this.showDialogError(error.response.data.UserMsg);
                  break;
                case Enum.StatusCode.InternalServerError:
                  this.showDialogError(error.response.data.UserMsg);
                  break;
                default:
                  this.showDialogError(Resource.Dialog.TextError);
              }
            } else {
              this.showDialogError(Resource.Dialog.TextError);
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
     * Đóng form và thông báo thêm thành công
     * Author: TienDao (02/01/2023)
     */
    closeFormAndInsertUpdateSuccess() {
      this.closeFormDetail();
      this.showSuccess();
      this.getListRoleBFindPaging();
    },

    /**
     * Thông báo thêm/sửa thành công
     * Author: TienDao (02/01/2022)
     */
    showSuccess() {
      try {
        if (
          this.modeForm == Enum.ModeForm.Add ||
          this.modeForm == Enum.ModeForm.Dulicate
        ) {
          this.bodyTextNotification = Resource.Notification.Body.InsertSuccess;
        }
        if (this.modeForm == Enum.ModeForm.Update) {
          this.bodyTextNotification = Resource.Notification.Body.UpdateSuccess;
        }
        this.tittleNotification = Resource.Notification.Title.Success;
        this.classNotification = "tittle-successful";
        this.iconNotification = "icon-success";
        this.isNotification = true;
        setTimeout(() => (this.isNotification = false), 3000);
        // icon-success
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lọc theo trạng thái
     * @param {*} value Giá trị trạng thái
     * Author: TienDao (03/01/2023)
     */
    clickOnSeletedStatus(value) {
      try {
        console.log(value);
        this.pageCurrent=1;
        this.statusSeleted = value;
        this.getListRoleBFindPaging();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Click header table
     * @param {String} headerTable Tên cột
     * Author: TienDao (09/01/2023)
     */
    onClickHeaderTable(headerTable, typeSort) {
      // this.listRole = [];
      console.log(headerTable);
      console.log(typeSort);
      this.fieldSort = headerTable;
      this.typeSort = typeSort;
      this.getListRoleBFindPaging();
    },
  },
  data() {
    return {
      Resource,

      //TimeOut của tìm kiếm
      timeOutKeyword: null,

      //Trạng thái vai trò lọc
      statusSeleted: Enum.Role.RoleStatus.All,

      //Hiển thị form chi tiết
      isRoleDetail: false,

      //Kiểu form chi tiết
      modeForm: 0,

      //ID vai trò truyền vào Form
      roleID: "",

      //Hiện thị Dialog
      isDialog: false,

      //Trường hợp Dialog
      modeDialog: 0,

      //Nội dung Dialog
      descriptionDialog: "",

      //Tiêu đề Dialog
      titleDialog: "",

      //Danh sách vai trò
      listRole: [],

      // Từ khóa tìm kiếm
      keyword: "",

      //Trường sắp xếp
      fieldSort: "",

      //Kiểu sắp xếp
      typeSort: Enum.TypeSort.None,

      //Trang hiện tại
      pageCurrent: 1,

      //Số bản ghi / 1 trang
      numberRecord: 10,

      //Tổng số bản ghi
      totalRecords: 0,

      //Tổng số trang
      totalPages: 0,

      //Trạng thái hiện thị Loading
      isLoading: false,

      //Nội dung thông báo
      bodyTextNotification: "",

      //Tiêu đề thông báo
      tittleNotification: "",

      //Class thông báo
      classNotification: "",

      //Icon thông báo
      iconNotification: "",

      //Hiển thị thông báo
      isNotification: false,

      //Toàn bộ Danh sách phân quyền và quyền
      listSubsytemAndPermission: [],

      //
      roleStatus: [
        {
          Value: Enum.Role.RoleStatus.All,
          StatusName: Resource.Status.Role.All,
        },
        {
          Value: Enum.Role.RoleStatus.Active,
          StatusName: Resource.Status.Role.Active,
        },
        {
          Value: Enum.Role.RoleStatus.Deleted,
          StatusName: Resource.Status.Role.Deleted,
        },
      ],

      roleField: [
        "RoleName",
        "RoleDescription",
        "RoleStatus",
        "CreatedBy",
        "CreatedDate",
        "ModifiedBy",
        "ModifiedDate",
      ],
    };
  },
};
</script>
  
  <style>
@import url(@/css/base.css);
#process-permission {
  max-width: calc(100%);
}

#process-permission .body-custom {
  width: 100% !important;
  overflow: auto;
}

#process-permission .header-custom {
  margin: 0;
}

.content-main {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.bg-white {
  background: #fff;
}

#process-permission .body-custom .grid-no-paging {
  height: calc(100% - 60px);
}

.grid-container .dx-widget.dx-visibility-change-handler {
  max-width: none !important;
}

.grid-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  text-indent: 0;
  border: none;
}

.grid-container .paging {
  border-top: none;
  padding: 10px 0 !important;
  height: 56px;
  z-index: 8;
  position: relative;
  margin: 0 10px 8px 10px;
  background-color: #f9fafc !important;
}
</style>