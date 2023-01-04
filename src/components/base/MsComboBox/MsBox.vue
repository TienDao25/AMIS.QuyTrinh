<template>
  <div
    class="el-wrapper"
    :class="[{ error: !isValid }, { 'have-icon': iconClass }, wrapperClass]"
  >
    <label
      v-if="label"
      :for="id"
      class="el__label"
      :class="[labelClass, { ' have-tooltip': tooltip }]"
      :tooltip="tooltip"
      :title="tooltip"
      >{{ label }}
      <span v-if="isRequired" style="color: var(--error-color)">*</span></label
    >
    <div class="relative" :class="inputWrapperClass">
      <i :class="'icon-24 ' + iconClass" v-if="iconClass"></i>
      <DxSelectBox
        :data-source="dataSource"
        :value-expr="valueExpr"
        :display-expr="displayExpr"
        :placeholder="placeholder"
        :width="width"
        :value="value"
        :selectedItem="selectedItem"
        :selection-mode="selectionMode"
        :noDataText="noDataText"
        @value-changed="valueChanged"
        ref="selectBox"
      />
    </div>
    <span v-if="!isValid" class="err-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
/* eslint-disable */
import { DxSelectBox } from "devextreme-vue/select-box";
export default {
  name: "BaseSelectBox",
  props: {
    //Data
    dataSource: {
      type: Array,
    },
    iconClass: {
      type: String,
    },
    wrapperClass: String,
    //giá trị chọn
    valueExpr: [String, Number, Object],
    //giá trị hiển thị
    displayExpr: [String, Number, Object],
    //Text place
    placeholder: String,
    selectionMode: String,

    //Bắt buộc
    isRequired: Boolean,

    //class tiêu đề 
    labelClass: String,

    //Chú thích
    tooltip: String,
    inputWrapperClass: String,
    label: String,
    width: String,
    noDataText: String,
    rules: Array,
    value: [Object, String],
    selectedItem: [Object, String],
  },
  components: {
    DxSelectBox,
  },
  emits: ["valueChanged"],
  data() {
    return {
      isValid: true,
      selectedValue: null,
      errorMessage: "",
    };
  },
  methods: {
    /**
     * Truyền giá trị
     * Author: TienDao (03/01/2023)
     */
    valueChanged(e) {
      this.selectedValue = e.value;
      this.isValid = true;
      this.$emit("valueChanged", e.value);
    },

    /**
     * Kiểm tra để trống
     * Author: TienDao(03/01/2023)
     * @param {*} event
     */
    checkRequired(message) {
      let value = this.selectedValue;
      if (value) {
        return true;
      }
      this.errorMessage = message;
      return false;
    },
  },
};
</script>

<style >
@import url(@/css/base.css);
.role-icon {
  position: absolute;
  top: 49%;
  transform: translateY(-50%);
  left: 8px;
  z-index: 1;
}
.icon-role-setting-user {
  -webkit-mask-position: -621px -278px;
  -moz-mask-position: -621px -278px;
  -ms-mask-position: -621px -278px;
  -o-mask-position: -621px -278px;
  mask-position: -621px -278px;
  background-color: var(--icon-default-color);
}
.have-icon .dx-dropdowneditor {
  position: relative;
  padding-left: 28px;
}
.el-wrapper.error .dx-dropdowneditor {
  border-color: var(--error-color) !important;
}

.dx-widget input,
.dx-widget textarea {
  font-family: Roboto, helvetica, verdana, sans-serif;
  line-height: 1.35715;
}

.dx-selectbox-popup-wrapper .dx-popup-content {
  padding: 8px;
}

.dx-dropdownlist-popup-wrapper
  .dx-list:not(.dx-list-select-decorator-enabled)
  .dx-list-item-content {
  padding: 8px;
}

.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item.dx-state-hover,
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item.dx-state-active,
.dx-list:not(.dx-list-select-decorator-enabled)
  .dx-list-item.dx-list-item-selected,
.dx-list:not(.dx-list-select-decorator-enabled)
  .dx-list-item.dx-list-item-selected.dx-state-hover:not(.dx-state-focused),
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item.dx-state-focused,
.dx-list:not(.dx-list-select-decorator-enabled)
  .dx-list-item.dx-state-focused.dx-list-item-selected {
  background-color: var(--sidebar-item-background);
  color: var(--primary-color);
  font-weight: 500;
  border-radius: var(--border-radius);
}

