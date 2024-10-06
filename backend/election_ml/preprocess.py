import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Function to preprocess the input polling data
def preprocess_data(polling_data):
    """
    This function takes in raw polling data and returns processed data
    that can be fed into the machine learning model.
    """
    
    # Convert polling_data (e.g., JSON) to a pandas DataFrame for easier processing
    df = pd.DataFrame([polling_data])

    # Encode categorical variables (e.g., candidate names)
    if 'candidate' in df.columns:
        label_encoder = LabelEncoder()
        df['candidate'] = label_encoder.fit_transform(df['candidate'])
    
    # Handle missing values (e.g., fill NaNs with mean or a constant)
    df.fillna(df.mean(), inplace=True)

    # Standardize numerical features (e.g., percentages, sample sizes) 
    # Only if there is more than one sample to avoid scaling to 0
    numerical_columns = ['polling_percentage', 'sample_size']
    
    if len(df) > 1:  # Apply scaler only if more than one row
        scaler = StandardScaler()
        df[numerical_columns] = scaler.fit_transform(df[numerical_columns])
    else:
        df[numerical_columns] = df[numerical_columns]  # No scaling for single row
    
    return df
