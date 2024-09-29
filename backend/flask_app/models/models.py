from app import db

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    input_data = db.Column(db.Text, nullable=False)
    result = db.Column(db.String(255), nullable=False)
