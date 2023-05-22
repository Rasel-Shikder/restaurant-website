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
    
    db_cursor.execute("SELECT * FROM products")

    products_from_db = db_cursor.fetchall()

    for each_product in products_from_db:
        products.append({
        "id": each_product[0],
        "product_name": each_product[1],
        "available_qty": each_product[2],
        "price": each_product[3],
        "image_url": each_product[4],
        "details": each_product[5]
    })

    return render_template("products.html", products=products)

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)