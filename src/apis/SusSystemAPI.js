import BaseAPIConfig from '@/apis/BaseAPIConfig.js';

class EmployeeAPI {
    controller = "subsystems";
    /**
     * Lấy chi tiết 1 vai trò theo ID
     * @param {String} roleID ID vai trò
     * Author: TienDao (27/12/2022)
     */
    getListSubSystem() {
        return BaseAPIConfig.get(`${this.controller}`)
    }
}

export default new EmployeeAPI();