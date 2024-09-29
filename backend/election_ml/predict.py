# election_ml/predict.py
import pickle
import pandas as pd
from sqlalchemy import create_engine
from config import Config

# Load the trained model
def load_model():
    with open('trained_model.pkl', 'rb') as f:
        model = pickle.load(f)
    return model

# Function to predict election outcomes based on live polling data
def predict_outcome(polling_data):
    model = load_model()

    # Preprocess polling data (use your custom preprocessing logic)
    X_new = pd.DataFrame([polling_data])

    # Make prediction (0 or 1 for Candidate A or B)
    prediction = model.predict(X_new)
    probability = model.predict_proba(X_new)  # Probabilities for each candidate

    return {
        'prediction': prediction[0],  # Either 0 (Candidate A) or 1 (Candidate B)
        'probability': probability[0]
    }
