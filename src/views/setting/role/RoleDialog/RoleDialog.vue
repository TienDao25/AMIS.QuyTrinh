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
        <div class="dialog__button" v-if="modeDialog == Enum.ModeDialog.Delete">
          <MsButtonVue
            :isDanger="true"
            :includeIcon="false"
            :title="Resource.Button.Delete"
            @click="onClickBtnDanger"
          />
          <MsButtonVue
            :isSecondary="true"
            :includeIcon="false"
            :title="Resource.Button.Cancel"
            @click="onClickBtnSecondary"
          />
        </div>
        <div class="dialog__button" v-if="modeDialog == Enum.ModeDialog.Error">
          <MsButtonVue
            :isPrimary="true"
            :includeIcon="false"
            :title="Resource.Button.Close"
            @click="onClickBtnPrimary"
          />
        </div>
        <div class="dialog__exit">
          <MsButtonIconVue
            :classIcon="'mi-close-2'"
            :titleIcon="'Đóng'"
            @click="closeDialog"
          />
        </div>
      </div>
      <MsLoadingVue v-show="isLoading"></MsLoadingVue>
    </div>
  </div>
</template>

<script>
import MsButtonVue from "@/components/base/MsButton/MsButton.vue";
import MsButtonIconVue from "@/components/base/MsButton/MsButtonIcon.vue";
import MsLoadingVue from "@/components/base/MsLoading/MsLoading.vue";

import RoleAPI from "@/apis/RoleAPI.js";
import Enum from "@/js/enum/enum.js";
import Resource from "@/js/resource/resource";
export default {
  components: {
    MsButtonVue,
    MsButtonIconVue,
    MsLoadingVue,
  },
  props: {
    //Icon Dialog
    iconDialog: String,

    //Tiêu đề Dialog
    titleDialog: String,

    //Nội dung Dialog
    descriptionDialog: String,

    //Trường hợp Dialog
    modeDialog: Number,

    //ID vai trò cần xóa
    roleID: String,
  },
  methods: {
    /**
     * Click nút đóng Dialog
     * Author: TienDao (27/12/2022)
     */
    closeDialog() {
      this.$emit("closeDialog");
    },

    /**
     * Click nút Danger
     * Author: TienDao (27/12/2022)
     */
    onClickBtnDanger() {
      switch (this.modeDialog) {
        case Enum.ModeDialog.Delete:
          this.deleteRoleById();
          break;
      }
    },

    /**
     * Click nút Secondary
     * Author: TienDao (27/12/2022)
     */
    onClickBtnSecondary() {
      switch (this.modeDialog) {
        case Enum.ModeDialog.Delete:
          this.$emit("closeDialog");
          break;
      }
    },

    /**
     * Sự kiện click nút Primary
     */
    onClickBtnPrimary() {
      switch (this.modeDialog) {
        case Enum.ModeDialog.Error:
          this.$emit("closeDialog");
          break;
      }
    },
    /**
     * Ẩn/hiện loading
     * Author: TienDao (27/12/20220)
     */
    isShowLoading() {
      this.isLoading = !this.isLoading;
    },

    /**
     * Gọi API xóa vai trò
     * Author: TienDao (27/12/2022)
     */
    deleteRoleById() {
      this.isShowLoading();
      RoleAPI.deleteRoleByID(this.roleID)
        .then((response) => {
          console.log(response);
          this.isShowLoading();
          this.$emit("closeDialogAndDeleteSuccess");
        })
        .catch((error) => {
          this.isShowLoading();
          console.log(error);
          if (error.response) {
            switch (error.response.status) {
              case Enum.StatusCode.BadRequest:
                this.$emit("showDialogError", error.response.data.MoreInfo);
                break;
              case Enum.StatusCode.InternalServerError:
                this.$emit("showDialogError", error.response.data.UserMsg);
                break;
              case Enum.StatusCode.NotFound:
                this.$emit("showDialogError", error.response.data.UserMsg);
                break;
              default:
                this.$emit("showDialogError", Resource.Dialog.TextError);
            }
          } else {
            this.$emit("showDialogError", Resource.Dialog.TextError);
          }
        });
    },
  },
  data() {
    return {
      Enum,
      Resource,

      //Trạng thái hiện thị Loading
      isLoading: false,
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
.dialog {
  /* display: none; */
  z-index: 2;
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
}

.dialog__title {
  font-size: 20px;
  font-weight: bold;
}
.dialog__content {
  display: flex;
}

.dialog__icon {
  align-self: center;
}
.dialog__icon img {
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

.dialog__exit {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
}
</style>