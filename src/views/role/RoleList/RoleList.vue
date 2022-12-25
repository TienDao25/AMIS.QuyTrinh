<template>
  <div id="process-permission">
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
        style="background: transparent; height: calc(100vh - 148px + 16px)"
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
            <div class="grid-container" style="height: calc(100% - 48px );">
              <RoleTable @onClickBtnEdit="onClickBtnEdit" />
            </div>
            <div class="paging">
              <RolePaging />
            </div>
          </div>
        </div>
      </div>
    </div>

    <RoleDetail v-if="isRoleDetail" :role="role" />
  </div>
</template>
  
  <script>
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsInputSreach from "@/components/base/MsInput/MsInputSreach.vue";
import RoleTable from "@/views/role/RoleTable/RoleTable.vue";
import RoleDetail from "@/views/role/RoleDetail/RoleDetail.vue";
import RolePaging from "@/views/role/RolePaging/RolePaging.vue";

export default {
  components: {
    MsButtonVue,
    MsInputSreach,
    RoleTable,
    RoleDetail,
    RolePaging,
  },
  methods: {
    /**
     * Sự kiện click nút sửa từ table
     */
    onClickBtnEdit(role) {
      this.isRoleDetail = true;
      this.role = role;
    },
  },
  data() {
    return {
      isRoleDetail: false,
    };
  },
};
</script>
  
  <style>
@import url(@/css/base.css);
@import url(./RoleList.css);
</style>