<template>
  <div class="grid-navigation">
    <div class="page-total flex flex items-center">
      Tổng
      <b style="padding: 0px 6px">12</b>
    </div>
    <div class="page-size-selector flex items-center">
      <div class="page-info">Từ <b>1</b> đến <b>12</b> bản ghi</div>
      <div class="page-next-preview">
        <div
          class="
            ms-icon-container
            flex
            items-center
            justify-center
            ms-icon-
            btn-icon-1
          "
        >
          <MsButtonIconVue
            :classIcon="'mi-chevron-left'"
            :titleIcon="'Trang trước'"
          />
        </div>
        <div
          class="
            ms-icon-container
            flex
            items-center
            justify-center
            ms-icon-
            btn-icon-1
          "
        >
          <MsButtonIconVue
            :classIcon="'mi-chevron-right'"
            :titleIcon="'Trang sau'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MsButtonIconVue from "@/components/base/MsButton/MsButtonIcon.vue";

export default {
  components: {
    MsButtonIconVue,
  },
};
</script>

<style>
@import url(@/css/base.css);
@import url(./RolePaging.css);

.grid-navigation {
  display: flex;
  color: var(--text-primary-color);
  border-top: 1px solid #e2e8f0 ;
  height: 48px;
  box-sizing: border-box;
}
.grid-navigation .page-total {
  flex: 1;
  /* line-height: 48px; */
  margin-left: 16px;
  
}
.page-size-selector {
  display: flex;
}
.page-info {
  /* height: 48px; */
  /* line-height: 48px; */
  padding: 0 24px;
}
.page-next-preview {
  width: 70px;
  /* height: 48px; */
  display: flex;
  margin-right: 16px;
}
</style>