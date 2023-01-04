<template>
  <div class="dialog">
    <div class="dialog__overlay">
      <div class="dialog__container">
        <div class="dialog__title">{{ titleDialog }}</div>
        <div class="dialog__content">
          <div class="dialog__icon" v-if="iconDialog">
            <img src="" alt="icon-warning" />
          </div>
          <div class="dialog__description" v-html="descriptionDialog"></div>
        </div>
        <div class="dialog__button" v-if="modeDialog==ENUM.DIALOG.MODE_DIALOG.Delete">
          <MsButtonVue :isDanger="true" :includeIcon="false" :title="Resource.Button.Delete" />
          <MsButtonVue :isSecondary="true" :includeIcon="false" :title="Resource.Button.Cancel" />
        </div>
        <div class="dialog__exit">
          <MsButtonIconVue :classIcon="'mi-close-2'" :titleIcon="Resource.Button.Close" @click="closeDialog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsButtonIconVue from "@/components/base/MsButton/MsButtonIcon.vue";

import Enum from "@/js/enum/enum.js";
import Resource from "@/js/resource/resource";
export default {
  components: {
    MsButtonVue,
    MsButtonIconVue
  },
  props: {
    //Icon Dialog
    iconDialog: String,

    //Tiêu đề Dialog
    titleDialog: String,

    //Nội dung Dialog
    descriptionDialog: String,

    //Trường hợp Dialog
    modeDialog:Number,
  },
  methods:{
    /**
     * Click nút đóng Dialog
     * Author: TienDao (27/12/2022)
     */
    closeDialog(){
      this.$emit("closeDialog")
    },
  },
  data(){
    return{
      Enum,
      Resource
    }
  }
};
</script>

<style scoped>
@import url(@/css/base.css);
.dialog {
    /* display: none; */
    z-index: 200;
}

.dialog__overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #6565656e;
}

.dialog__container {
    padding: 24px;
    background-color: #ffffff;
    position: absolute;
    display: block;
    min-width: 500px;
    width: 25vw;
    /* height: 80vh; */
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 10px rgba(0, 0, 0, .16);

}

.dialog__title {
    font-size: 20px;
    font-weight: bold;
    
}
.dialog__content{
    display: flex;
}

.dialog__icon{
    align-self: center;
}
.dialog__icon img{
    max-width: 48px;
}

.dialog__description {
    margin: 24px 0;
}

.dialog__button {
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
    width: 100%;
}

.dialog__exit{
    position: absolute;
    top:24px;
    right: 24px;
    cursor: pointer;
}
</style>