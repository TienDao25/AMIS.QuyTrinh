<template>
  <div id="process-permission" style="height: 100%">
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
                />
              </div>
            </div>
          </div>

          <div class="w-full grid-no-paging bg-white">
            <div class="grid-container" style="height: calc(100% - 48px)">
              <RoleTable
                @onClickBtnEdit="onClickBtnEdit"
                @onClickBtnDulicate="onClickBtnDulicate"
                @onClickBtnDelete="onClickBtnDelete"
              />
            </div>
            <div class="paging">
              <RolePaging />
            </div>
          </div>
        </div>
      </div>
    </div>

    <RoleDetail
      v-if="isRoleDetail"
      :role="role"
      @closeFormDetail="closeFormDetail"
    />
    <MsDialogVue
    v-if="isDialog"
      :descriptionDialog="'Bạn có chắc chắn muốn xóa vai trò này không?'"
      :titleDialog="'Xóa vai trò'"
    />
  </div>
</template>
  
  <script>
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsInputSreach from "@/components/base/MsInput/MsInputSreach.vue";
import RoleTable from "@/views/role/RoleTable/RoleTable.vue";
import RoleDetail from "@/views/role/RoleDetail/RoleDetail.vue";
import RolePaging from "@/views/role/RolePaging/RolePaging.vue";
import MsDialogVue from "@/components/base/MsDialog/MsDialog.vue";

// import axios from "axios";
// import API from "@/js/resource/API.js";
// import Enum from "@/js/enum/enum";
export default {
  components: {
    MsButtonVue,
    MsDialogVue,
    MsInputSreach,
    RoleTable,
    RoleDetail,
    RolePaging,
  },
  methods: {
    /**
     * Sự kiện click nút sửa từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnEdit(role) {
      this.isRoleDetail = true;
      this.role = role;
    },

    /**
     * Sự kiện click nút sửa từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDulicate(role) {
      this.isRoleDetail = true;
      this.role = role;
    },

    /**
     * Sự kiện click nút sửa từ table
     * @param {Object} role obj vai trò
     * Author: TienDao (25/12/2022)
     */
    onClickBtnDelete(role) {
      this.isRoleDetail = true;
      this.role = role;
    },

    /**
     * Đóng form chi tiết
     * Author: TienDao (26/12/2022)
     */
    closeFormDetail() {
      this.isRoleDetail = false;
    },

    /**
     * Lấy danh sách vai trò theo tìm kiếm / phân trang
     */
    getListRoleBFindPaging(){
      // this.params = {
      //   keyword: this.keyword,
      //   limit: this.numberRecord,
      //   offset: (this.pageCurrent - 1) * this.numberRecord,
      // };
      // // Nối params
      // var url = new URL(`${API.BASE_API_ROLE}/`);
      // Object.keys(this.params).forEach((key) => {
      //   return url.searchParams.append(key, this.params[key]);
      // });
      // //Gọi api
      // axios
      //   .get(url)
      //   .then((response) => {
      //     console.log(response);
      //     this.listEmployee = response.data.ListEmployee;
      //     this.totalRecords = response.data.TotalRecords;
      //     if (this.totalRecords == 0) {
      //       this.totalPages = 1;
      //     } else {
      //       var n = this.totalRecords / this.numberRecord;
      //       if (n > Math.floor(n)) {
      //         this.totalPages = Math.floor(n) + 1;
      //       } else {
      //         this.totalPages = n;
      //       }
      //     }

      //     // this.loader();
      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       switch (error.response.status) {
      //         case Enum.StatusCode.BadRequest:
      //           console.log(error.response.data.moreInfo);
      //           break;
      //         case Enum.StatusCode.InternalServerError:
      //           console.log(error.response.data.userMsg);
      //           break;
      //       }
      //     } else {
      //       this.showDialogError(Resource.Dialog.Text.Error);
      //     }
      //   })
      //   .finally(() => {
      //     // this.isShowLoading();
      //   });
    }
  },
  data() {
    return {
      //Hiển thị form chi tiết
      isRoleDetail: false,

      //Hiện thị Dialog
      isDialog:false,
    };
  },
};
</script>
  
  <style>
@import url(@/css/base.css);
@import url(./RoleList.css);
</style>