<template>
  <div
    class="flex flex-col"
    style="min-width: 200px; height: 100%; padding-top: 16px; background: white"
  >
    <router-link
      v-for="(item, index) in tabItems"
      :key="index"
      class="setting-tab-item flex align-items-center cursor-pointer"
      :class="[{ 'item-activated': indexZ == index }]"
      :to="item.route"
      @click="indexZ = index"
    >
      <div :class="['icon-tab', item.icon]"></div>
      <div class="name-tab" :class="[{ 'item-activated': indexZ == index }]">{{ item.text }}</div>
    </router-link>
  </div>
</template> 

<script>
import Resource from "@/js/resource/resource";
export default {
  data() {
    return {
      //Index hiển thị màu sidebar
      indexZ: -1,

      //Item trên sidebar
      tabItems: [
        {
          icon: "icon-employee",
          route: "/setting/user",
          text: Resource.Setting.User, //resouce
        },
        {
          icon: " icon-protect",
          route: "/setting/role",
          text: Resource.Setting.Role,
        },
        {
          icon: "icon-multiple-user",
          route: "/setting/groupUser",
          text: Resource.Setting.GroupUser,
        },
        {
          icon: " icon-share-link",
          route: "/setting/connect",
          text: Resource.Setting.Connect,
        },
      ],
    };
  },
};
</script>

<style>
@import url(@/css/base.css);
/* @import url(./TheSidebar.css); */
.item-activated .icon-tab {
  background-color: #0c9cdd !important;
}
.item-activated .name-tab {
  color: #0c9cdd !important;
}
.item-activated {
  background-color: #f3fbfd;
}
.setting-tab-item {
  height: 44px;
  padding-left: 24px;
}
.setting-tab-item .icon-tab {
  margin-right: 8px;
}
.setting-tab-item .name-tab {
  line-height: 44px;
}
</style>