from flask import Flask, render_template
from db_config import db_cursor   

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/products')
def products():
    products = []
    
    db_cursor.execute("SELECT id, product_name, available_qty, unit_price, image_url, details FROM products")
    
    products_from_db = db_cursor.fetchall()

    for each_product in products_from_db:
        products.append({
        "id": each_product[0],
        "product_name": each_product[1],
        "available_qty": each_product[2],
        "unit_price": each_product[3],
        "image_url": each_product[4],
        "details": each_product[5]
    })

    return render_template("products.html", products=products)

@app.route('/products/<name>')
def product(name):
    name_for_sql = name.replace('-', ' ')
    db_cursor.execute(f"SELECT id, product_name, available_qty, unit_price, image_url, details FROM products WHERE LCASE(product_name) = '{name_for_sql.lower()}'")

    product_from_db = db_cursor.fetchall()

    product = {
        "id": product_from_db[0][0],
        "product_name": product_from_db[0][1],
        "available_qty": product_from_db[0][2],
        "unit_price": product_from_db[0][3],
        "image_url": product_from_db[0][4],
        "details": product_from_db[0][5]
    }

    return render_template("product-details.html", product=product)

@app.route('/buy-now/<name>')
def buy_now(name):
    name_for_sql = name.replace('-', ' ')
    db_cursor.execute(f"SELECT id, product_name, available_qty, unit_price, image_url, details FROM products WHERE LCASE(product_name) = '{name_for_sql.lower()}'")

    product_from_db = db_cursor.fetchall()

    product = {
        "id": product_from_db[0][0],
        "product_name": product_from_db[0][1],
        "available_qty": product_from_db[0][2],
        "unit_price": product_from_db[0][3],
        "image_url": product_from_db[0][4],
        "details": product_from_db[0][5]
    }

    return render_template("buy-now.html", product_id = product['id'], product_name = product['product_name'])

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/success')
def success():
    return render_template('success.html')

@app.route('/failed')
def failed():
    return render_template('failed.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)