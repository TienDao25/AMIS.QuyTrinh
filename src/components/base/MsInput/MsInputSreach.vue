<template>
  <div class="flex-m global-search ms-input">
    <div id="searchInput" class="ab-c-m"></div>
    <div :class="['pre-icon', iconPre]"></div>
    <input
      :placeholder="placeholderText"
      type="text"
      class="flex-1 m-l-4"
      :class="{ 'm-l-4': isGlobal, 'm-l-12': !isGlobal }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="isGlobal && modelValue" class="after-icon mi-close-small" @click="$emit('update:modelValue', null)"></div>
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
    modelValue: String,

    //Tìm kiếm toàn bộ
    isGlobal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
.global-search .after-icon {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
}
.global-search {
  position: relative;
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  margin-right: 8px;
  border-radius: 4px;
  width: 264px;
  height: 36px;
}
.ab-c-m {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input[type="text" i] {
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

.global-search input {
  border: none;
  outline: none;
  margin-right: 24px;
}
.ms-input:hover {
  border: 1px solid var(--input-hover-border-color);
}
.ms-input:focus-within {
  border: 1px solid var(--input-active-border-color);
}
</style>