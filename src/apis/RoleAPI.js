import BaseAPIConfig from '@/apis/BaseAPIConfig.js';

class EmployeeAPI {
    controller = "roles";
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
     * @param {Number} roleStatus trạng thái
     * Author: TienDao (27/12/2022)
     */
    getListRolesByFilterPaging(keyword, limit, offset, fieldSort, typeSort, roleStatus) {
        // var query = new URL("");
        var params = {
            keyword: keyword,
            limit: limit,
            offset: offset,
            fieldSort: fieldSort,
            typeSort: typeSort,
            roleStatus: roleStatus
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
    deleteRoleByID(roleID) {
        return BaseAPIConfig.delete(`${this.controller}/${roleID}`)
    }

    /**
     * Thêm mới vai trò
     * @param {Object} requestClient requestClient
     * Author: TienDao (05/01/2023)
     */
    insertRole(requestClient) {
        return BaseAPIConfig.post(`${this.controller}`, requestClient)
    }

    /**
     * Sửa vai trò
     * @param {Object} requestClient requestClient
     * Author: TienDao (05/01/2023)
     */
    updateRole(requestClient) {
        return BaseAPIConfig.put(`${this.controller}`, requestClient)
    }
}

export default new EmployeeAPI();