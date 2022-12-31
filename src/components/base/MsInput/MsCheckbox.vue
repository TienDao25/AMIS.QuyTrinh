<template>
  <label class="container ms-checkbox custom-checkbox">
    <input
      type="checkbox"
      :disabled="isDisabled"
      class="ms-checkbox--input"
      :value="isIcon"
    />
    <span
      class="icon-square-check-primary checkmark"
      :class="{
        'icon-square-check-primary': isIcon,
        'icon-square-uncheck': !isIcon,
        disabled: isDisabled,
      }"
      @click="onClickCheckbox"
    ></span>
    <!-- icon-square-uncheck -->
  </label>
</template>

<script>
export default {
  props: {
    //Trạng thái check box
    isDisabled: Boolean,

    //Giá trị checkbox
    modelValue:Boolean,
  },
  watch:{
    modelValue:function(){
      this.isIcon = this.modelValue;
    }
  },
  methods: {
    /**
     * Click checkbox
     * Author:TienDao(28/12/2022)
     */
    onClickCheckbox() {
      this.isIcon = !this.isIcon;
      this.$emit("update:modelValue", this.isIcon);
      this.$emit("clickOnCheckbox", this.isIcon);
    },
  },
  data() {
    return {
      isIcon: false,
    };
  },
};
</script>

<style scoped>
.custom-checkbox {
  margin-top: -25px;
}
.ms-checkbox--input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.ms-checkbox .ms-checkbox--input {
  height: inherit;
}
input:disabled {
  color: #d7dce3 !important;
}
.checkmark {
  position: absolute;
  left: 0;
  height: 26px;
  width: 22px;
}
.disabled {
  opacity: 0.5 !important;
  pointer-events: none;
}
.ms-checkbox .checkmark {
  top: 0;
}
.container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 1px 0 0 32px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100%;
}
.ms-checkbox:focus .checkmark:not(.disabled),
.ms-checkbox:focus .icon-square-check-primary.checkmark,
.ms-checkbox:hover .checkmark:not(.disabled),
.ms-checkbox:hover .icon-square-check-primary.checkmark {
  border-radius: 50%;
  background-color: var(--primary) !important;
}
</style>