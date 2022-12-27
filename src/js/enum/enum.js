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
    MODE_FORM: {
        None: 0,
        Add: 1, //Form thêm
        Update: 2, //Form sửa
        Delete: 3, //Form xóa
        Dulicate: 4 //Form nhân bản
    },
    ROLE: {
        ROLE_STATUS: {
            Active: 0, //Đang hoạt động
            Deleted: 1 //Đã xóa
        }
    },
    DIALOG:{
        MODE_DIALOG:{
            None:0,
            Delete:1,
        }
    },
    CaseShowDialog: { //Trường hợp Dialog
        DeleteAsset: 1, //Xóa 1 bản ghi
        DeleteMoreAssets: 2, //Xóa nhiều bản ghi
        ErrorDeleteAsset: 3, //Lỗi xóa 1 bản ghi
        ErrorDeleteMoreAssets: 4, //Lỗi xóa nhiều bản ghi
        AddAsset: 5, //Thêm tài sản
        EditAsset: 6, //Sửa tài sản
        ValidateData: 7, //Validate
        CallApi: 7 //Gọi Api lỗi
    },
    StatusButton: {

    },
    Notification: { //Thông báo
        SavedData: 1, //Lưu dữ liệu thành công",
        DeleteError: 2, //Xóa lỗi
        DeletedData: 3, //Xóa thành công

    },
    StatusCode: {
        OK: 200, //Thành công
        Created: 201, //Tạo mới  thành công
        BadRequest: 400, //Lỗi dữ liệu đầu vào
        NotFound: 404, //Không tìm thầy tài nguyên
        InternalServerError: 500, //Lỗi server
    }
}