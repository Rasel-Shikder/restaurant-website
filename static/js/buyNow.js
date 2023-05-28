document.addEventListener('DOMContentLoaded', () => {
    // temp: #orderSummary (empty products)
    const tempOrderSummary = `<ul class="product-list" id="productList">
    </ul>
    <p style="text-align: right; font-weight: bold;">Sub Total: &#2547; <output id="subTotal">0</output></p>
    <p style="text-align: right; font-weight: bold;">VAT (+): &#2547; <output id="vatPrice">0</output></p>
    <p style="text-align: right; font-weight: bold;">Shipping Charge (+): &#2547; <output
            id="subTotal">0</output></p>
    <p style="text-align: right; font-weight: bold;">Discount (-): &#2547; <output
            id="discountPrice">0</output>
    </p>
    <p style="text-align: right; font-weight: bold;">Total: &#2547; <output id="totalToCheckout">0</output>
    </p>`
})