document.addEventListener('DOMContentLoaded', () => {
    const frmCheckout = document.getElementById("frmCheckout")
    frmCheckout.addEventListener("submit", function (e) {
        e.preventDefault();
        const cus_name = document.getElementById("name").value;
        const cus_email = document.getElementById("email").value;
        const amount = document.getElementById("totalToCheckout").innerText;

        const apikey = '6473c0464a64c'; // Your Api Key
        const clientkey = '6473c0464a663'; // Your Client Key
        const secretkey = '1850881815'; // Your Secret Key

        const success_url = '/success';
        const cancel_url = '/failed';
        const hostname = '/';

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://pay.edokanpay.com/checkout.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            // Bellow code should be removed
            if (cus_email) {
                const random_invoice_id = Math.floor(Math.random() * 100000) + 1000
                window.location.assign(`/sendInvoiceViaMail?from=mahfuz225bd@gmail.com&to=${cus_email}&subject=You%20payment%20is%20successful&message=Invoice%23${random_invoice_id}%20-%20Total%20Price%3A%20BDT%20${amount}`)
                if (window.location.pathname === '/checkout') {
                    localStorage.setItem('cartItems', '[]')
                }
            }

            if (xhr.readyState === 4 && xhr.status === 200) {
                location.href = xhr.responseText;
                console.log(xhr.responseText);
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

})