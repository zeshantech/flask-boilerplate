import os
from dotenv import load_dotenv



load_dotenv() 

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp..com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', 'your_email@.com')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', 'ssss')
    REDIS_URI = os.getenv('REDIS_URI')
    OTP_EXPIRATION = int(os.getenv('OTP_EXPIRATION', 300))  # 5 minutes
