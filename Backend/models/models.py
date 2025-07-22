# models.py

from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Text, Float
from sqlalchemy.orm import relationship, declarative_base
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

#A Base class is what all our models will inherit from
Base = declarative_base()
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    is_provider = Column(Boolean, default=False)  # True if they offer services
    created_at = Column(DateTime, default=datetime.utcnow)

    #Here we have our relationships
    bookings = relationship("Booking", back_populates="user")
    businesses = relationship("Business", back_populates="owner")
    loyalty_card = relationship("LoyaltyCard", uselist=False, back_populates="user")

    # Hashing password before storing it
    def set_password(self, password):
        if not password:
            raise ValueError("Password must not be empty")
        self.password_hash = generate_password_hash(password)

    # Check if password is correct
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    

class Business(Base):
    __tablename__ = 'businesses'

    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    category_id = Column(Integer, ForeignKey('categories.id'))
    owner_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="businesses")
    category = relationship("Category", back_populates="businesses")
    services = relationship("Service", back_populates="business")
    
class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    # One category can have many businesses
    businesses = relationship("Business", back_populates="category")

class Service(Base):
    __tablename__ = 'services'

    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    business_id = Column(Integer, ForeignKey('businesses.id'))

    # Relationships
    business = relationship("Business", back_populates="services")
    bookings = relationship("Booking", back_populates="service")

class Booking(Base):
    __tablename__ = 'bookings'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    service_id = Column(Integer, ForeignKey('services.id'))
    booking_time = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="pending")  # Could be pending, confirmed, done

    # Relationships
    user = relationship("User", back_populates="bookings")
    service = relationship("Service", back_populates="bookings")

class LoyaltyCard(Base):
    __tablename__ = 'loyalty_cards'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    points = Column(Integer, default=0)
    tier = Column(String(50), default="Bronze")  # Bronze, Silver, Gold...

    user = relationship("User", back_populates="loyalty_card")

class Review(Base):
    __tablename__ = 'reviews'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    business_id = Column(Integer, ForeignKey('businesses.id'))
    rating = Column(Integer, nullable=False)  # Assuming rating is from 1 to 5
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User")
    business = relationship("Business")

class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User")
    
class Payment(Base):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    payment_method = Column(String(50), nullable=False)  # e.g., Credit Card, PayPal
    status = Column(String(50), default="pending")  # Could be pending, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User")
    
class Address(Base):
    __tablename__ = 'addresses'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    street = Column(String(150), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    zip_code = Column(String(20), nullable=False)
    country = Column(String(100), nullable=False)

    # Relationships
    user = relationship("User")

def get_engine(db_url):
    return create_engine(db_url, echo=True)

def create_all_tables(engine):
    Base.metadata.create_all(engine)

def drop_all_tables(engine):
    Base.metadata.drop_all(engine)

def create_session(engine):
    Session = sessionmaker(bind=engine)
    return Session()

def get_base():
    return Base