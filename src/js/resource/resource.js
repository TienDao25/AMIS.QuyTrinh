export default {
    TextTitle:{
        TextLogo:"MISA QLTS", //Text logo
        TitleHeader:"Sở tài chính",
        HeaderListAsset:"Danh sách tài sản"
    },
    ButtonDialog: { //Nội dung nút
        Close: "Đóng",
        Cancel: "Hủy bỏ",
        Save: "Lưu",
        Delete: "Xóa",
        NoThing: "Không",
        NoSave: "Không lưu",
        None: ""
    },
    Popup: { //PopupForm
        TitlePopup: { //Chức năng
            Add: "Add",
            Edit: "Edit",
            Copy: "Copy"
        },
        TextPopoup: { //Tiêu đề form
            Add: "Thêm mới tài sản",
            Edit: "Sửa tài sản",
            Copy: "Nhân bản tải sản"
        }
    },
    ValidData: { //Nội dung trả về validate
        Default: "Cần nhập thông tin",
        NotNull: "Thông tin bắt buộc nhập",
        Duplicate: "Thông tin bị trùng",
        NotEdit: "Thông tin không được sửa",
        ValidData1: "Tỷ lệ hao mòn phải bằng 1/số năm sử dụng",
        ValidData2: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá",
    },
    Notification: { //Thông báo
        TittleClass: { //Class
            Success: "tittle-successful",
            Warning: "",
            Error: "",
        },
        TittleNotification: { //Tiêu đề thông báo
            Success: "Thành công!",
            Warning: "",
            Error: "",
        },
        BodyText: { //Nội dung chi tiết
            SavedData: "Lưu dữ liệu thành công",
            DeletedData: "Xóa dữ liệu thành công",
        },
        SrcIcon: { //Icon tương ứng
            Success: "../icon/icon-successful.png",
            Warning: "",
            Error: "",
        },
    },
    Label: { //Tên nhãn
        OrdinalNumber:"Số thứ tự",
        FixedAsset: { //Tài sản
            fixed_asset_id: "ID tài sản",
            fixed_asset_code: "Mã tài sản",
            fixed_asset_name: "Tên tài sản",
            department_id: "ID phòng ban",
            department_code: "Mã phòng ban",
            department_name: "Tên phòng ban",
            fixed_asset_category_id: "ID loại tài sản",
            fixed_asset_category_code: "Mã loại tài sản",
            fixed_asset_category_name: "Tên loại tài sản",
            quantity: "Số lượng",
            cost: "Nguyên giá",
            life_time: "Số năm sử dụng",
            depreciation_rate: "Tỷ lệ hao mòn",
            depreciation_cost: "Hao mòn năm",
            tracked_year: "Năm theo dõi",
            purchase_date: "Ngày mua",
            production_date: "Ngày sử dụng",
            created_by:"Người tạo",
            created_date:"Ngày tạo",
            modified_by:"Người chỉnh",
            modified_date:"Ngày chỉnh sửa"
        },
        Department: { //Phòng ban sử dụng

        },
        FixedAssetCategory: { //Loại tài sản

        }

    },
    ListClassTable: { //Bảng tài sản
        Text: { //Tên cột
            OrdinalNumber: "STT",
            IdAsset: "Mã tài sản",
            NameAsset: "Tên tài sản",
            TypeOfAsset: "Loại tài sản",
            PartsUsed: "Bộ phận sử dụng",
            Amount: "Số lượng",
            OriginalPrice: "Nguyên giá",
            Accumulated: "HM/KH lũy kế",
            ResidualValue: "Giá trị còn lại",
        },
        Title: { //Chú thích
            OrdinalNumber: "Số thứ tự",
            IdAsset: "Mã tài sản",
            NameAsset: "Tên tài sản",
            TypeOfAsset: "Loại tài sản",
            PartsUsed: "Bộ phận sử dụng",
            Amount: "Số lượng",
            OriginalPrice: "Nguyên giá",
            Accumulated: "Hao mòn/Khấu hao lũy kế",
            ResidualValue: "Giá trị còn lại",
        }
    },
    ListSidebar: { //Sidebar
        Text: { //Nội dung
            Overview: "Tổng quan",
            Asset: "Tài sản",
            RoadInfrastructureAssets: "Tài sản HT-ĐB",
            Tool: "Công cụ dụng cụ",
            Category: "Danh mục",
            Sreach: "Tra cứu",
            Report: "Báo báo"
        },
        Title: { //Chú thích
            Overview: "Tổng quan",
            Asset: "Tài sản",
            RoadInfrastructureAssets: "Tài sản hạ tầng đường bộ",
            Tool: "Công cụ dụng cụ",
            Category: "Danh mục",
            Sreach: "Tra cứu",
            Report: "Báo báo"
        }
    }
}