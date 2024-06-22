// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let url = new URL(window.location.href);

    buttonsPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);

            window.location.href = url.href;
        });
    });
}
// End Pagination

// Check Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {

        if (inputCheckAll.checked) {
            inputsId.forEach((input) => {
                input.checked = true;
            });
        } else {
            inputsId.forEach((input) => {
                input.checked = false;
            });
        }
    });

    inputsId.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll(
                "input[name='id']:checked"
            ).length;

            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });
}
// End Check Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        const typeChange = e.target.elements.type.value;

        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc muốn xoá những sản phẩm này?");

            if (!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach((input) => {
                const id = input.value;

                if (typeChange == "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name='position']")
                        .value;
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }

            });

            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất một bản ghi!");
        }
    });
}
// End Form Change Multi

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {

        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// End Upload Image

// Sort
const sort = document.querySelector("[sort]");
if (sort) {
    let url = new URL(window.location.href);

    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");

    //Sắp xếp
    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    });

    //Xoá sắp xếp
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    })

    // Thêm selected cho option
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sort.querySelector(`option[value='${stringSort}']`);
        optionSelected.selected = true;
    }
}
// End Sort

// Navbar
const listSider = document.querySelectorAll(".sider-item");
const url = window.location.href;
listSider.forEach((item) => {
    const data_item = item.getAttribute("data-nav");
    if (data_item == "products-category") {
        if (url.indexOf("products") > -1 && url.indexOf("category") > -1) {
            item.classList.add("active")
        }
    }
    else if (data_item == "products") {
        if (url.indexOf("products") > -1 && url.indexOf("category") == -1) {
            item.classList.add("active")
        }
    }
    else if (data_item == "permissions") {
        if (url.indexOf("roles") > -1 && url.indexOf("permissions") > -1) {
            item.classList.add("active")
        }
    }
    else if (data_item == "roles") {
        if (url.indexOf("roles") > -1 && url.indexOf("permissions") == -1) {
            item.classList.add("active")
        }
    }
    else if (url.indexOf(data_item) > -1) {
        item.classList.add("active");
    }
})
// End Navbar

// select-position
const listSelectPosition = document.querySelectorAll(".select-position");
if (listSelectPosition) {
    listSelectPosition.forEach(selectPosition => {
        const buttonReduce = selectPosition.querySelector(".reduce-btn");
        const buttonPlus = selectPosition.querySelector(".plus-btn");
        const input = selectPosition.querySelector("input");
        var position = parseInt(input.value);
        buttonReduce.addEventListener("click", () => {
            if (position > 1) {
                position -= 1;
            }
            console.log(position);
            input.setAttribute("value", position);
        })
        buttonPlus.addEventListener("click", () => {
            position += 1;

            console.log(position);
            input.setAttribute("value", position);
        })
    })
}

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


// Dashboard
// Thống kê doanh thu theo tháng
const chartRevenueOfMonth = document.getElementById('chartRevenueOfMonth');
const dataRevenueOfMonth = chartRevenueOfMonth.getAttribute("data");
const listDataRevenueOfMonth = JSON.parse(dataRevenueOfMonth);

const labelMonth = [];
const labelMonthValue = [];
listDataRevenueOfMonth.forEach(item => {
    const data = item.split(":");
    labelMonth.push(data[0]);
    labelMonthValue.push(+(data[1].trim()));
})

new Chart(chartRevenueOfMonth, {
    type: 'bar',
    data: {
        labels: labelMonth,
        datasets: [{
            data: labelMonthValue,
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                font: {
                    size: 17
                },
                text: 'Thống kê doanh thu theo tháng trong năm 2024'
            },
            legend: {
                display: false,
            }
        }
    }
});
chartRevenueOfMonth.style.backgroundColor = 'rgb(255, 255, 255)';

// Thống kê doanh thu theo tỉnh
const chartRevenueOfProvince = document.getElementById('chartRenevueOfProvince');
const dataRevenueOfProvince = chartRevenueOfProvince.getAttribute("data");
const listDataRevenueOfProvince = JSON.parse(dataRevenueOfProvince);

const labelProvince = [];
const labelMonthProvince = [];
listDataRevenueOfProvince.forEach(item => {
    const data = item.split(":");
    labelProvince.push(data[0]);
    labelMonthProvince.push(+(data[1].trim()));
})

new Chart(chartRevenueOfProvince, {
    type: 'bar',
    data: {
        labels: labelProvince,
        datasets: [{
            data: labelMonthProvince,
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                font: {
                    size: 17
                },
                text: 'Thống kê doanh thu theo tỉnh năm 2024'
            },
            legend: {
                display: false,
            }
        }
    }
});
chartRevenueOfProvince.style.backgroundColor = 'rgb(255, 255, 255)';

// Thống kê số lượng bán theo loại sản phẩm
const chartproductsSold = document.getElementById('chartproductsSold');
const dataChartproductsSold = chartproductsSold.getAttribute("data");
const listDataChartproductsSold = JSON.parse(dataChartproductsSold);

