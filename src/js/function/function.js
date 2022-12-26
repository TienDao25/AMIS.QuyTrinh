export default {
    /**
     * Lấy giá trị ngày hiện tại
     * @returns ngày tháng năm
     */
    getToday() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const day = {
            'mm': mm,
            'dd': dd,
            "yyyy": yyyy
        };
        return day
    },

    /**
     * format số về dạng tiền có đơn vị đ
     * @param {number} number số tiền
     * @returns format
     * Author: Tiến Đạo (10/11/2022)
     */
    fomatMonney(number) {
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(number)
    },

    /**
     * format số về dạng tiền KHÔNG có đơn vị đ
     * @param {number/string} number số tiền
     * @returns format
     * Author: Tiến Đạo (10/11/2022)
     */
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

}