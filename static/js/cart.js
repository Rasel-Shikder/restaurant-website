document.addEventListener('DOMContentLoaded', () => {
    const updateCart = () => {
        const localStorageData = JSON.parse(localStorage.getItem('cartItems'))

        const tempCartItem = (id, imageUrl, productName, unitPrice, availableQty, qty) => `<tr>
                    <td>${id}</td>
                    <td><img src="/static/${imageUrl}" title="${productName}" style="width: 100px;height:100px;"></td>
                    <td>${productName}</td>
                    <td>${unitPrice}</td>
                    <td>&times; <input type="number" id="qty" class="input-qty"
                            title="Input Product Quantity" min="2" max="${availableQty - qty}" value="${qty}" />
                    </td>
                    <td>
                        <output id="price">${unitPrice * qty}</output>
                    </td>
                </tr>`

        if (localStorageData !== null) {
            const cartItems = document.querySelector("#cartItems tbody")
            localStorageData.forEach(each => {
                cartItems.innerHTML = ''
                cartItems.innerHTML += tempCartItem(each.id, each.imageUrl, each.productName, each.unitPrice, each.availableQty, each.qty)
            })
        }
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
})