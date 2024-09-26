import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://abdulgani:2961muha@localhost/election_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
