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
    # Pseudo polling data for Kamala Harris and Donald Trump in all states
    polling_data = [
        {"state": "California", "polls": [
            {"candidate": "Kamala Harris", "percentage": 55},
            {"candidate": "Donald Trump", "percentage": 45}
        ]},
        {"state": "Texas", "polls": [
            {"candidate": "Donald Trump", "percentage": 60},
            {"candidate": "Kamala Harris", "percentage": 40}
        ]},
        {"state": "Florida", "polls": [
            {"candidate": "Donald Trump", "percentage": 52},
            {"candidate": "Kamala Harris", "percentage": 48}
        ]},
        {"state": "New York", "polls": [
            {"candidate": "Kamala Harris", "percentage": 58},
            {"candidate": "Donald Trump", "percentage": 42}
        ]},
        {"state": "Georgia", "polls": [
            {"candidate": "Donald Trump", "percentage": 51},
            {"candidate": "Kamala Harris", "percentage": 49}
        ]},
        {"state": "Pennsylvania", "polls": [
            {"candidate": "Kamala Harris", "percentage": 50},
            {"candidate": "Donald Trump", "percentage": 50}
        ]},
        {"state": "Michigan", "polls": [
            {"candidate": "Kamala Harris", "percentage": 53},
            {"candidate": "Donald Trump", "percentage": 47}
        ]},
        {"state": "Arizona", "polls": [
            {"candidate": "Kamala Harris", "percentage": 49},
            {"candidate": "Donald Trump", "percentage": 51}
        ]},
        {"state": "Ohio", "polls": [
            {"candidate": "Donald Trump", "percentage": 54},
            {"candidate": "Kamala Harris", "percentage": 46}
        ]},
        {"state": "North Carolina", "polls": [
            {"candidate": "Donald Trump", "percentage": 52},
            {"candidate": "Kamala Harris", "percentage": 48}
        ]}
    ]
    return jsonify(polling_data), 200


# Example model (optional, can be placed in models.py)
class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    input_data = db.Column(db.Text, nullable=False)
    result = db.Column(db.String(255), nullable=False)

if __name__ == "__main__":
    app.run(debug=True)
