<template>
  <div class="main-nav">
    <div class="nav-container flex justify-between">
      <div class="flex flex-1">
        <div class="box-app-menu"></div>
        <div class="nav-logo flex-c-m">Quy trình</div>
        <div class="top-menu-container flex-1 check-license-expired">
          <div class="flex-m">
            <div class="menu-item">
              <div class="menu-item-name">Lượt chạy</div>
            </div>
            <div class="menu-item">
              <div class="menu-item-name">Tài liệu quy trình</div>
            </div>
            <div class="menu-item">
              <div class="menu-item-name">Thiết kế quy trình</div>
            </div>
            <div class="menu-item">
              <div class="menu-item-name">Báo cáo</div>
            </div>
            <button type="button" class="ms-con-dropdown parent-dropdown">
              <div class="button-comand-wrap btn-more m-r-20">
                <div class="mi-threedot"></div>
              </div>
            </button>
            <div class="btn-run-process">
              <MsButtonVue
                :isPrimary="true"
                :title="'Chạy quy trình'"
                :includeIcon="true"
                :iconButton="'icon-run-process'"
              />
            </div>
            <div class="flex-1 flex-r-m"></div>
          </div>
        </div>
      </div>
      <div class="flex-m">
        <div class="check-license-expired">
          <MsInputSreach :placeholderText="'Tìm kiếm'" :iconPre="'mi-search'" />
        </div>

        <div class="notify check-license-expired apui-notification-trigger dark" style="position: relative;"></div>

        <div class="right-action user">
          <div class="user-avatar" style="position: relative;">
            <div class="apui-user-avatar">
              <img src="https://testcdnamisapp.misacdn.net/APIS/PlatformAPI/api/Avatar/0b4ae59c-5c22-43b4-9f5c-7650b8e636e9/K65TR3EN.jpg?avatarID=053e840e-4aba-421c-8417-4e3dddf494ec&width=64&height=64&v=20211108">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsInputSreach from "@/components/base/MsInput/MsInputSreach.vue";
export default {
  components: {
    MsButtonVue,
    MsInputSreach,
  },
};
</script>

<style>
@import url(@/css/base.css);
@import url(./TheHeader.css);
.btn-header {
  width: auto !important;
  height: 36px !important;
  border-radius: 4px;
  padding: 0px 16px 0px 12px;
  min-width: 80px !important;
}
</style>