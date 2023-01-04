<template>
  <div class="main-container">
    <TheHeader />
    <div class="main-right flex-column">
      <div class="main-view flex flex-column">
        <div class="flex" style="height: 100%; margin-left: -6px">
          <TheSidebar />
          <div class="content-setting w-full" style="max-width: calc(100% - 200px);">
            <TheMain />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader/TheHeader.vue";
import TheSidebar from "@/components/layout/TheSidebar/TheSidebar.vue";
import TheMain from "@/components/layout/TheMain/TheMain.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    TheSidebar,
    TheMain,
  },
};
</script>

<style>
@import url(@/css/base.css);
.main-right {
  transition: padding 0.2s;
  height: calc(100vh - 56px);
  background-color: #f5f8f9;
}
.main-view {
  min-width: 500px;
  min-height: 500px;
  height: 100%;
}
.main-view {
  position: relative;
}
</style>