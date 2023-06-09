document.addEventListener('DOMContentLoaded', () => {
    const frmCheckout = document.getElementById("frmCheckout")
    frmCheckout.addEventListener("submit", function (e) {
        e.preventDefault();
        // const cus_name = document.getElementById("name").value;
        // const cus_email = document.getElementById("email").value;
        // const amount = document.getElementById("totalToCheckout").innerText;

        // const apikey = '6473c0464a64c'; // Your Api Key
        // const clientkey = '6473c0464a663'; // Your Client Key
        // const secretkey = '1850881815'; // Your Secret Key

        // const success_url = '/success';
        // const cancel_url = '/failed';
        // const hostname = '/';

        // const xhr = new XMLHttpRequest();
        // xhr.open("POST", "https://pay.edokanpay.com/checkout.php");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.onreadystatechange = function () {        

        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         location.href = xhr.responseText;
        //         console.log(xhr.responseText);
        //     }
        // };
        // const data = "api=" + encodeURIComponent(apikey) +
        //     "&client=" + encodeURIComponent(clientkey) +
        //     "&secret=" + encodeURIComponent(secretkey) +
        //     "&amount=" + encodeURIComponent(amount) +
        //     "&position=" + encodeURIComponent(hostname) +
        //     "&success_url=" + encodeURIComponent(success_url) +
        //     "&cancel_url=" + encodeURIComponent(cancel_url) +
        //     "&cus_name=" + encodeURIComponent(cus_name) +
        //     "&cus_email=" + encodeURIComponent(cus_email);
        // xhr.send(data);

        // Bellow code should be here, add those code inside if (xhr.readyState === 4 && xhr.status === 200) { ... } 
        const formData = new FormData(e.target)
        const today = new Date().toLocaleDateString();
        const isPaid = true
        const invoiceData = {
            'payment_status': isPaid ? 'Paid' : 'Unpaid',
            'invoice_id': 'INV' + Math.floor(Math.random() * 100000) + 1000,
            'order_date': today,
            'customer_name': formData.get('name'),
            'billing_address': formData.get('billingAddress'),
            'products': 'Products Not Provided',
            'sub_total': document.querySelector('output#subTotal').innerHTML,
            'delivery_charge': '30',
            'discount': document.querySelector('output#discountPrice').innerHTML,
            'total': document.querySelector('output#totalToCheckout').innerHTML,
            'transaction_date': isPaid ? today : '',
            'gateway': formData.get('payment'),
            'transaction_id': '{TRANSACTION_ID}',
            'paid_amount': '{Paid Amount}',
            'balance': '{Balance}'
        };


        window.location.assign(`/payment?from=mahfuz225bd@gmail.com&to=${document.getElementById("email").value}&subject=You%20payment%20is%20successful&message=Invoice%23${invoiceData.invoice_id}%20-%20Total%20Price%3A%20BDT%20${invoiceData.total}&invoiceData=${encodeURIComponent(JSON.stringify(invoiceData))}`)
        if (window.location.pathname === '/checkout') {
            localStorage.setItem('cartItems', '[]')
        }
    });

})