import pickle
from sklearn.linear_model import LogisticRegression
import pandas as pd
from sqlalchemy import create_engine
from config import Config  # Assuming your DB credentials are in Config

# Example function to train a model based on polling data from PostgreSQL
def train_model():
    # Set up a connection to the PostgreSQL database
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)  # Use your DB URI

    # Query live polling data from the database
    query = """
    SELECT polling_percentage, demographics_feature_1, demographics_feature_2, election_outcome
    FROM polling_data
    """
    df = pd.read_sql(query, engine)

    # Extract features and labels
    X = df[['polling_percentage', 'demographics_feature_1', 'demographics_feature_2']]
    y = df['election_outcome']  # 0 or 1 for candidate A or B

    # Train a logistic regression model
    model = LogisticRegression()
    model.fit(X, y)

    # Save the trained model for later use
    with open('trained_model.pkl', 'wb') as f:
        pickle.dump(model, f)

# Example function to fetch live polling data
def fetch_live_polling_data():
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    query = "SELECT * FROM polling_data"  # Replace this with the actual query for live data
    df = pd.read_sql(query, engine)
    return df
