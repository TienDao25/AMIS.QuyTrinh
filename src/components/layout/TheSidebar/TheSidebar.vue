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
      <div class="name-tab">{{ item.text }}</div>
    </router-link>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      indexZ: -1,
      tabItems: [
        {
          icon: "icon-employee",
          route: "/user",
          text: "Người dùng", //resouce
        },
        {
          icon: " icon-protect",
          route: "/role",
          text: "Vai trò",
        },
        {
          icon: "icon-multiple-user",
          route: "/groupUser",
          text: "Nhóm người dùng",
        },
        {
          icon: " icon-share-link",
          route: "/connect",
          text: "Kết nối",
        },
      ],
    };
  },
};
</script>

<style>
@import url(@/css/base.css);
@import url(./TheSidebar.css);
.item-activated .icon-tab {
  background-color: #0c9cdd !important;
}
.item-activated {
  background-color: #f3fbfd;
}
</style>