.dx-dropdowneditor.dx-dropdowneditor-button-visible.dx-dropdowneditor-field-clickable.dx-editor-outlined.dx-selectbox.dx-show-invalid-badge.dx-state-focused.dx-textbox.dx-texteditor.dx-widget {
  border-color: var(--primary-color);
}

.dx-show-invalid-badge.dx-selectbox.dx-textbox.dx-texteditor.dx-dropdowneditor-button-visible.dx-editor-outlined.dx-widget.role-select.dx-dropdowneditor.dx-dropdowneditor-field-clickable.dx-dropdowneditor-active {
  border-color: var(--primary-color);
}

.dx-texteditor.dx-state-active.dx-editor-filled,
.dx-texteditor.dx-state-active.dx-editor-outlined,
.dx-texteditor.dx-state-active.dx-editor-underlined,
.dx-texteditor.dx-state-focused.dx-editor-filled,
.dx-texteditor.dx-state-focused.dx-editor-outlined,
.dx-texteditor.dx-state-focused.dx-editor-underlined {
  border-color: var(--primary-color);
}

.dx-texteditor.dx-state-hover {
  border-color: var(--primary-color);
}

.dx-tag-content {
  color: var(--text-color);
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #e8eaef;
  padding-left: 8px;
  padding-right: 4px;
  margin: 4px 0 0 4px;
  border: none;
  height: 28px;
  width: 100%;
}

.dx-tag {
  margin-right: 4px;
}

.dx-tag-remove-button {
  position: relative;
  background-color: #686c7b !important;
  width: 22px;
  height: 23px;
  -webkit-mask-image: url(@/assets/img/Icon_process.0a0cc28b.svg);
  -moz-mask-image: url(@/assets/img/Icon_process.0a0cc28b.svg);
  -ms-mask-image: url(@/assets/img/Icon_process.0a0cc28b.svg);
  -o-mask-image: url(@/assets/img/Icon_process.0a0cc28b.svg);
  mask-image: url(@/assets/img/Icon_process.0a0cc28b.svg);
  -webkit-mask-position: -216px 0;
  -moz-mask-position: -216px 0;
  -ms-mask-position: -216px 0;
  -o-mask-position: -216px 0;
  mask-position: -216px 0;
  -webkit-mask-repeat: no-repeat;
  -moz-mask-repeat: no-repeat;
  -ms-mask-repeat: no-repeat;
  -o-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  transform: scale(0.5);
}

.dx-tag-remove-button::before,
.dx-tag-remove-button::after {
  width: 0;
  height: 0;
}

.dx-dropdowneditor-icon::before {
  width: 0;
  height: 0;
  content: "";
}

.dx-dropdowneditor-button {
  position: relative;
  display: flex;
  align-items: center;
  float: right;
  height: 100%;
  cursor: pointer;
  width: 34px;
  min-width: 34px;
  padding: 1px;
  border-radius: 4px;
}
.dx-dropdowneditor-icon {
  width: 24px;
  height: 24px;
  -webkit-mask-position: -144px -24px;
  -moz-mask-position: -144px -24px;
  -ms-mask-position: -144px -24px;
  -o-mask-position: -144px -24px;
  mask-position: -144px -24px;
  margin-right: 0;
  -webkit-mask-image: url(@/assets/img/IconControl.9280241f.svg) !important;
  -moz-mask-image: url(@/assets/img/IconControl.9280241f.svg) !important;
  -ms-mask-image: url(@/assets/img/IconControl.9280241f.svg) !important;
  -o-mask-image: url(@/assets/img/IconControl.9280241f.svg) !important;
  mask-image: url(@/assets/img/IconControl.9280241f.svg) !important;
  -webkit-mask-repeat: no-repeat;
  -moz-mask-repeat: no-repeat;
  -ms-mask-repeat: no-repeat;
  -o-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  background-color: #666 !important;
}
.icon-24 {
  width: 24px;
  height: 24px;
  display: inline-block;
}

.el-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
