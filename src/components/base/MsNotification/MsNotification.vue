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
@import url(./MsNotification.css);
</style>