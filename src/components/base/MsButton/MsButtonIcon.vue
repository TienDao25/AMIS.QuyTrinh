<template>
  <div class="style-button">
    <div
      v-show="titleIcon"
      class="button-comand-wrap btn-more"
      :title="titleIcon"
    >
      <div :class="classIcon"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //Chú thích icon
    titleIcon: String,

    //Icon
    classIcon: String,
  },
};
</script>

<style>
@import url(./MsButtonIcon.css);
@import url(@/css/base.css);
.grid-container .style-button {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-container .btn-more {
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 50%;
}
.grid-container td.custom-column .button-comand-wrap {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-container .btn-more:active, .grid-container .btn-more:hover {
    background-color: #dadce3;
}
</style>