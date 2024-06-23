
// Orders status
const formOrderStatus = document.querySelector("#form-order-status");
const listStatus = document.querySelectorAll(".list-status");
if (listStatus.length > 0) {
    listStatus.forEach(item => {
        item.addEventListener("change", (e) => {
            const id = item.getAttribute("id");
            const status = e.target.value;
            const path = formOrderStatus.getAttribute("data-path");
            formOrderStatus.action = path + `/${id}/${status}?_method=PATCH`;
            formOrderStatus.submit();

        });

    })

    listStatus.forEach(item => {
        const string = item.getAttribute("status");
        var status = "";
        switch (string) {
            case "Đang xử lý":
                status = "pending"
                break
            case "Đã xác nhận":
                status = "confirm"
                break
            case "Đang giao":
                status = "shipping"
                break
            case "Thành công":
                status = "success"
                break
            case "Đã huỷ":
                status = "cancel"
                break
        }
        const optionSelected = item.querySelector(`option[value='${status}']`);
        optionSelected.selected = true;
    })
}
// End Orders status