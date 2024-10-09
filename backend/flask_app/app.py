print("Starting Flask app...")
import sys
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text
from flask_migrate import Migrate
from flask_cors import CORS  # Import CORS
from config import Config
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from election_ml.predict import predict_outcome  # Import the prediction function
from election_ml.preprocess import preprocess_data  # Import the preprocess function

print("made it here at least")
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db = SQLAlchemy(app)  # Initialize SQLAlchemy with the Flask app
migrate = Migrate(app, db)  # Set up migrations

print("arigato")
# Define a simple route
@app.route('/')
def home():
    return "Election ML Flask App is Running"

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    print("yaya")
    polling_data = request.json.get('input_data')  # Get input data from request body
    if not polling_data:
        return jsonify({"error": "No input data provided"}), 400

    print("preprocessing data", polling_data)

    # Preprocess the data before making a prediction
    try:
        processed_data = preprocess_data(polling_data)  # Preprocess the input data
    except Exception as e:
        return jsonify({"error": f"Preprocessing failed: {str(e)}"}), 400

    # Perform prediction logic (ML model)
    print("Making predictions...", processed_data)
    try:
        prediction_result = predict_outcome()  # Make prediction
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    print(prediction_result)
    return jsonify({"result": prediction_result}), 200

@app.route('/fetch-data', methods=['GET'])
def fetch_data():
    try:
        # Connect to the database
        engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
        
        # Query to fetch polling data
        query = """
        SELECT id, polling_percentage, demographics_feature_1, demographics_feature_2, election_outcome, state
        FROM polling_data
        LIMIT 5
        """
        
        # Execute the query and fetch results
        with engine.connect() as connection:
            result = connection.execute(text(query))
            rows = result.fetchall()

        # Process the data
        polling_data = []
        for row in rows:
            state_name = row.state  # Using id as a placeholder for state name
            kamala_percentage = row.polling_percentage if row.election_outcome == 0 else 100 - row.polling_percentage
            trump_percentage = 100 - kamala_percentage

            polling_data.append({
                "state": state_name,
                "polls": [
                    {"candidate": "Kamala Harris", "percentage": round(kamala_percentage, 2)},
                    {"candidate": "Donald Trump", "percentage": round(trump_percentage, 2)}
                ]
            })

        return jsonify(polling_data), 200
    except Exception as e:
        return jsonify({"error": f"Failed to fetch data: {str(e)}"}), 500


# Example model (optional, can be placed in models.py)
class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    input_data = db.Column(db.Text, nullable=False)
    result = db.Column(db.String(255), nullable=False)

if __name__ == "__main__":
    app.run(debug=True)
