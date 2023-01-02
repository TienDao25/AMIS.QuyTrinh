<template>
  <label>
    <p style="margin: 0px !important; color: rgb(27, 28, 30) !important">
      {{ label }}
      <span class="required" style="float: inherit" v-if="isRequired"> * </span>
    </p>
  </label>
  <div>
    <div style="height: 36px; width: auto">
      <div class="flex items-center w-full h-full">
        <div
          class="ms-input flex w-full"
          :class="{ isValid: errorText && showError }"
        >
          <input
            type="text"
            :maxlength="maxLength"
            :placeholder="placeholderText"
            class="ms-input-item"
            :value="modelValue"
            @input="keyOnInput($event.target.value)"
            @focusout="focusOutInput($event.target.value)"
            ref="input"
          />
        </div>
      </div>
    </div>
    <p v-if="errorText && showError" class="text-error">
      {{ errorText }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    //Giá trị input
    modelValue: String,

    //Text hiển thị
    placeholderText: String,

    //label
    label: String,

    //Độ dài nhập
    maxLength: Number,

    //Lỗi
    errorText: String,

    //Bắt buộc
    isRequired: Boolean,
  },
  methods: {
    /**
     * focus input
     * Author: TienDao (28/12/2022)
     */
    focusInput() {
      this.$refs.input.focus();
    },

    /**
     * Sự kiện nhập input
     * Author: TienDao (01/01/2023)
     */
    keyOnInput(value) {
      this.$emit("update:modelValue", value);
      if (this.isRequired) {
        if (!value) {
          this.showError = true;
        } else {
          this.showError = false;
        }
      }
    },

    /**
     * Focus ra khỏi input
     * Author: TienDao (02/01/2023)
     */
    focusOutInput(value) {
      // console.log(value);
      if (this.isRequired) {
        if (!value) {
          this.showError = true;
        } else {
          this.showError = false;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
label {
  outline: none;
  font-weight: 500;
  font-weight: bold;
  text-align: left;
  display: flex;
  margin-bottom: 4px;
}

label {
  text-align: left !important;
  display: flex !important;
  align-items: center !important;
}

.ms-col label {
  color: #212121;
}

.required {
  color: red;
  padding-left: 2px;
}

span.required {
  color: #e54848;
}

.isValid {
  border: 1px solid #e61d1d !important;
}

.ms-input .ms-input-item {
  height: 100%;
  border: none;
  width: 100%;
  padding: 0 12px;
}

.ms-input:hover {
  border: 1px solid var(--input-hover-border-color);
}

.ms-input:focus-within {
  border: 1px solid var(--input-active-border-color);
}

.text-error {
  font-size: 12px !important;
  height: auto;
  line-height: 20px;
  margin-top: 4px !important;
}

.color-error,
.text-error {
  color: #f7453b !important;
}

input[type="text"i] {
  padding: 1px 2px;
}

input {
  writing-mode: horizontal-tb !important;
  /* font-style: ;
      font-variant-ligatures: ;
      font-variant-caps: ;
      font-variant-numeric: ;
      font-variant-east-asian: ;
      font-weight: ;
      font-stretch: ;
      font-size: ;
      font-family: ; */
  text-rendering: auto;
  color: fieldtext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
  background-color: field;
  margin: 0em;
  padding: 1px 2px;
  border-width: 2px;
  border-style: inset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}

.ms-input {
  height: 100%;
  border: 1px solid var(--border-color);
  border-radius: 3.5px;
  background: #fff;
  min-height: 36px;
  align-items: center;
  overflow: hidden;
}
</style>