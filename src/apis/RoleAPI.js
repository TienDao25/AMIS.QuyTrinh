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

    /**
     * Lấy danh sách theo bộ lọc/phân trang
     * @param {Object} filter bộ lọc
     * @param {Number} limit số lượng bản ghi/1 trang
     * @param {Number} offset bản ghi bắt đầu
     * @param {Object} sort cách sắp xếp
     * Author: TienDao (12/01/2023) 
     */
    filterAndPaging(filter, limit, offset, sort) {
        var body = {
            Filter: filter,
            Limit: limit,
            Offset: offset,
            Sort: sort
        };
        return BaseAPIConfig.post(`${this.controller}/BaseFilter/`,body)
    }
}

export default new EmployeeAPI();