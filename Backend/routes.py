from flask import Flask, request, jsonify
from flask_cors import CORS
from models.models import get_engine, create_session, User, Booking, Service
from config import DATABASE_URL

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

    return jsonify({
        "message": "Login successful",
        "user_id": user.id,
        "full_name": user.full_name,
        "is_provider": user.is_provider
    })


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


if __name__ == "__main__":
    app.run(debug=True)
