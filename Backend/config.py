import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
