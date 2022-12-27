<template>
  <div class="main-nav">
    <div class="nav-container flex justify-between">
      <div class="flex flex-1">
        <div class="box-app-menu"></div>
        <div class="nav-logo flex-c-m">Quy trình</div>
        <div class="top-menu-container flex-1 check-license-expired">
          <div class="flex-m">
            <router-link
              class="menu-item"
              v-for="(item, index) in header"
              :key="index"
              :to="item.route"
            >
              <div class="menu-item-name">{{ item.Text }}</div>
            </router-link>
            <!-- <div class="menu-item">
              <div class="menu-item-name">Tài liệu quy trình</div>
            </div>
            <div class="menu-item">
              <div class="menu-item-name">Thiết kế quy trình</div>
            </div>
            <div class="menu-item">
              <div class="menu-item-name">Báo cáo</div>
            </div> -->
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

        <div
          class="notify check-license-expired apui-notification-trigger dark"
          style="position: relative"
        ></div>

        <div class="right-action user">
          <div class="user-avatar" style="position: relative">
            <div class="apui-user-avatar">
              <img
                src="https://testcdnamisapp.misacdn.net/APIS/PlatformAPI/api/Avatar/0b4ae59c-5c22-43b4-9f5c-7650b8e636e9/K65TR3EN.jpg?avatarID=053e840e-4aba-421c-8417-4e3dddf494ec&width=64&height=64&v=20211108"
              />
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

import RESOURCE from "@/js/resource/resource";
export default {
  components: {
    MsButtonVue,
    MsInputSreach,
  },
  data() {
    return {
      header: [
        {
          Text: RESOURCE.HEADER.Process,
          route: "/process",
        },
        {
          Text: RESOURCE.HEADER.Document,
          route: "/document",
        },
        {
          Text: RESOURCE.HEADER.Definition,
          route: "/definition",
        },
        {
          Text: RESOURCE.HEADER.Report,
          route: "/report",
        },
      ],
      subHeader: [
        {
          Text: RESOURCE.HEADER.Brief,
          route: "/brief",
        },
        {
          Text: RESOURCE.HEADER.Setting,
          route: "/setting",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
/* @import url(./TheHeader.css); */
.btn-header {
  width: auto !important;
  height: 36px !important;
  border-radius: 4px;
  padding: 0px 16px 0px 12px;
  min-width: 80px !important;
}
.main-nav {
  position: relative;
  height: 56px;
  background: #fff;
  padding: 0 16px 0 0;
  border-bottom: 1px solid #e7e8e9;
}

.nav-container {
  height: 100%;
}

.box-app-menu {
  width: 36px;
  height: 36px;
  margin: auto 16px;
  background-image: url(@/assets/img/icon-app-gray.eec2ff5c.svg);
  background-position: 50%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.nav-logo {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  padding: 0 10px 0 44px;
  position: relative;
  font-weight: 600;
  margin-right: 34px;
}

.nav-logo:before {
  content: "";
  display: inline-block;
  height: 32px;
  width: 32px;
  top: 12px;
  left: 0;
  position: absolute;
  background: transparent url(@/assets/img/logo.5df3d448.svg) no-repeat 0 0;
}

.top-menu-container {
  display: flex;
  height: 100%;
  justify-content: space-between;
}

.menu-item {
  height: 100%;
  margin-right: 36px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: space-between;
}

.menu-item-name {
  margin-top: 20px;
  font-weight: 500;
}

.ms-con-dropdown.parent-dropdown {
  background: transparent;
}

.ms-con-dropdown {
  position: relative;
  display: inline-block;
  border: 0;
  cursor: pointer;
  padding: 0 !important;
  color: var(--text-primary-color);
}

.ms-con-dropdown {
  pointer-events: none;
}

.btn-more.button-comand-wrap {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex !important;
  margin-right: 16px;
  margin-left: -8px;
  cursor: pointer;
}

.btn-run-process {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-action {
  height: 100%;
  width: 48px;
  position: relative;
}
.right-action.user {
  text-align: center;
  align-items: center;
  display: flex;
}
.right-action.user .user-avatar {
  margin: auto;
}
.apui-user-avatar {
  min-width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  font-size: 11px;
  color: #fff;
  overflow: hidden;
}
.apui-user-avatar img {
  border-radius: 50%;
  height: 32px;
  width: 32px;
  display: block;
}
.apui-notification-trigger {
  border-radius: 50%;
  cursor: pointer;
  width: 32px;
  margin-right: 24px;
  height: 32px;
  font-size: 14px;
  font-size: 14px;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 2px;
  background-image: url(@/assets/img/icon-notification-dark-thick.svg);
}
</style>