<template>
  <div
    class="ms-row"
    style="
      display: flex;
      width: 100%;
      line-height: 35px;
      text-indent: 0px;
      padding: 0px;
      margin-bottom: 16px;
    "
  >
    <div
      v-if="rowName"
      class="text-bold ms-col ms-xs- ms-sm- ms-lg-"
      style="margin-left: 0%; width: 25%"
    >
      {{ rowName }}
    </div>

    <div
      class="ms-col ms-xs- ms-sm- ms-lg- flex items-center col-options"
      style="margin-left: 0%; width: 33.3333%"
    >
      <div class="flex items-center w-full">
        <label class="container ms-checkbox custom-checkbox">
          <input
            type="checkbox"
            :disabled="isDisabled"
            class="ms-checkbox--input"
            value="true"
          />
          <span
            class="icon-square-check-primary checkmark"
            :class="{
              'icon-square-check-primary': isIcon,
              'icon-square-uncheck': !isIcon,
              disabled: isDisabled,
            }"
            @click="isIcon = !isIcon"
          ></span>
          <!-- icon-square-uncheck -->
        </label>

        <div
          class="m-r-4 cursor-pointer text-over"
          :id="isRow"
          @click="showWithShadingOptions"
        >
          <span :style="{ 'opacity: 0.5': true }">Chọn quyền</span>
        </div>
        <div
          class="mi-chevron-down cursor-pointer"
          @click="showWithShadingOptions"
        ></div>
      </div>
    </div>

    <DxPopover
      :width="300"
      v-model:visible="withShadingOptionsVisible"
      :shading="true"
      :target="'#' + isRow"
      position="bottom"
      shading-color="rgba(0, 0, 0, 0.5)"
    >
    <div >
      <div class="flex items-center w-full m-b-8 ">
        <label class="container ms-checkbox custom-checkbox">
          <input
            type="checkbox"
            :disabled="isDisabled"
            class="ms-checkbox--input"
            value="true"
          />
          <span
            class="icon-square-check-primary checkmark"
            :class="{
              'icon-square-check-primary': isIcon,
              'icon-square-uncheck': !isIcon,
              disabled: isDisabled,
            }"
            @click="isIcon = !isIcon"
          ></span>
        </label>

        <div
          class="m-r-4 cursor-pointer text-over"
          :id="isRow"
          @click="showWithShadingOptions"
        >
          <span :style="{ 'opacity: 0.5': true }">Chọn quyền</span>
        </div>
      </div>
      <div class="flex items-center w-full">
        <label class="container ms-checkbox custom-checkbox">
          <input
            type="checkbox"
            :disabled="isDisabled"
            class="ms-checkbox--input"
            value="true"
          />
          <span
            class="icon-square-check-primary checkmark"
            :class="{
              'icon-square-check-primary': isIcon,
              'icon-square-uncheck': !isIcon,
              disabled: isDisabled,
            }"
            @click="isIcon = !isIcon"
          ></span>
        </label>

        <div
          class="m-r-4 cursor-pointer text-over"
          :id="isRow"
          @click="showWithShadingOptions"
        >
          <span :style="{ 'opacity: 0.5': true }">Chọn quyền</span>
        </div>
      </div>
    </div>
      
    </DxPopover>
  </div>
</template>

<script>
import { DxPopover } from "devextreme-vue/popover";

export default {
  name: "MsCheckBox",
  components: {
    DxPopover,
  },
  props: {
    //Trạng thái
    isDisabled: Boolean,

    //Tên hàng
    rowName: String,

    //List ID
    listID: Array,

    //id row
    isRow: String,
  },
  methods: {
    showWithShadingOptions() {
      this.withShadingOptionsVisible = true;
      console.log(this.idRowName);
    },
  },
  data() {
    return {
      //Show icon checkbox
      isIcon: true,

      withShadingOptionsVisible: false,
      animationConfig: {
        show: {
          type: "pop",
          from: {
            scale: 0,
          },
          to: {
            scale: 1,
          },
        },
        hide: {
          type: "fade",
          from: 1,
          to: 0,
        },
      },
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
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