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
          :class="{ isValid: errorText && isRequired }"
        >
          <input
            type="text"
            :maxlength="maxLength"
            :placeholder="placeholderText"
            class="ms-input-item"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <p v-if="errorText && isRequired" class="text-error">{{ errorText }}</p>
  </div>
</template>
<script>
export default {
  props: {
    //Giá trị input
    modelValue:String,

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
};
</script>

<style scoped>
@import url(@/css/base.css);
@import url(./MsInput.css);
</style>