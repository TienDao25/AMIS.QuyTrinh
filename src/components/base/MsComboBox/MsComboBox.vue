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
        
      />
      <button
        :tabindex="-1"
        type="button"
        class="combobox-button d-flex-auto"
        @click.stop="showList"
      >
        <div class="icon icon--arrow-up-black"></div>
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
          checked:
            numberRecord == item[Value] ||
            modelValue == item[Value] ||
            index == indexInit,
        }"
        @click.stop="clickOnItemData(item, index)"
        @keydown.enter="clickOnItemData(item, index)"
        ref="itemData"
      >
        <!-- v-show="checkItem(item, index)" -->
        {{ item[Text] }}
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
     * Author: TienDao (02/12/2022)
     */
    window.addEventListener("click", () => {
      this.isShowList = false;
    });
    this.init();
  },
  watch: {
    /**
     * kiểm tra giá trị input => check màu
     * Author: TienDao (02/12/2022)
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

    /**
    //  * Kiểm tra giá trị input => show item
    //  * @param {*} item
    //  * @param {*} index
    //  */
    // checkItem(item, index) {
    //   index;
    //   if (!this.modelValue) {
    //     return true;
    //   } else {
    //     if (
    //       item[this.Text].toLowerCase().match(this.modelValue.toLowerCase())
    //     ) {
    //       return true;
    //     }
    //     return false;
    //   }
    // },

    arrowDown() {
      console.log(this.$refs.itemData[0]);
      this.$refs.itemData[0].focus();
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
@import url(./MsComboBox.css);
</style>