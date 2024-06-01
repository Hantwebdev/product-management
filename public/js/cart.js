// Button plus qty
const listSelectQuantity = document.querySelectorAll(".select-item-qty");
if (listSelectQuantity.length > 0) {
    listSelectQuantity.forEach(item => {
        const buttonPlus = item.querySelector(".plus-btn");
        if (buttonPlus) {
            buttonPlus.addEventListener("click", () => {
                const inputsQuantity = item.querySelector("input[name='quantity']");
                const quantity = inputsQuantity.getAttribute("value");
                const quantityNew = parseInt(quantity) + 1;
                inputsQuantity.setAttribute("value", quantityNew);

                const formChangeQty = document.querySelector("#form-update-quantity");
                const productId = inputsQuantity.getAttribute("product-id");

                const action = `/cart/update/${productId}/${quantityNew}`;
                formChangeQty.action = action;

                formChangeQty.submit();

            })
        }

        const buttonReduce = item.querySelector(".reduce-btn");
        if (buttonReduce) {
            buttonReduce.addEventListener("click", () => {
                const inputsQuantity = item.querySelector("input[name='quantity']");
                const quantity = inputsQuantity.getAttribute("value");
                if (parseInt(quantity) > 1) {
                    const quantityNew = parseInt(quantity) - 1;
                    inputsQuantity.setAttribute("value", quantityNew);

                    const formChangeQty = document.querySelector("#form-update-quantity");
                    const productId = inputsQuantity.getAttribute("product-id");

                    const action = `/cart/update/${productId}/${quantityNew}`;
                    formChangeQty.action = action;

                    formChangeQty.submit();
                }
            })
        }
    })
}



// Cap nhat so luong sp trong cart
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
if (inputsQuantity.length > 0) {
    inputsQuantity.forEach(input => {
        input.addEventListener("change", (e) => {
            const productId = input.getAttribute("product-id");
            const quantity = e.target.value
            console.log(productId);
            console.log(quantity);

            window.location.href = `/cart/update/${productId}/${quantity}`;
        })
    })
}
// Het cap nhat so luong sp trong cart