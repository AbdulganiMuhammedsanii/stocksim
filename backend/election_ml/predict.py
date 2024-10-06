import os
import pickle
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sqlalchemy import create_engine
from config import Config

# Load the trained model or train a new one if the file doesn't exist
def load_model():
    model_path = 'trained_model.pkl'
    
    if os.path.exists(model_path):
        print("Loading existing model...")
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
    else:
        print("Model not found. Training a new model...")
        model = train_new_model()  # Train a new model if it doesn't exist
    return model

# Train a new model using data from PostgreSQL
def train_new_model():
    print("Fetching data from PostgreSQL and training a new model...")
    # Connect to PostgreSQL
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    query = """
    SELECT polling_percentage, demographics_feature_1, demographics_feature_2, election_outcome
    FROM polling_data
    """
    df = pd.read_sql(query, engine)

    if df.empty:
        print("No data found.")
        return None

    # Extract features and target labels
    X = df[['polling_percentage', 'demographics_feature_1', 'demographics_feature_2']]
    y = df['election_outcome']

    # Train a logistic regression model
    model = LogisticRegression()
    model.fit(X, y)

    # Save the trained model
    with open('trained_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    print("New model trained and saved as 'trained_model.pkl'.")

    return model

# Function to predict election outcomes based on live polling data
def predict_outcome():
    print("runs at least")
    model = load_model()

    # Fetch live polling data
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    query = "SELECT polling_percentage, demographics_feature_1, demographics_feature_2 FROM polling_data"
    polling_data = pd.read_sql(query, engine)

    if polling_data.empty:
        print("No live polling data available.")
        return

    # Make predictions
    prediction = model.predict(polling_data)
    probability = model.predict_proba(polling_data)

    # Initialize counters for each candidate
    candidate_0_count = 0
    candidate_1_count = 0

    # Sum the probabilities for each candidate
    candidate_0_prob_sum = 0
    candidate_1_prob_sum = 0

    # Iterate through predictions and probabilities
    for idx, pred in enumerate(prediction):
        print(f"Prediction: Candidate {pred}, Probability: {probability[idx]}")

        # Count votes for each candidate
        if pred == 0:
            candidate_0_count += 1
        else:
            candidate_1_count += 1

        # Sum probabilities for each candidate
        candidate_0_prob_sum += probability[idx][0]
        candidate_1_prob_sum += probability[idx][1]

    # Calculate the total number of predictions
    total_predictions = len(prediction)

    # Calculate average probabilities for each candidate
    candidate_0_avg_prob = candidate_0_prob_sum / total_predictions
    candidate_1_avg_prob = candidate_1_prob_sum / total_predictions

    # Determine the overall predicted winner based on majority vote
    if candidate_0_count > candidate_1_count:
        winner = "Candidate 0"
    else:
        winner = "Candidate 1"

    # Output the overall prediction
    print(f"Overall Prediction: {winner}")
    print(f"Candidate 0 Avg Probability: {candidate_0_avg_prob:.2f}")
    print(f"Candidate 1 Avg Probability: {candidate_1_avg_prob:.2f}")

    return {
        'winner': winner,
        'candidate_0_avg_prob': float(candidate_0_avg_prob),
        'candidate_1_avg_prob': float(candidate_1_avg_prob),
        'candidate_0_count': candidate_0_count,
        'candidate_1_count': candidate_1_count
    }


# Example call
if __name__ == "__main__":
    predict_outcome()
