import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="restaurant_website"
)

db_cursor = mydb.cursor()