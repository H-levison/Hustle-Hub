from flask import Flask, request, jsonify
from flask_cors import CORS
from models.models import get_engine, create_session, User, Booking, Service,LoyaltyCard, Notification, Category
from config import DATABASE_URL
import jwt
from datetime import datetime, timedelta
from config import SECRET_KEY
from functools import wraps

app = Flask(__name__)
CORS(app)

engine = get_engine(DATABASE_URL)
session = create_session(engine)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", None)

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({'error': 'Missing or invalid token format'}), 401

        try:
            token = auth_header.split(" ")[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = session.query(User).filter_by(id=data['user_id']).first()
            if not current_user:
                return jsonify({'error': 'User not found'}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

# Register Route
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        first_name = data.get("first_name", "").strip()
        last_name = data.get("last_name", "").strip()
        is_provider = data.get("is_provider", False)

        if not email or not password or not first_name or not last_name:
            return jsonify({"error": "All fields are required"}), 400

        existing_user = session.query(User).filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            is_provider=is_provider
        )

        user.set_password(password)

        session.add(user)
        session.commit()

        return jsonify({"message": "User registered successfully", "user_id": user.id}), 201

    except Exception as e:
        session.rollback()
        print("Registration error:", str(e))
        return jsonify({"error": "Server error", "details": str(e)}), 500


# Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = session.query(User).filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create JWT token
    payload = {
        "user_id": user.id,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(hours=2)  # Token expires in 2 hours
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_provider": user.is_provider
        }
    })

@app.route("/services", methods=["GET"])
def get_services():
    services = session.query(Service).all()
    return jsonify([
        {
            "id": s.id,
            "name": s.name,
            "description": s.description,
            "price": s.price,
            "business_id": s.business_id
          } for s in services
    ])
    
@app.route("/categories", methods=["GET"])
def get_categories():
    categories = session.query(Category).all()
    return jsonify([
         {
                "id": c.id,
                "name": c.name
            } for c in categories
        ])    

@app.route("/book", methods=["POST"])
@token_required
def create_booking():
    data = request.get_json()
    user_id = data.get("user_id")
    service_id = data.get("service_id")

    if not session.query(Service).filter_by(id=service_id).first():
        return jsonify({"error": "Service not found"}), 404

    booking = Booking(user_id=user_id, service_id=service_id)
    session.add(booking)
    session.commit()

    return jsonify({
        "message": "Booking created successfully",
        "booking_id": booking.id,
        "status": booking.status
        })
    
@app.route("/user/<int:user_id>/bookings", methods=["GET"])
@token_required
def get_user_bookings(user_id):
    bookings = session.query(Booking).filter_by(user_id=user_id).all()
    return jsonify([
        {
         "id": b.id,
         "service_id": b.service_id,
         "booking_time": b.booking_time,
         "status": b.status
            } for b in bookings
        ])    

@app.route("/user/<int:user_id>/notifications", methods=["GET"])
@token_required
def get_notifications(user_id):
    notifications = session.query(Notification).filter_by(user_id=user_id).all()
    return jsonify([
            {
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "created_at": n.created_at
            } for n in notifications
        ])


@app.route("/user/<int:user_id>/loyalty", methods=["GET"])
@token_required
def get_loyalty(user_id):
    card = session.query(LoyaltyCard).filter_by(user_id=user_id).first()
    if not card:
       return jsonify({"error": "Loyalty card not found"}), 404

    return jsonify({
        "points": card.points,
        "tier": card.tier
        })

if __name__ == "__main__":
    app.run(debug=True)
