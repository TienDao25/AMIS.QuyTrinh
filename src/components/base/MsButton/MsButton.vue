<template>
  <button
    class="
      ms-component
      ms-button
      ms-button-filled
      ms-button-mi-plus-white
    "
    :class="{
      'ms-button-primary':isPrimary,
      'ms-button-secondary':isSecondary,
      'includeIcon':includeIcon,
      'ms-button-padding':!includeIcon,
      'ms-button-padding--icon':includeIcon,
    }"
    style="
      width: auto !important;
      height: 36px !important;
      border-radius: 4px;
      min-width: 80px !important;
    "
  >
    <span
      class="ms-button-backgroundx ms-button--background"
      style="
        opacity: 1;
        left: 20px;
        top: 20px;
        width: 0px;
        height: 0px;
        transition: width 0.3s ease 0s, height 0.3s ease 0s,
          opacity 0.3s ease 0s;
      "
    ></span>
    <div
      class="
        ms-icon-default
        flex
        items-center
        justify-center
        ms-button--icon
        ms-icon-white
      "
      size="16px"
      style="order: 0; margin-right: 4px; margin-left: 0px"
    >
      <i
        size="16px"
        class="ms-icon notranslate icon-scale"
        :class=iconButton
      ></i>
    </div>
    <span class="ms-button-text ms-button--text"
      >{{ title }}</span
    >
    <span
      class="ms-button-linex"
      style="top: auto; bottom: -2px; left: 50%; transform: translate(-50%)"
    ></span>
  </button>
</template>
 
 <script>
export default {
  methods: {
    /**
     * Focus nút
     * Author: TienDao (08/12/2022)
     */
    focusBtn() {
      this.$refs.btn.focus();
    },
  },
  props: {
    //Text hiện thị
    title: {
      type: String,
      default: "Button",
    },

    //Loại nút
    isPrimary: {
      type: Boolean,
      default: false,
    },

    //Loại nút
    isSecondary: {
      type: Boolean,
      default: false,
    },

    //Loại nút
    isDanger: {
      type: Boolean,
      default: false,
    },

    //Trạng thái nút
    isDisable: {
      type: Boolean,
      default: false,
    },

    //Tabindex
    tabIndex: Number,

    //Icon nút
    iconButton:String,

    //Nút có icon
    includeIcon:Boolean
  },
};
</script>
<style>
@import url(./MsButton.css);
@import url(@/css/base.css);
</style>
 