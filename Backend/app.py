# app.py

from models.models import get_engine, create_all_tables, create_session
from config import DATABASE_URL

def main():
    # Create DB engine
    engine = get_engine(DATABASE_URL)
    
    # Create all tables
    create_all_tables(engine)
    
    # Create a session (interacting with DB)
    session = create_session(engine)
    
    # check if tables are created 
    print("Database and tables created successfully.")

if __name__ == "__main__":
    main()
