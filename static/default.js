document.addEventListener('DOMContentLoaded', () => {
    /* Start: Cart Modal */
    const modal = document.getElementById("cartModal");
    const btn = document.getElementById("btnCart");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    /* End: Cart Modal */

    /* Start: Cart */
    const updateCart = () => {
        const localStorageData = JSON.parse(localStorage.getItem('cartItems'))

        const tempCartItem = (id, imageUrl, productName, unitPrice, availableQty, qty) => `<tr>
                    <td style="text-align:right;padding-right:10px;">${id}</td>
                    <td style="text-align:left;"><img src="/static/${imageUrl}" title="${productName}" style="width: 100px;height:100px;"></td>
                    <td style="text-align:center;">${productName}</td>
                    <td style="text-align:right;">&#2547; ${unitPrice}</td>
                    <td style="text-align:left;">&nbsp;&times; <input type="number" id="qty" class="input-qty"
                            title="Input Product Quantity" min="0" max="${availableQty}" value="${qty}" data-product-name="${productName}" />
                    </td>
                    <td style="text-align:right;">
                        &#2547; <output class="price">${parseFloat(unitPrice * qty).toFixed(2)}</output>
                    </td>
                    <td style="padding-right:5px;text-align:right;">
                    <a href="#" class="btn btn-outlined btn-delete-cart"
                                    title="Delete Cart Item"><i class="fa fa-trash-alt"></i> Delete</a>
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
            if (each) {
                currentTotal += Number(each.innerHTML)
            }
        })

        if (total) {
            total.innerHTML = parseFloat(currentTotal).toFixed(2)
        }

        // Updating cart item count
        document.querySelectorAll('.count-cart-items').forEach(each => each.innerText = localStorageData ? localStorageData.length : "0")
    }
    updateCart()

    const localStorageCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let currentId = 0;

    document.querySelectorAll(".add-to-cart").forEach(each => {
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
    /* End: Cart */

    /* Start: Checkout */
    const tempProductListLi = (productName, unitPrice, qty, price) => `<li>
    <strong>${productName}</strong>
    <ul>
        <li>Unit Price: ${unitPrice} &times; ${qty}
        </li>
        <li>Price: &#2547; ${price}</li>
    </ul>
</li>`

    const cartItemsTbody = document.querySelector("#cartItems tbody")
    const checkoutTr = cartItemsTbody.querySelectorAll('tr');
    let totalPrice = 0
    checkoutTr.forEach(each => {
        const col1 = each.querySelectorAll('td')[2].innerText
        const col2 = each.querySelectorAll('td')[3].innerText
        const col3 = each.querySelectorAll('td')[4].querySelector('input[type="number"]').value
        const col4 = each.querySelectorAll('td')[5].querySelector('.price').innerText
        totalPrice += parseFloat(col4)

        if (document.querySelector("#productList")) {
            document.querySelector("#productList").innerHTML += tempProductListLi(col1, col2, col3, col4)
        }
    })

    const totalToCheckout = document.querySelector("#totalToCheckout")
    if (totalToCheckout) {
        totalToCheckout.innerHTML = parseFloat(totalPrice)
    }

    function disableMobileBanking(isTrue) {
        const elems = document.querySelectorAll('#mobileBankingInfo select, #mobileBankingInfo input');
        elems.forEach(function (element) {
            if (element) {
                element.disabled = isTrue;
            }
        });
    }

    function disableCard(isTrue) {
        const elems = document.querySelectorAll('.card-part input');
        elems.forEach(function (element) {
            if (element) {
                element.disabled = isTrue;
            }
        });
    }

    disableMobileBanking(true)
    disableCard(true)

    const card = document.querySelector('#card')
    if (card) {
        card.addEventListener('click', (e) => {
            alert("This feature is pending!")
            disableMobileBanking(true)
            disableCard(false)
        });
    }

    const cod = document.querySelector('#cod');
    if (cod) {
        cod.addEventListener('click', (e) => {
            disableMobileBanking(true)
            disableCard(true)
        });
    }

    const mobileBanking = document.querySelector('#mobileBanking');
    if (mobileBanking) {
        mobileBanking.addEventListener('click', (e) => {
            disableMobileBanking(false)
            disableCard(true)
        });
    }

    // if current route is: /checkout
    if (window.location.pathname === '/checkout') {
        document.querySelector("#btnCart").style.display = "none"
    }
    /* End: Checkout */

    /* Start: Payment */
    const frmCheckout = document.getElementById("frmCheckout")
    if (frmCheckout) {
        frmCheckout.addEventListener("submit", function (e) {
            e.preventDefault();
            const cus_name = document.getElementById("name").value;
            const cus_email = document.getElementById("email").value;
            const amount = document.getElementById("totalToCheckout").innerText;

            const apikey = '646c6ba60e397'; // Your Api Key
            const clientkey = '646c6ba613d49'; // Your Client Key
            const secretkey = '84992251'; // Your Secret Key

            const success_url = '/success';
            const cancel_url = '/failed';
            const hostname = '/';

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://pay.edokanpay.com/checkout.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    location.href = xhr.responseText;
                }
            };
            const data = "api=" + encodeURIComponent(apikey) +
                "&client=" + encodeURIComponent(clientkey) +
                "&secret=" + encodeURIComponent(secretkey) +
                "&amount=" + encodeURIComponent(amount) +
                "&position=" + encodeURIComponent(hostname) +
                "&success_url=" + encodeURIComponent(success_url) +
                "&cancel_url=" + encodeURIComponent(cancel_url) +
                "&cus_name=" + encodeURIComponent(cus_name) +
                "&cus_email=" + encodeURIComponent(cus_email);
            xhr.send(data);
        });
    }
    /* End: Payment */
})