const labelProductSold = [];
const labelProductSoldValue = [];
listDataChartproductsSold.forEach(item => {
    const data = item.split(":");
    labelProductSold.push(data[0]);
    labelProductSoldValue.push(+(data[1].trim()));
})

new Chart(chartproductsSold, {
    type: 'bar',
    data: {
        labels: labelProductSold,
        datasets: [{
            data: labelProductSoldValue,
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                font: {
                    size: 17
                },
                text: 'Thống kê số lượng bán theo từng mặt hàng'
            },
            legend: {
                display: false,
            }
        }
    }
});
chartproductsSold.style.backgroundColor = 'rgb(255, 255, 255)';

// Thống kê số lượng bán theo số lượng tồn kho
const chartproductsInventory = document.getElementById('chartproductsInventoty');
const dataChartproductsInventory = chartproductsInventory.getAttribute("data");
const listDataChartproductsInventory = JSON.parse(dataChartproductsInventory);

const labelProductInventory = [];
const labelProductInventoryValue = [];
listDataChartproductsInventory.forEach(item => {
    const data = item.split(":");
    labelProductInventory.push(data[0]);
    labelProductInventoryValue.push(+(data[1].trim()));
})

new Chart(chartproductsInventory, {
    type: 'bar',
    data: {
        labels: labelProductInventory,
        datasets: [{
            label: 'Thống kê số lượng tồn kho theo từng mặt hàng',
            data: labelProductInventoryValue,
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                font: {
                    size: 17
                },
                text: 'Thống kê số lượng tồn kho theo từng mặt hàng'
            },
            legend: {
                display: false,
            }
        }
    }
});
chartproductsInventory.style.backgroundColor = 'rgb(255, 255, 255)';


// Thống kê đơn hàng theo tháng
const chartOrderOfMonth = document.getElementById('chartOrderOfMonth');
const dataOrderOfMonth = chartOrderOfMonth.getAttribute("data");
const listDataOrderOfMonth = JSON.parse(dataOrderOfMonth);

const labelOrderMonth = [];
const labelOrderMonthValue = [];
listDataOrderOfMonth.forEach(item => {
    const data = item.split(":");
    labelOrderMonth.push(data[0]);
    labelOrderMonthValue.push(+(data[1].trim()));
})

new Chart(chartOrderOfMonth, {
    type: 'line',
    data: {
        labels: labelOrderMonth,
        datasets: [{
            data: labelOrderMonthValue,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                font: {
                    size: 17
                },
                text: 'Thống kê đơn hàng theo tháng trong năm 2024'
            },
            legend: {
                display: false,
            }
        }
    }
});
chartOrderOfMonth.style.backgroundColor = 'rgb(255, 255, 255)';


// Thống kê theo loại sản phẩm
const chartTotalTypeProduct = document.getElementById('chartTotalTypeProduct');
const dataChartTotalTypeProduct = chartTotalTypeProduct.getAttribute("data");
const listDataChartTotalTypeProduct = JSON.parse(dataChartTotalTypeProduct);

const labelTotalTypeProduct = [];
const labelTotalTypeProductValue = [];
listDataChartTotalTypeProduct.forEach(item => {
    const data = item.split(":");
    labelTotalTypeProduct.push(data[0]);
    labelTotalTypeProductValue.push(+(data[1].trim()));
})

new Chart(chartTotalTypeProduct, {
    type: 'polarArea',
    data: {
        labels: labelTotalTypeProduct,
        datasets: [{
            data: labelTotalTypeProductValue,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(17, 122, 101)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)',
                'rgb(135, 54, 0)',
                'rgb(175, 96, 26)',
                'rgb(108, 52, 131)',
                'rgb(146, 43, 33)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                font: {
                    size: 17
                },
                text: 'Thống kê theo danh mục sản phẩm'
            },
            legend: {
                display: true,
            }
        }
    }
});
chartTotalTypeProduct.style.backgroundColor = 'rgb(255, 255, 255)';

// Thống kê theo trạng thái đơn hàng
const chartStatusOrder = document.getElementById('chartStatusOrder');
const dataChartStatusOrder = chartStatusOrder.getAttribute("data");
const listDataChartStatusOrder = JSON.parse(dataChartStatusOrder);

const labelStatusOrder = [];
const labelStatusOrderValue = [];
listDataChartStatusOrder.forEach(item => {
    const data = item.split(":");
    labelStatusOrder.push(data[0]);
    labelStatusOrderValue.push(+(data[1].trim()));
})

new Chart(chartStatusOrder, {
    type: 'polarArea',
    data: {
        labels: labelStatusOrder,
        datasets: [{
            label: "",
            data: labelStatusOrderValue,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 20,
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                font: {
                    size: 17
                },
                text: 'Thống kê theo trạng thái đơn hàng'
            },
            legend: {
                display: true,
            }
        }
    }
});
chartStatusOrder.style.backgroundColor = 'rgb(255, 255, 255)';