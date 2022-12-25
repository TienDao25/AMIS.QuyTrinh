<template>
  <div class="body-custom">
    <div class="h-full container" style="padding: 16px 24px">
      <div class="content-header p-b-16">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div
              class="
                ms-icon-container
                flex
                items-center
                justify-center
                m-r-8
                ms-icon-
                btn-icon-1
              "
            >
              <div class="tooltip-container">
                <div class="con-ms-tooltip">
                  <i class="ms-icon notranslate icon-scale mi-arrow-left"></i>
                </div>
              </div>
            </div>
            <span class="font-20 bold">Nhân viên</span>
          </div>
          <div class="flex">
            <MsButtonVue :isPrimary="true" :title="'Sửa'" />
            <MsButtonVue :isSecondary="true" :title="'Hủy bỏ'" />
            <MsButtonVue :isPrimary="true" :title="'Lưu'" />
          </div>
        </div>
      </div>

      <div
        class="content-main"
        style="background: transparent; height: calc(100vh - 148px)"
      >
        <div class="h-full w-full">
          <div class="p-24 bg-white">
            <h2>THÔNG TIN CHUNG</h2>
            <br />
            <div>
              <div>
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
                    class="ms-col ms-xs- ms-sm- ms-lg- dx-field-value-static"
                    style="margin-left: 0%; width: 48.3333%"
                  >
                    <MsInputVue
                      :label="'Tên vai trò'"
                      :placeholderText="'Nhập tên vai trò'"
                      :maxLength="225"
                      :errorText="''"
                      :isRequired="true"
                    />
                  </div>
                  <div
                    class="ms-col ms-xs- ms-sm- ms-lg-"
                    style="margin-left: 0%; width: 3.33333%"
                  ></div>
                  <div
                    class="ms-col ms-xs- ms-sm- ms-lg-"
                    style="margin-left: 0%; width: 48.3333%"
                  >
                    <MsInputVue
                      :label="'Mô tả'"
                      :placeholderText="'Nhập mô tả'"
                      :maxLength="225"
                      ::isRequired="false"
                    />
                  </div>
                </div>

                <br />

                <div class="m-b-24">
                  <div class="title-block font-20 bold" style="margin-top: 0px">
                    PHÂN QUYỀN PHÂN HỆ
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        :rowName="'Tổng quan'"
                        :isRow="'a2'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        :rowName="'Tổng quan'"
                        :isRow="'a1'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        :rowName="'Tổng quan'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        :rowName="'Tổng quan'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="title-block font-20 bold" style="margin-top: 0px">
                    PHÂN QUYỀN THIẾT LẬP
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        :rowName="'Tổng quan'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        :rowName="'Tổng quan'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        :rowName="'Tổng quan'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <div>
                      <MsCheckboxVue
                        id="link4"
                        :rowName="'Tổng quan'"
                        :isDisabled="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { DxTooltip } from "devextreme-vue/tooltip";
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsInputVue from "@/components/base/MsInput/MsInput.vue";
import MsCheckboxVue from "@/components/base/MsInput/MsCheckbox.vue";
export default {
  components: {
    // DxTooltip,
    MsButtonVue,
    MsInputVue,
    MsCheckboxVue,
  },
  props: {
    // Trường hợp của popup
    modeForm: Number,
  },
  data() {
    return {
      // withShadingOptionsVisible: false,
      // animationConfig: {
      //   show: {
      //     type: 'pop',
      //     from: {
      //       scale: 0,
      //     },
      //     to: {
      //       scale: 1,
      //     },
      //   },
      //   hide: {
      //     type: 'fade',
      //     from: 1,
      //     to: 0,
      //   },
      // },
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
#process-permission .body-custom {
  width: 100%;
  overflow: auto;
}
.btn-icon-1 {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
}
.content-main {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}
</style>