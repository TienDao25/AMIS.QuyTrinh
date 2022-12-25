<template>
  <div class="dialog">
    <div class="dialog__overlay">
      <div class="dialog__container">
        <div class="dialog__title">{{ titleDialog }}</div>
        <div class="dialog__content">
          <div class="dialog__icon" v-if="iconDialog">
            <img src="" alt="icon-warning" />
          </div>
          <div class="dialog__description" v-html="descriptionDialog"></div>
        </div>
        <div class="dialog__button">
          <MsButtonVue :isPrimary="true" :includeIcon="false" :title="'Xóa'" />
          <MsButtonVue :isSecondary="true" :includeIcon="false" :title="'Hủy'" />
        </div>
        <div class="dialog__exit" style="display: none">
          <div class="m-icon icon-exit" title="Đóng"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
export default {
  components: {
    MsButtonVue,
  },
  props: {
    //Icon Dialog
    iconDialog: String,

    //Tiêu đề Dialog
    titleDialog: String,

    //Nội dung Dialog
    descriptionDialog: String,
  },
};
</script>

<style>
@import url(@/css/base.css);
@import url(./MsDialog.css);
</style>