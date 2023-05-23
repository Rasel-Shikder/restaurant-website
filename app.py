from flask import Flask, render_template
# from db_config import db_cursor    

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/products')
def products():
    products = [
  {
    "id": 1,
    "product_name": "Product 1",
    "available_qty": 17,
    "unit_price": 256.84,
    "image_url": "images/products/product1.jpg",
    "details": "This is a dummy product with ID 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 2,
    "product_name": "Product 2",
    "available_qty": 0,
    "unit_price": 227.23,
    "image_url": "images/products/product2.jpg",
    "details": "This is a dummy product with ID 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 3,
    "product_name": "Product 3",
    "available_qty": 16,
    "unit_price": 451.24,
    "image_url": "images/products/product3.jpg",
    "details": "This is a dummy product with ID 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 4,
    "product_name": "Product 4",
    "available_qty": 10,
    "unit_price": 327.07,
    "image_url": "images/products/product4.jpg",
    "details": "This is a dummy product with ID 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 5,
    "product_name": "Product 5",
    "available_qty": 14,
    "unit_price": 357.82,
    "image_url": "images/products/product5.jpg",
    "details": "This is a dummy product with ID 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 6,
    "product_name": "Product 6",
    "available_qty": 1,
    "unit_price": 57.23,
    "image_url": "images/products/product6.jpg",
    "details": "This is a dummy product with ID 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 7,
    "product_name": "Product 7",
    "available_qty": 9,
    "unit_price": 74.08,
    "image_url": "images/products/product7.jpg",
    "details": "This is a dummy product with ID 7. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 8,
    "product_name": "Product 8",
    "available_qty": 16,
    "unit_price": 462.08,
    "image_url": "images/products/product8.jpg",
    "details": "This is a dummy product with ID 8. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 9,
    "product_name": "Product 9",
    "available_qty": 20,
    "unit_price": 337.43,
    "image_url": "images/products/product9.jpg",
    "details": "This is a dummy product with ID 9. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 10,
    "product_name": "Product 10",
    "available_qty": 7,
    "unit_price": 63.1,
    "image_url": "images/products/product10.jpg",
    "details": "This is a dummy product with ID 10. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 11,
    "product_name": "Product 11",
    "available_qty": 3,
    "unit_price": 216.79,
    "image_url": "images/products/product11.jpg",
    "details": "This is a dummy product with ID 11. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 12,
    "product_name": "Product 12",
    "available_qty": 18,
    "unit_price": 402.79,
    "image_url": "images/products/product12.jpg",
    "details": "This is a dummy product with ID 12. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 13,
    "product_name": "Product 13",
    "available_qty": 20,
    "unit_price": 420.73,
    "image_url": "images/products/product13.jpg",
    "details": "This is a dummy product with ID 13. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 14,
    "product_name": "Product 14",
    "available_qty": 17,
    "unit_price": 220.0,
    "image_url": "images/products/product14.jpg",
    "details": "This is a dummy product with ID 14. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 15,
    "product_name": "Product 15",
    "available_qty": 19,
    "unit_price": 260.3,
    "image_url": "images/products/product15.jpg",
    "details": "This is a dummy product with ID 15. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 16,
    "product_name": "Product 16",
    "available_qty": 19,
    "unit_price": 371.48,
    "image_url": "images/products/product16.jpg",
    "details": "This is a dummy product with ID 16. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 17,
    "product_name": "Product 17",
    "available_qty": 4,
    "unit_price": 122.68,
    "image_url": "images/products/product17.jpg",
    "details": "This is a dummy product with ID 17. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 18,
    "product_name": "Product 18",
    "available_qty": 13,
    "unit_price": 248.67,
    "image_url": "images/products/product18.jpg",
    "details": "This is a dummy product with ID 18. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 19,
    "product_name": "Product 19",
    "available_qty": 12,
    "unit_price": 312.29,
    "image_url": "images/products/product19.jpg",
    "details": "This is a dummy product with ID 19. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    "id": 20,
    "product_name": "Product 20",
    "available_qty": 13,
    "unit_price": 396.0,
    "image_url": "images/products/product20.jpg",
    "details": "This is a dummy product with ID 20. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
]

    
    # db_cursor.execute("SELECT * FROM products")

    # products_from_db = db_cursor.fetchall()

    # for each_product in products_from_db:
    #     products.append({
    #     "id": each_product[0],
    #     "product_name": each_product[1],
    #     "available_qty": each_product[2],
    #     "unit_price": each_product[3],
    #     "image_url": each_product[4],
    #     "details": each_product[5]
    # })

    return render_template("products.html", products=products)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/success')
def success():
    return render_template('success.html')

@app.route('/failed')
def failed():
    return render_template('failed.html')

if __name__ == '__main__':
    app.run(debug=True)