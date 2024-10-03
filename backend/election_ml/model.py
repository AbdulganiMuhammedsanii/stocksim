import pickle
#from sklearn.linear_model import LogisticRegression  # Uncommented now
import pandas as pd
from sqlalchemy import create_engine
from config import Config  # Assuming your DB credentials are in Config

# Function to train the logistic regression model
def train_model():
    try:
        print("Connecting to the database...")
        # Set up a connection to the PostgreSQL database
        engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)  # Use your DB URI

        # Query live polling data from the database
        query = """
        SELECT polling_percentage, demographics_feature_1, demographics_feature_2, election_outcome
        FROM polling_data
        """
        print("Executing query to fetch polling data...")
        df = pd.read_sql(query, engine)

        # Check if the dataframe is empty
        if df.empty:
            print("No data found from the query.")
            return

        # Extract features and labels
        X = df[['polling_percentage', 'demographics_feature_1', 'demographics_feature_2']]
        y = df['election_outcome']  # 0 or 1 for candidate A or B

        # Train a logistic regression model
        print("Training the logistic regression model...")
        model = LogisticRegression()
        model.fit(X, y)

        # Save the trained model for later use
        with open('trained_model.pkl', 'wb') as f:
            pickle.dump(model, f)

        print("Model training completed and saved.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Function to fetch live polling data
def fetch_live_polling_data():
    try:
        print("Fetching live polling data...")
        engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
        query = "SELECT * FROM polling_data"
        df = pd.read_sql(query, engine)
        
        # Check if any data is fetched
        if df.empty:
            print("No live polling data found.")
        else:
            print("Live polling data retrieved successfully.")
        
        return df
    except Exception as e:
        print(f"An error occurred while fetching live polling data: {e}")
        return None
