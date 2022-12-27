// const ModeForm = {
//     None: 0,
//     Add: 1, //Form thêm
//     Update: 2, //Form sửa
//     Delete: 3, //Form xóa
//     Dulicate: 4 //Form nhân bản
// }

// const RoleStatus = {
//     Active: 0, //Đang hoạt động
//     Deleted: 1 //Đã xóa
// }

// const ModeDialog = {
//     None: 0,
//     Delete: 1,
// }
// export {
//     ModeForm,
//     RoleStatus,
//     ModeDialog
// };

export default {
    ModeForm: {
        None: 0,
        Add: 1, //Form thêm
        Update: 2, //Form sửa
        Delete: 3, //Form xóa
        Dulicate: 4 //Form nhân bản
    },
    Role: {
        RoleStatus: {
            Active: 0, //Đang hoạt động
            Deleted: 1 //Đã xóa
        }
    },
    ModeDialog: {
        None: 0,
        Delete: 1,
        Error: 2
    },
    StatusCode: {
        OK: 200, //Thành công
        Created: 201, //Tạo mới  thành công
        BadRequest: 400, //Lỗi dữ liệu đầu vào
        NotFound: 404, //Không tìm thầy tài nguyên
        InternalServerError: 500, //Lỗi server
    }
}