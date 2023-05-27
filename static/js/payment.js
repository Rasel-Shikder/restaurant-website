document.addEventListener('DOMContentLoaded', () => {
    const frmCheckout = document.getElementById("frmCheckout")
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

})