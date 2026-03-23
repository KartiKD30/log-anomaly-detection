from pymongo import MongoClient

# 🔥 Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

# 🔥 Database
db = client["lds_db"]

# 🔥 Collection
collection = db["logs"]