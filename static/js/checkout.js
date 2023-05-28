document.addEventListener('DOMContentLoaded', () => {
    const tempProductListLi = (productName, unitPrice, qty, price) => `<li>
            <strong>${productName}</strong>
            <ul>
                <li>Unit Price: &#2547; ${unitPrice} &times; ${qty}
                </li>
                <li>Price: &#2547; ${price}</li>
            </ul>
        </li>`

    const getCartItems = JSON.parse(localStorage.getItem('cartItems'))
    let totalPrice = 0

    const productList = document.querySelector("#productList")
    productList.innerHTML = ''

    getCartItems.forEach(each => {
        const col1 = each.productName
        const col2 = each.unitPrice
        const col3 = each.qty
        const col4 = parseFloat(each.unitPrice * each.qty).toFixed(2)
        totalPrice += col4

        productList.innerHTML += tempProductListLi(col1, col2, col3, col4)
    })

    // Update order subtotal and totalToCheckout
    const subTotal = document.querySelector("#subTotal")
    const discountPrice = document.getElementById('discountPrice')
    const totalToCheckout = document.getElementById('totalToCheckout')

    subTotal.innerHTML = parseFloat(totalPrice).toFixed(2)
    totalToCheckout.innerText = parseFloat(Number(subTotal.innerText) + 30 - Number(discountPrice.innerText)).toFixed(2)

    function disableMobileBanking(isTrue) {
        const elems = document.querySelectorAll('#mobileBankingInfo select, #mobileBankingInfo input');
        elems.forEach(function (element) {
            element.disabled = isTrue;
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
    card.addEventListener('click', (e) => {
        alert("This feature is pending!")
        disableMobileBanking(true)
        disableCard(false)
    });

    const cod = document.querySelector('#cod');
    cod.addEventListener('click', (e) => {
        disableMobileBanking(true)
        disableCard(true)
    });


    const mobileBanking = document.querySelector('#mobileBanking');
    mobileBanking.addEventListener('click', (e) => {
        disableMobileBanking(false)
        disableCard(true)
    });
})