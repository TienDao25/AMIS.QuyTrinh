<template>
  <div class="flex-m global-search ms-input">
    <div id="searchInput" class="ab-c-m"></div>
    <div :class="['pre-icon', iconPre]"></div>
    <input
      :placeholder="placeholderText"
      type="text"
      class="flex-1 m-l-4"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"

    />
  </div>
</template>
<script>
export default {
  props: {
    //Text hiển thị
    placeholderText: String,

    //Icon
    iconPre: String,

    //label
    label: String,

    //giá trị input
    modelValue:String,
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
@import url(./MsInputSreach.css);
</style>