<template>
  <button
    class="ms-component ms-button ms-button-filled ms-button-mi-plus-white"
    :class="{
      'ms-button-danger': isDanger,
      'ms-button-primary': isPrimary,
      'ms-button-secondary': isSecondary,
      includeIcon: includeIcon,
      'ms-button-padding': !includeIcon,
      'ms-button-padding--icon': includeIcon,
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
        :class="iconButton"
      ></i>
    </div>
    <span class="ms-button-text ms-button--text">{{ title }}</span>
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
      try {
        this.$refs.btn.focus();
      } catch (error) {
        console.log(error);
      }
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
    iconButton: String,

    //Nút có icon
    includeIcon: Boolean,
  },
};
</script>
<style>
@import url(@/css/base.css);
:root {
  --height-header: 56px;
  --width-sidebar: 200px;
  --border-radius: 4px;
  --primary: #0c9cdd;
  --primary-bg: #f3fbfd;
  --text-box-height: 36px;
  --combo-box-height: 36px;
  --input-border-radius: 3.5px;
  --text-primary-color: #171b2a;
  --text-secondary-color: #666;
  --text-disable-color: #9e9e9e;
  --text-white-primary-color: #fff;
  --text-white-secondary-color: #d7dae5;
  --text-placeholder-color: #9fa4b4;
  --text-error: #f75010;
  --border-color: #e7e8e9;
  --input-normal-border-color: #e0e0e0;
  --input-active-border-color: #0c9cdd;
  --input-hover-border-color: #0c9cdd;
  --input-disable-border: #e1e1e1;
  --input-disable-bg-color: #ebebeb;
  --input-error-border-color: #e61d1d;
  --combobox-highlight-bg-color: #f3fbfd;
  --combobox-highlight-bg-2-color: #f3fbfd;
  --combobox-highlight-color: #0c9cdd;
  --combobox-color: #000;
  --tab-color: #0c9cdd;
  --tab-bg: #0c9cdd;
  --tab-border: #0c9cdd;
  --button-height: 36px;
  --button-border-radius: 4px;
  --buton-icon-bg-hover: #eff1f6;
  --buton-icon-bg-press: #e8eaef;
  --buton-icon-bg-hover2: #dadce3;
  --buton-icon-bg-press2: #c5c9d2;
  --buton-icon-bg-hover3: #bff2da;
  --buton-icon-bg-press3: #aaeece;
  --button-primary-color: #fff;
  --button-primary-normal-bg-color: #0c9cdd;
  --button-primary-normal-border-color: #0c9cdd;
  --button-primary-hover-bg-color: #0c9cdd;
  --button-primary-hover-border-color: #0c9cdd;
  --button-primary-active-bg-color: #0c9cdd;
  --button-primary-active-border-color: #0c9cdd;
  --button-primary-disabled-color: hsla(0, 0%, 100%, 0.6);
  --button-primary-disabled-bg-color: #0c9cdd;
  --button-primary-disabled-border-color: #0c9cdd;
  --button-primary-focus-bg-color: #0c9cdd;
  --button-primary-focus-border-color: #0c9cdd;
  --grid-loading-color: 52, 176, 87;
  --grid-row-hover-bg: #eff1f6;
  --grid-border: #dadce3;
  --grid-header-bg-dark: #e8eaef;
  --dropdown-item-hover: #eff1f6;
  --dropdown-item-active-color: #25b973;
  --date-picker-active-bg: #0c9cdd;
  --date-picker-range-bg: #f3fbfd;
  --date-picker-hover-bg: #f3fbfd;
  --date-picker-color-today: #0c9cdd;
  --combobox-selected-bg: #e6e8ed;
  --icon-deault-color: #686c7b;
}

button {
  font-family: unset;
}

body button {
  outline: none;
}

button {
  font-weight: 400;
}

.ms-button {
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: #fff;
  box-sizing: border-box;
  background: transparent;
  height: 36px;
}

.includeIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  float: 0;
}

.ms-button {
  margin-right: 12px;
}

.ms-button:last-child {
  margin: 0;
}

.ms-button.ms-button-filled.ms-button-primary {
  background-color: var(--button-primary-normal-bg-color);
  color: var(--button-primary-color);
  border: 1px solid var(--button-primary-normal-border-color);
}

.ms-button--background {
  border-radius: 50%;
  width: 10px;
  position: absolute;
  height: 10px;
  z-index: 0;
  transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  box-shadow: inset 0 0 60px 0 hsl(0deg 0% 100% / 50%);
}

.ms-button--text {
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

button .ms-button-text,
button .ms-button-text span {
  white-space: nowrap;
  font-weight: 500;
}

.ms-button--icon {
  display: flex;
  position: relative;
  font-size: 20px;
}

button {
  font-weight: 400;
}

.ms-button {
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: #fff;
  box-sizing: border-box;
  background: transparent;
  height: 36px;
}

.includeIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  float: 0;
}

/* .ms-button {
  margin-right: 12px;
} */

.ms-button:last-child {
  margin: 0;
}

.ms-button.ms-button-filled.ms-button-primary {
  background-color: var(--button-primary-normal-bg-color);
  color: var(--button-primary-color);
  border: 1px solid var(--button-primary-normal-border-color);
  box-sizing: border-box;
}

.ms-button.ms-button-filled.ms-button-primary:hover {
  background-color: var(--button-primary-hover-bg-color);
  color: var(--button-primary-color);
  border: 1px solid var(--button-primary-hover-border-color);
  box-sizing: border-box;
}

.ms-button.ms-button-filled.ms-button-primary:active {
  background-color: var(--button-primary-active-bg-color);
  color: var(--button-primary-color);
  border: 1px solid var(--button-primary-active-border-color);
  box-sizing: border-box;
}

.ms-button.ms-button-filled.ms-button-primary:focus {
  background-color: var(--button-primary-focus-bg-color);
  color: var(--button-primary-color);
  border: 1px solid var(--button-primary-focus-border-color);
  box-sizing: border-box;
}

.ms-button--background {
  border-radius: 50%;
  width: 10px;
  position: absolute;
  height: 10px;
  z-index: 0;
  transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  box-shadow: inset 0 0 60px 0 hsl(0deg 0% 100% / 50%);
}

.ms-button.ms-button-filled.ms-button-secondary {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  color: #1e1e1e;
}

.ms-button.ms-button-filled.ms-button-secondary:hover {
  background-color: #dbf4ff;
  color: #0c9cdd;
  border: 1px solid #eaebef;
}

.ms-button.ms-button-filled.ms-button-secondary:active,
.ms-button.ms-button-filled.ms-button-secondary:focus {
  background-color: #f5f5f5;
  color: #0c9cdd;
  border: 1px solid #eaebef;
}

.ms-button--text {
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ms-button-padding--icon {
  padding: 0px 16px 0px 12px;
}

.ms-button-padding {
  padding: 0px 16px 0px 16px;
}

.ms-button.ms-button-filled.ms-button-danger:focus,
.ms-button.ms-button-filled.ms-button-danger:hover {
  background-color: #d81010;
  color: #fff;
  border: none;
}

.ms-button.ms-button-filled.ms-button-danger {
  background-color: #e61d1d;
  color: #fff;
  border: none;
}
</style>
 