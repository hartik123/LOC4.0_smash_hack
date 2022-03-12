from app.settings import BASE_DIR
import joblib

model = joblib.load(BASE_DIR / 'lr.model')