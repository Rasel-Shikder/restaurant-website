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
})