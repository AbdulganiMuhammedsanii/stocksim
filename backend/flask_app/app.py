from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)  # Initialize SQLAlchemy with the Flask app
migrate = Migrate(app, db)  # Set up migrations

# Define a simple route
@app.route('/')
def home():
    return "Election ML Flask App is Running"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json.get('input_data')
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # Perform prediction logic (ML model, etc.)
    prediction_result = "Sample Prediction"  # Replace with real prediction logic

    return jsonify({"result": prediction_result}), 200

@app.route('/fetch-data', methods=['GET'])
def fetch_data():
    # Replace with your actual logic to fetch polling data
    polling_data = {
        "state": "California",
        "polls": [
            {"candidate": "Candidate A", "percentage": 55},
            {"candidate": "Candidate B", "percentage": 45}
        ]
    }
    return jsonify(polling_data), 200

# Example model (optional, can be placed in models.py)
class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    input_data = db.Column(db.Text, nullable=False)
    result = db.Column(db.String(255), nullable=False)

if __name__ == "__main__":
    app.run(debug=True)
