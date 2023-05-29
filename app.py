from flask import Flask, render_template, request
from db_config import db_cursor

import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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

    return render_template("checkout.html", product=product, emptyExistingOrderSummary = True)

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

@app.route('/contact/send')
def send_contact():    
    sender_email = "mahfuz225bd@gmail.com"
    password = "tvxjyiorwdlbxzac"

    if request.method == "GET":
        name = request.args.get('name')
        phoneNumber = request.args.get('phoneNumber')
        email = request.args.get('email')
        subject = request.args.get('subject')
        text_message = request.args.get('message')
    
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = sender_email
        message["To"] = email

        body = f'Email: {email}<br/> Name: {name}<br/>Phone Number: {phoneNumber}<br/>==============================<br/> {text_message}'

        _MIMEText = MIMEText(body, "html")
        message.attach(_MIMEText)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, email, message.as_string()
            )        
            return '<script>alert("Message has been sent");window.location.assign("/contact");</script>'

@app.route('/search')
def search():
    if request.method == 'GET':
        search_query = request.args.get('q')
    return render_template('search_result.html', searchTerm=search_query)

if __name__ == '__main__':
    app.run(debug=True)