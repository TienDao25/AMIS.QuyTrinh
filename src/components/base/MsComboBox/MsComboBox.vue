<template >
  <div v-if="inputLabel">
    <label :title="tooltip" class="label-input" style="position: relative">
      {{ inputLabel }}
      <span v-show="inputRequired" style="color: red">(*)</span>
    </label>
  </div>

  <div class="combobox">
    <div class="input-container">
      <input
        class="input"
        type="text"
        :value="modelValue"
        :readonly="readonly"
        :tabindex="tabIndex"
        :class="{ 'input-error': errorMess }"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isShowList = true"
        @click.stop="isShowList = true"
        @keydown.tab="isShowList = false"
        @keyup.down="arrowDown"
        ref="input"
        style="padding: 8px"
      />

      <button
        :tabindex="-1"
        type="button"
        class="combobox-button d-flex-auto"
        @click.stop="showList"
      >
        <i class="mi-chevron-down" style="margin: auto"></i>
      </button>
      <span v-if="errorMess" class="msg-input-error" :title="errorMess">
        {{ errorMess }}
      </span>
    </div>

    <div class="combobox-data" :class="className" v-if="isShowList">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="data-item"
        :class="{
          selected:
            numberRecord == item[Value] ||
            modelValue == item[Value] ||
            index == indexInit,
        }"
        @click.stop="clickOnItemData(item, index)"
        @keydown.enter="clickOnItemData(item, index)"
        ref="itemData"
      >
        <!-- v-show="checkItem(item, index)" -->
        <div>{{ item[Text] }}</div>
        <div
          v-show="
            numberRecord == item[Value] ||
            modelValue == item[Value] ||
            index == indexInit
          "
          class="mi-check icon-check"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //Nhãn Combobox
    inputLabel: String,

    //Yêu cầu bắt buộc
    inputRequired: Boolean,

    //Class combobox data
    className: String,

    //Danh sách lựa chọn combobox
    dataList: Array,

    //Thông tin lỗi
    errorMess: String,

    //Tabindex
    tabIndex: Number,

    //Giá trị input đã chọn
    modelValue: String,

    //Tiêu đề
    tooltip: String,

    // Trường giá trị của dataList
    Value: String,

    //Trường hiện thị của dataList
    Text: String,

    //Chỉ đọc
    readonly: Boolean,
  },
  computed: {},
  emits: [],
  created() {
    /**
     * Đóng list combobox
     * Author: TienDao (26/12/2022)
     */
    window.addEventListener("click", () => {
      this.isShowList = false;
    });
    this.init();
  },
  watch: {
    /**
     * kiểm tra giá trị input => check màu
     * Author: TienDao (26/12/2022)
     */
    modelValue: function () {
      try {
        this.dataList.forEach((item, index) => {
          if (this.modelValue == item[this.Text]) {
            this.indexInit = index;
            return;
          }
        });
      } catch (error) {
        alert(error);
      }
    },
  },
  methods: {
    /**
     * Gán màu item đã chọn trong lần khởi tạo đầu nếu có giá trị
     * Author: TienDao (07/12/2022)
     */
    init() {
      try {
        this.dataList.forEach((item, index) => {
          if (this.modelValue == item[this.Text]) {
            this.indexInit = index;
          } else {
            this.indexInit = -1;
          }
        });
      } catch (error) {
        alert(error);
      }
    },
    /**
     * Ẩn hiện combobox
     * Author: TienDao (02/12/2022)
     */
    showList() {
      this.isShowList = !this.isShowList;
    },

    /**
     * click vào item trên combobox
     * @param {Object} item data
     * @param {Number} index chỉ mục
     * Author: TienDao (02/12/2022)
     */
    clickOnItemData(item, index) {
      try {
        this.value = item[this.Text];
        this.numberRecord = item[this.Value];
        this.$emit("changeNumberRecord", this.numberRecord);
        this.$emit("update:modelValue", item[this.Text]);
        index;
        this.$refs.input.focus();
        this.isShowList = !this.isShowList;
      } catch (error) {
        alert(error);
      }
    },
  },
  data() {
    return {
      // Trạng thái show Data
      isShowList: false,

      //Item data đã chọn
      value: this.inputLabel ? "" : this.dataList[0][this.Text],

      //Số bản ghi mặc định (dùng cho phân trang)
      numberRecord: 10,

      //Chỉ mục combo đã chọn
      indexInit: -1,
    };
  },
};
</script>

<style>
@import url(@/css/base.css);
.icon-check {
  width: 20px;
  margin-left: 8px;
}
.combobox {
  position: relative;
  display: flex;
  flex-direction: column;
}

.combobox-button {
  height: 34px;
  width: 36px;
  border-left: 1px solid #e0e0e0;
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(10px);
  transform: translateY(-50%);
  border-radius: 4px;
  cursor: pointer;
}

.combobox-button:hover {
  /* background-color: var(--input-hover-border-color); */
}

.combobox-button:focus {
  /* background-color: var(--input-hover-border-color); */
}

.combobox-data {
  width: 100%;
  border: 1px solid #e0e0e0;
  position: absolute;
  z-index: 999;
  background-color: white;
  /* display:none; */
  border-radius: 4px;
  overflow: auto;
}

.top {
  /* bottom: calc(100%); */
  bottom: calc(100%);
  max-height: 200px;
}

.bottom {
  /* top: calc(100% + 1px); */
  top: calc(100%);
  max-height: 200px;
}

.data-item {
  height: 36px;
  line-height: 24px;
  padding: 6px 12px 6px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  /* font-size: 14px; */
}

.data-item:hover {
  background-color: #dbf4ff;
  /* color: #dbf4ff; */
}

.data-item:focus-within {
  background-color: #dbf4ff;
  /* color: #dbf4ff; */
}

.input {
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  border: 1px solid #babec5;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  border-radius: var(--border-radius);
  outline: none;
}

.input :hover() {
  border: 1px solid var(--input-hover-border-color);
}
.combobox .selected {
  background: var(--primary-bg) !important;
  color: var(--primary-bg) !important;
}
</style>