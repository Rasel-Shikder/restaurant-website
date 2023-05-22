document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('cartItems', '[]')

    const localStorageCartItems = JSON.parse(localStorage.getItem('cartItems'))

    document.querySelectorAll("#btnAddToCart").forEach(each => {
        each.addEventListener('click', (event) => {
            if (event.target === each || each.contains(event.target)) {
                if (each.dataset.availableQty > 1) {
                    const newData = localStorageCartItems
                    newData.push({
                        productName: each.dataset.productName,
                        availableQty: parseInt(each.dataset.availableQty),
                        price: parseFloat(each.dataset.price),
                        imageUrl: each.dataset.imageUrl
                    })

                    localStorage.setItem('cartItems', JSON.stringify(newData))
                }
            }
        })
    })
})