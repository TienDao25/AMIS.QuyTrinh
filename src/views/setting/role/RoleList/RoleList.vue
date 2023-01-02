<template>
  <div id="process-permission" style="height: 100%; width: calc(100%)">
    <div
      v-if="!isRoleDetail"
      class="h-full container body-custom"
      style="padding: 16px 24px"
    >
      <div class="content-header p-b-16">
        <div class="flex justify-between items-center header-custom">
          <div class="font-20 bold">Vai trò</div>
          <MsButtonVue
            :isPrimary="true"
            :title="'Thêm mới'"
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
              <div style="height: 36px; width: 240px">
                <MsInputSreach
                  :placeholderText="'Tìm kiếm vai trò'"
                  :iconPre="'mi-search'"
                  v-model="keyword"
                />
              </div>
            </div>
          </div>

          <div class="w-full grid-no-paging bg-white">
            <div class="grid-container" style="height: calc(100% - 48px)">
              <div class="h-full">
                <RoleTable
                  :listRole="listRole"
                  @onClickBtnEdit="onClickBtnEdit"
                  @onClickBtnDulicate="onClickBtnDulicate"
                  @onClickBtnDelete="onClickBtnDelete"
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
      @closeFormAndAddSuccess="closeFormAndAddSuccess"
    />
    <RoleDialog
      v-if="isDialog"
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
      this.pageCurrent = 1;
      this.getListRoleBFindPaging();
    },
  },
  methods: {
    /**
     * Sự kiện click nút thêm
     * Author: TienDao (26/12/2022)
     */
    onClickBtnAdd() {
      this.modeForm = Enum.ModeForm.Add;
      this.isRoleDetail = true;
    },

    /**
     * Sự kiện click nút sửa từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnEdit(role) {
      this.modeForm = Enum.ModeForm.Update;
      this.roleID = role.RoleID;
      this.isRoleDetail = true;
    },

    /**
     * Sự kiện click nút nhân bản từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDulicate(role) {
      this.modeForm = Enum.ModeForm.Dulicate;
      this.roleID = role.RoleID;
      this.isRoleDetail = true;
    },

    /**
     * Sự kiện click nút xóa từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDelete(role) {
      console.log(role.RoleID);
      this.roleID = role.RoleID;
      this.modeDialog = Enum.ModeDialog.Delete;
      this.descriptionDialog = Resource.Dialog.Description.Role.Delete;
      this.titleDialog = Resource.Dialog.Title.Role.Delete;
      this.isDialog = true;
    },

    /**
     * Đóng form chi tiết
     * Author: TienDao (26/12/2022)
     */
    closeFormDetail() {
      this.isRoleDetail = false;
    },

    /**
     * API Lấy danh sách vai trò theo tìm kiếm / phân trang
     * Author: TienDao (26/12/2022)
     */
    getListRoleBFindPaging() {
      this.isShowLoading();
      RoleAPI.getListRolesByFilterPaging(
        this.keyword,
        this.numberRecord,
        (this.pageCurrent - 1) * this.numberRecord,
        this.fieldSort,
        this.typeSort
      )
        .then((response) => {
          this.isShowLoading();
          console.log(response);
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
    },

    /**
     * Nhận sự kiện thay đổi trang từ RolePaging
     * @param {Number} numberRecord số bản ghi/ 1 trang
     * Author: TienDao (26/12/2022)
     */
    changeNumberRecord(numberRecord) {
      this.numberRecord = numberRecord;
      this.pageCurrent = 1;
      this.getListRoleBFindPaging();
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
      if (this.pageCurrent > 1) {
        this.pageCurrent--;
        this.getListRoleBFindPaging();
      }
    },
    /**
     * Nhận sự kiện click nút trang sau
     * Author: TienDao (26/12/2022)
     */ onClickNextPage() {
      if (this.pageCurrent < this.totalPages) {
        this.pageCurrent++;
        this.getListRoleBFindPaging();
      }
    },

    /**
     * Đóng Dialog
     * Author: TienDao (27/12/2022)
     */
    closeDialog() {
      this.isDialog = false;
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
      this.bodyTextNotification = Resource.Notification.Body.DeleteSuccess;
      this.tittleNotification = Resource.Notification.Title.Success;
      this.classNotification = "tittle-successful";
      this.iconNotification = "icon-success";
      this.isNotification = true;
      this.getListRoleBFindPaging();
      setTimeout(() => (this.isNotification = false), 3000);
      // icon-success
    },

    /**
     * Hiện Dialog lỗi
     * @param {String / Array} message Thông tin hiển thị
     * Author: TienDao (27/12/2022)
     */
    showDialogError(message) {
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
    },

    /**
     * Api lấy danh sách phân quyền
     * Author: TienDao (28/12/2022)
     */
    getListSubSystem() {
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
    },

    /**
     * Đóng form và thông báo thêm thành công
     * Author: TienDao (02/01/2023)
     */
    closeFormAndAddSuccess() {
      this.closeFormDetail();
      this.showAddSuccess();
      this.getListRoleBFindPaging();
    },

    /**
     * Thông báo thêm thành công
     * Author: TienDao (02/01/2022)
     */
    showAddSuccess() {
      this.bodyTextNotification = Resource.Notification.Body.AddSuccess;
      this.tittleNotification = Resource.Notification.Title.Success;
      this.classNotification = "tittle-successful";
      this.iconNotification = "icon-success";
      this.isNotification = true;
      this.getListRoleBFindPaging();
      setTimeout(() => (this.isNotification = false), 3000);
      // icon-success
    },
  },
  data() {
    return {
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
      typeSort: "",

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
    };
  },
};
</script>
  
  <style>
@import url(@/css/base.css);
@import url(./RoleList.css);
</style>