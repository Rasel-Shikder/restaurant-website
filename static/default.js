document.addEventListener('DOMContentLoaded', () => {
    // For modal
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

    // Checkout
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

    document.querySelector("#totalToCheckout").innerHTML = parseFloat(totalPrice)

    function disableMobileBanking(isTrue) {
        const elems = document.querySelectorAll('#mobileBankingInfo select, #mobileBankingInfo input');
        elems.forEach(function (element) {
            element.disabled = isTrue;
        });
    }

    function disableCard(isTrue) {
        const elems = document.querySelectorAll('.card-part input');
        elems.forEach(function (element) {
            element.disabled = isTrue;
        });
    }

    disableMobileBanking(true)
    disableCard(true)

    var card = document.querySelector('#card')
    card.addEventListener('click', (e) => {
        disableMobileBanking(true)
        disableCard(false)
    });

    var cod = document.querySelector('#cod');
    cod.addEventListener('click', (e) => {
        disableMobileBanking(true)
        disableCard(true)
    });

    var mobileBanking = document.querySelector('#mobileBanking');
    mobileBanking.addEventListener('click', (e) => {
        disableMobileBanking(false)
        disableCard(true)
    });

    if (window.location.pathname === '/checkout') {
        document.querySelector("#btnCart").style.display = "none"
    }

})