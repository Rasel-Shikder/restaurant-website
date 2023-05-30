document.addEventListener('DOMContentLoaded', () => {
    /* Start: Cart Modal */
    const cartModal = document.getElementById("cartModal");
    const btnCart = document.getElementById("btnCart");
    const close = document.getElementsByClassName("close")[0];

    btnCart.addEventListener("click", () => {
        cartModal.style.display = "block";
    });

    close.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
    /* End: Cart Modal */

    /* Start: Cart */
    const localStorageCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const updateCart = () => {
        const cartModalBody = document.querySelector("#cartModal .modal-body")
        cartModalBody.innerHTML = '<table id="cartItems" class="cart-items"> <thead> <tr> <th style="text-align:right;padding-right:10px;">#</th> <th style="text-align:left;"></th> <th style="text-align:center;">Product Name</th> <th style="text-align:right;">Unit Price</th> <th style="text-align:left;">Qty.</th> <th style="text-align:right;">Price</th> <th style="text-align:right;padding-right: 10px;"></th> </tr></thead> <tbody></tbody> <tfoot> <tr> <td></td><td></td><td></td><td></td><td></td><td></td><th style="text-align: right;">&#2547; <output id="total">0</output></th> </tr></tfoot> </table>'

        const tempCartItem = (id, imageUrl, productName, unitPrice, availableQty, qty) => `<tr>
                    <td style="text-align:right;padding-right:10px;">${id}</td>
                    <td style="text-align:left;"><img src="/static/${imageUrl}" title="${productName}" style="width: 100px;height:100px;"></td>
                    <td style="text-align:center;">${productName}</td>
                    <td style="text-align:right;">&#2547; ${unitPrice}</td>
                    <td style="text-align:left;">&nbsp;&times; <input type="number" class="input-qty" name="qty"
                            title="Input Product Quantity" min="0" max="${availableQty}" value="${qty}" data-product-name="${productName}" />
                    </td>
                    <td style="text-align:right;">
                        &#2547; <output class="price">${parseFloat(unitPrice * qty).toFixed(2)}</output>
                    </td>
                    <td style="padding-right:5px;text-align:right;">
                    <a href="/products" class="btn btn-outlined delete-cart-item" title="Delete Cart Item" data-product-name="${productName}"><i class="fa fa-trash-alt"></i> Delete</a>
                    </td>
                </tr>`

        if (localStorageCartItems.length > 0) {
            const cartItems = document.querySelector("#cartItems tbody")
            cartItems.innerHTML = ''

            localStorageCartItems.forEach(each => {
                cartItems.innerHTML += tempCartItem(each.id, each.imageUrl, each.productName, each.unitPrice, each.availableQty, each.qty)
            })
        }

        // Updating total price
        const total = document.querySelector("#total")

        let currentTotal = 0;
        document.querySelectorAll("#cartItems .price").forEach(each => {
            if (each) {
                currentTotal += Number(each.innerHTML)
            }
        })

        if (total) {
            total.innerHTML = parseFloat(currentTotal).toFixed(2)
        }

        // Updating cart item count
        document.querySelectorAll('.count-cart-items').forEach(each => each.innerText = localStorageCartItems.length)
    }

    // Show empty cart message or updateCart()
    if (localStorageCartItems.length === 0) {
        const targetElement = document.querySelector("#cartModal .modal-body")
        targetElement.innerHTML = ''
        targetElement.innerHTML = '<p style="font-weight: bold; font-size: large;">Cart is empty.</p>'
    } else {
        updateCart()
    }

    let currentId;

    // if cart is not empty, get and set last id
    if (localStorageCartItems.length > 0) {
        currentId = localStorageCartItems[localStorageCartItems.length - 1].id;
    } else {
        currentId = 0;
    }

    // Add a Cart Item
    document.querySelectorAll(".add-cart-item").forEach(each => {
        each.addEventListener('click', (event) => {
            if (event.target === each || each.contains(event.target)) {
                if (each.dataset.availableQty > 1) {
                    const newData = localStorageCartItems
                    if (!newData.some(e => e.productName === each.dataset.productName)) {
                        newData.push({
                            id: ++currentId,
                            productName: each.dataset.productName,
                            availableQty: each.dataset.availableQty,
                            qty: 1,
                            unitPrice: parseFloat(each.dataset.unitPrice),
                            imageUrl: each.dataset.imageUrl
                        })
                    } else {
                        const targetIndex = newData.findIndex(e => e.productName === each.dataset.productName)
                        if (each.dataset.availableQty > newData[targetIndex].qty) {
                            newData[targetIndex].qty += 1
                        } else {
                            alert('Sorry, this product is out of stock.')
                            const btnAddToCart = document.querySelector(`.add-cart-item[data-product-name="${newData[targetIndex].productName}"`)
                            btnAddToCart.classList.add('btn-disabled')

                            const btnBuyNow = btnAddToCart.previousElementSibling
                            if (btnBuyNow.classList.contains('buy-now')) {
                                btnBuyNow.classList.add('btn-disabled')
                            } else {
                                console.error("previousElementSibling of .add-cart-item is not .buy-now. Check HTML code.")
                            }
                        }
                    }

                    localStorage.setItem('cartItems', JSON.stringify(newData))

                    setTimeout(() => {
                        updateCart()
                    });
                }
            }
        })
    })

    // Delete a Cart Item
    document.querySelectorAll(".delete-cart-item").forEach(each => {
        each.addEventListener('click', (event) => {
            const cartItems = localStorageCartItems
            if (event.target === each || each.contains(event.target)) {
                const newData = cartItems.filter(e => e.productName !== each.dataset.productName)

                localStorage.setItem('cartItems', JSON.stringify(newData))

                setTimeout(() => {
                    updateCart()
                });
            }
        })
    })

    // Alert while product is not available
    document.querySelectorAll(".btn-disabled").forEach(each => {
        each.addEventListener('click', () => {
            alert('Sorry, this product is out of stock.')
        })
    })

    setInterval(() => {
        const cartQtyAll = document.querySelectorAll("#cartItems .input-qty")
        cartQtyAll.forEach(each => {
            each.addEventListener('input', (event) => {
                const newData = localStorageCartItems
                const targetIndex = newData.findIndex(e => e.productName === event.target.dataset.productName)
                newData[targetIndex].qty = event.target.value

                setTimeout(() => {
                    localStorage.setItem('cartItems', JSON.stringify(newData))

                    setTimeout(() => {
                        updateCart()
                    })
                })
            })
        })
    }, 100);
    /* End: Cart */
})