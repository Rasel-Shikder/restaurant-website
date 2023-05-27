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

    // Payment
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
})