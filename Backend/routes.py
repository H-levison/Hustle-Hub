from flask import Flask, request, jsonify
from flask_cors import CORS
from models.models import get_engine, create_session, User, Booking, Service
from config import DATABASE_URL
import jwt
from datetime import datetime, timedelta
from config import SECRET_KEY
from functools import wraps

app = Flask(__name__)
CORS(app)

engine = get_engine(DATABASE_URL)
session = create_session(engine)

#Register Route
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    existing_user = session.query(User).filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    user = User(
        full_name=data.get("full_name"),
        email=email,
        is_provider=data.get("is_provider", False)
    )
    user.set_password(data.get("password"))
    session.add(user)
    session.commit()

    return jsonify({"message": "User registered successfully", "user_id": user.id})


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
            "full_name": user.full_name,
            "is_provider": user.is_provider
        }
    })


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


# Create Booking
@app.route("/book", methods=["POST"])
def create_booking():
    data = request.get_json()
    user_id = data.get("user_id")
    service_id = data.get("service_id")

    # Check if service exists
    service = session.query(Service).filter_by(id=service_id).first()
    if not service:
        return jsonify({"error": "Service not found"}), 404

    booking = Booking(user_id=user_id, service_id=service_id)
    session.add(booking)
    session.commit()

    return jsonify({
        "message": "Booking created successfully",
        "booking_id": booking.id,
        "status": booking.status
    })

@app.route("/profile", methods=["GET"])
@token_required
def get_profile(current_user):
    return jsonify({
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "is_provider": current_user.is_provider
    })

@app.route("/dashboard", methods=["GET"])
@token_required
def dashboard(current_user):
    return jsonify({
        "message": f"Welcome to your dashboard, {current_user.full_name}!",
        "user_id": current_user.id
    })


if __name__ == "__main__":
    app.run(debug=True)
