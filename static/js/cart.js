document.addEventListener('DOMContentLoaded', () => {
    const updateCart = () => {
        const localStorageData = JSON.parse(localStorage.getItem('cartItems'))

        const tempCartItem = (id, imageUrl, productName, unitPrice, availableQty, qty) => `<tr>
                    <td style="text-align:right;padding-right:10px;">${id}</td>
                    <td style="text-align:left;"><img src="/static/${imageUrl}" title="${productName}" style="width: 100px;height:100px;"></td>
                    <td style="text-align:center;">${productName}</td>
                    <td style="text-align:right;">&#2547; ${unitPrice}</td>
                    <td style="text-align:left;">&nbsp;&times; <input type="number" id="qty" class="input-qty"
                            title="Input Product Quantity" min="1" max="${availableQty}" value="${qty}" data-product-name="${productName}" />
                    </td>
                    <td style="text-align:right;padding-right:5px;">
                        &#2547; <output class="price">${parseFloat(unitPrice * qty).toFixed(2)}</output>
                    </td>
                </tr>`

        if (localStorageData !== null) {
            const cartItems = document.querySelector("#cartItems tbody")
            cartItems.innerHTML = ''

            localStorageData.forEach(each => {
                cartItems.innerHTML += tempCartItem(each.id, each.imageUrl, each.productName, each.unitPrice, each.availableQty, each.qty)
            })
        }

        // Updating total price
        const total = document.querySelector("#total")

        let currentTotal = 0;
        document.querySelectorAll("#cartItems .price").forEach(each => {
            currentTotal += Number(each.innerHTML)
        })

        total.innerHTML = parseFloat(currentTotal).toFixed(2)

        // Updating cart item count
        const cartItemsTr = document.querySelectorAll("#cartItems tbody tr")
        document.querySelectorAll('.count-cart-items').forEach(each => each.innerText = cartItemsTr.length)
    }
    updateCart()

    const localStorageCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let currentId = 0;

    document.querySelectorAll("#btnAddToCart").forEach(each => {
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
                            const btnAddToCart = document.querySelector(`#btnAddToCart[data-product-name="${newData[targetIndex].productName}"`)
                            btnAddToCart.classList.add('btn-disabled')
                            // #btnBuyNow
                            const btnBuyNow = btnAddToCart.previousElementSibling
                            if (btnBuyNow.id === "btnBuyNow") {
                                btnBuyNow.classList.add('btn-disabled')
                            } else {
                                console.error("previousElementSibling of #btnAddToCart is not #btnBuyNow. Check HTML code.")
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

})