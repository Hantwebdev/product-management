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

// Sort
const sort = document.querySelector(".sort");
if (sort) {
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");

    sortSelect.addEventListener("change", (e) => {
        const [sortKey, sortValue] = e.target.value.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if (sortKey && sortValue) {
        const stringParams = `${sortKey}-${sortValue}`;
        const optionSelected = sort.querySelector(`option[value=${stringParams}]`);
        optionSelected.selected = true;
    }
}

// End Sort

// Filter
const listFilterType = document.querySelectorAll("[filter-type]");
const filterValueType = [];
if (listFilterType) {
    listFilterType.forEach(item => {
        item.addEventListener("change", (e) => {
            const itemId = e.target.value;
            filterValueType.push(itemId);
        })
    })
}

const listFilterPrice = document.querySelectorAll("[filter-price]");
const filterValuePrice = [];
if (listFilterPrice) {
    listFilterPrice.forEach(item => {
        item.addEventListener("change", (e) => {
            const itemPrice = e.target.value;
            filterValuePrice.push(itemPrice);
        })
    })
}

const filterSubmit = document.querySelector("[filter-submit]");
if (filterSubmit) {
    filterSubmit.addEventListener("click", () => {
        const url = new URL(window.location.href);
        url.searchParams.set("keyFilter", filterValueType.join("OR") + "AND" + filterValuePrice.join("OR"));
        window.location.href = url.href;
    })
}

// End Filter

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