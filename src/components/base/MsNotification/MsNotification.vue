<template>
  <div id="notification" class="notification">
    <div class="notification__container">
      <div class="notification__container--left">
        <div class="notification__icon">
          <div :class="['icon', iconNotification]"></div>
        </div>
        <div :class="['notification__title', classNotification]">
          {{ tittleNotification }}
        </div>
        <div class="notification__bodyText">{{ bodyTextNotification }}</div>
      </div>
      <div v-if="showRight" class="notification__container--right">
        <div class="notification__action" v-show="false">
          {{ Resource.Action.Undo }}
        </div>
        <div class="notification__closeIcon">
          <div class="icon icon-exit-notification"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import Resource from "@/js/resource/resource";
export default {
  name: "MsNotification",
  props: {
    //Hiện thị phần bên phải thông báo (nút X, Hoàn tác)
    showRight: {
      default: true,
      Type: Boolean,
    },
    //Nội dung thông báo
    bodyTextNotification: String,

    //Tiêu đề Thông báo
    tittleNotification: String,

    //Class tương ứng với thông báo (thành công/cảnh báo/lỗi)
    classNotification: String,

    //Icon tương ứng thông báo
    iconNotification: String,
  },
  created() {},
  emits: [],
  methods: {},
  data() {
    return {
      Resource,
    };
  },
};
</script>
  <style scoped>
.notification__container {
    position: absolute;
    /* bottom: 5%;
    right: 5%; */

    top: 5%;
    right: 16px;
    min-width: 450px;
    max-width: 650px;
    display: flex;
    padding: 16px;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    box-shadow: 0 2px 6px #afafaf;
    border-radius: 4px;
    z-index: 99999;
}

.notification__container--left,
.notification__container--right {
    display: flex;
    align-items: center;
}

.notification__container--right{
    /* padding-left: 200px; */
}

.tittle-successful {
    color: green;
    font-weight: bold;
}


.notification__icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.notification__icon *{
    width: 24px;
    height: 24px;
}

.notification__title{
    margin-right: 4px;
}

.notification__action{
    cursor: pointer;
    margin-right: 16px;
    text-decoration: underline;
    font-weight: bold;
}
</style>