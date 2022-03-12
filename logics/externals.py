from pymongo import MongoClient
from app.settings import BASE_DIR
import joblib

mongoClient = MongoClient('mongodb+srv://mongo:mongo@cluster0.9nefj.mongodb.net/scm?retryWrites=true&w=majority')

model = joblib.load(BASE_DIR / 'lr.model')