
// Dashboard
// Thống kê doanh thu theo tháng
const chartRevenueOfMonth = document.getElementById('chartRevenueOfMonth');
const dataRevenueOfMonth = chartRevenueOfMonth.getAttribute("data");
const listDataRevenueOfMonth = JSON.parse(dataRevenueOfMonth);

const labelMonth = [];
const labelMonthValue = [];
const revenueOfMonthTemplate = [];
listDataRevenueOfMonth.forEach(item => {
    const data = item.split(":");
    labelMonth.push(data[0]);
    labelMonthValue.push(+(data[1].trim()));
    revenueOfMonthTemplate.push({ month: data[0], revenue: +(data[1].trim()) })
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
const revenueOfProvince = [];
listDataRevenueOfProvince.forEach(item => {
    const data = item.split(":");
    labelProvince.push(data[0]);
    labelMonthProvince.push(+(data[1].trim()));
    revenueOfProvince.push({ province: data[0], revenue: +(data[1].trim()) })
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
const productSoldTemplate = [];
listDataChartproductsSold.forEach(item => {
    const data = item.split(":");
    labelProductSold.push(data[0]);
    labelProductSoldValue.push(+(data[1].trim()));
    productSoldTemplate.push({ product: data[0], number: +(data[1].trim()) })
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
const productInventoryTemplate = [];
listDataChartproductsInventory.forEach(item => {
    const data = item.split(":");
    labelProductInventory.push(data[0]);
    labelProductInventoryValue.push(+(data[1].trim()));
    productInventoryTemplate.push({ product: data[0], number: +(data[1].trim()) })
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
const orderMonthTemplate = [];
listDataOrderOfMonth.forEach(item => {
    const data = item.split(":");
    labelOrderMonth.push(data[0]);
    labelOrderMonthValue.push(+(data[1].trim()));
    orderMonthTemplate.push({ month: data[0], totalOrders: +(data[1].trim()) })
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


// -----------------------------------------------------------------

const statisticRevenue = document.querySelector("[statisticRevenue]");
const statisticRevenueValue = statisticRevenue.getAttribute("statisticRevenue");

const statisticOrder = document.querySelector("[statisticOrder]");
const statisticOrderValue = statisticOrder.getAttribute("statisticOrder");
// docxtemplate
const docs = document.getElementById("doc");

window.generate = function generate() {
    const reader = new FileReader();
    if (docs.files.length === 0) {
        alert("No files selected");
    }
    reader.readAsBinaryString(docs.files.item(0));

    reader.onerror = function (evt) {
        console.log("error reading file", evt);
        alert("error reading file" + evt);
    };
    reader.onload = function (evt) {
        const content = evt.target.result;
        const zip = new PizZip(content);
        const doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const data = {
            revenueOfMonth: revenueOfMonthTemplate,
            totalRevenue: statisticRevenueValue,
            ordersOfMonth: orderMonthTemplate,
            Orders: statisticOrderValue,
            revenueOfProvince: revenueOfProvince,
            productSold: productSoldTemplate,
            productInventory: productInventoryTemplate
        }

        doc.render(data);

        const blob = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE",
        });
        // Output the document using Data-URI
        saveAs(blob, "Bao_cao_ban_hang_2024.docx");
    };
};

// Xuất dashboard
document.getElementById('downloadBtn').addEventListener('click', function () {
    html2canvas(document.getElementById('dashboard-detail'))
        .then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'dashboard.png';
            link.click();
        })
        .catch(error => console.log(error));
});
