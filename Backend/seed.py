# seed.py
from models.models import (
    get_engine, create_session, Category, Service, User, LoyaltyCard,
    create_all_tables, drop_all_tables
)
from config import DATABASE_URL

def seed():
    engine = get_engine(DATABASE_URL)

    # Drop and recreate all tables for a clean dev environment
    print("Dropping all tables...")
    drop_all_tables(engine)
    print("Creating all tables...")
    create_all_tables(engine)

    session = create_session(engine)

    # Categories
    categories = ["Fashion", "Electronics", "Education", "Beauty", "Health"]
    for name in categories:
        if not session.query(Category).filter_by(name=name).first():
            session.add(Category(name=name))
    session.commit()

    # Sample Services (not linked to a business for now)
    services = [
        {"name": "Men's Haircut", "description": "Barbering service", "price": 15.0, "category": "Beauty"},
        {"name": "Laptop Repair", "description": "Fix any laptop issues", "price": 50.0, "category": "Electronics"},
        {"name": "Tutoring", "description": "One-on-one sessions", "price": 25.0, "category": "Education"},
    ]
    for s in services:
        # You may want to link services to a business in the future
        new_service = Service(name=s["name"], description=s["description"], price=s["price"], business_id=None)
        session.add(new_service)
    session.commit()

    # Sample User + Loyalty
    if not session.query(User).filter_by(email="test@example.com").first():
        user = User(first_name="Test", last_name="User", email="test@example.com")
        user.set_password("password123")
        session.add(user)
        session.commit()

        card = LoyaltyCard(user_id=user.id, points=100, tier="Silver")
        session.add(card)
        session.commit()

    print("Seeding complete.")

if __name__ == "__main__":
    seed()
