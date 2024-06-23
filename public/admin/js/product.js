// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonsStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });
    });
}
// End Button Status

// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach((button) => {
        button.addEventListener("change", (e) => {
            const statusCurrent = e.target.value;
            const id = button.getAttribute("data-id");

            const action = path + `/${statusCurrent}/${id}?_method=PATCH`;

            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
    buttonChangeStatus.forEach(item => {
        const status = item.getAttribute("data-status");
        const optionSelected = item.querySelector(`option[value='${status}']`);
        optionSelected.selected = true;
    })
}
// End Change Status


// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach((button) => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xoá sản phẩm này không?");

            if (isConfirm) {
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
        });
    });
}
// End Delete Item


// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    });
}
// End Form Search

// accordions
const accordions = document.querySelectorAll(".accordion");
accordions?.forEach((item) =>
    item.addEventListener("click", handleActiveAccordion)
);
function handleActiveAccordion() {
    this.classList.toggle("is-active");
    const isActive = this.classList.contains("is-active");
    const innerContent = this.querySelector(".accordion-inner");
    this.querySelector(".accordion-content")?.setAttribute(
        "style",
        `height: ${isActive ? innerContent.clientHeight : 0}px;`
    );
}