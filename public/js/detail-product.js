// Form Quantity Item
const FormQuantity = document.querySelectorAll(".form-quantity-item");
if (FormQuantity.length > 0) {
    FormQuantity.forEach(item => {
        const buttonPlus = item.querySelector(".plus-btn");
        if (buttonPlus) {
            buttonPlus.addEventListener("click", () => {
                const inputsQuantity = item.querySelector("input[name='quantity']");
                const quantity = inputsQuantity.getAttribute("value");
                const maxQuantity = inputsQuantity.getAttribute("max");
                if (parseInt(quantity) < parseInt(maxQuantity)) {
                    const quantityNew = parseInt(quantity) + 1;

                    FormQuantity.forEach(item => {
                        const inputsQuantity = item.querySelector("input[name='quantity']");
                        inputsQuantity.setAttribute("value", quantityNew);
                    })
                }
            })
        }

        const buttonReduce = item.querySelector(".reduce-btn");
        if (buttonReduce) {
            buttonReduce.addEventListener("click", () => {
                const inputsQuantity = item.querySelector("input[name='quantity']");
                const quantity = inputsQuantity.getAttribute("value");
                if (parseInt(quantity) > 1) {
                    const quantityNew = parseInt(quantity) - 1;

                    FormQuantity.forEach(item => {
                        const inputsQuantity = item.querySelector("input[name='quantity']");
                        inputsQuantity.setAttribute("value", quantityNew);
                    })
                }
            })
        }
    })
}

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