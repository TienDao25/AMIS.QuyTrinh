import BaseAPIConfig from '@/apis/BaseAPIConfig.js';

class EmployeeAPI {
    controller = "role";
    /**
     * Lấy chi tiết 1 vai trò theo ID
     * @param {String} roleID ID vai trò
     * Author: TienDao (27/12/2022)
     */
    getRoleDetailByID(roleID) {
        return BaseAPIConfig.get(`${this.controller}/${roleID}`)
    }

    /**
     * Lấy danh sách vai trò theo bộ lọc, phân trang
     * @param {String} keyword Từ khóa tìm kiếm
     * @param {Number} limit Giới hạn bản ghi
     * @param {Number} offset Thứ tự bản ghi bắt đầu
     * @param {String} fieldSort Trường sắp xếp 
     * @param {String} typeSort Kiểu sắp xếp
     * Author: TienDao (27/12/2022)
     */
    getListRolesByFilterPaging(keyword, limit, offset, fieldSort, typeSort) {
        // var query = new URL("");
        var params = {
            keyword: keyword,
            limit: limit,
            offset: offset,
            fieldSort: fieldSort,
            typeSort: typeSort,
        };
        return BaseAPIConfig.get(`${this.controller}/filter/`, {
            params: params
        })

    }

    /**
     * Xóa vai trò theo ID
     * @param {String} roleID ID vai trò muốn xóa
     * @returns 
     * Author: TienDao (27/12/2022)
     */
    deleteRoleByID(roleID){
        return BaseAPIConfig.delete(`${this.controller}/${roleID}`)
    }
}

export default new EmployeeAPI();