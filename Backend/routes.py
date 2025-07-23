from flask import Flask, request, jsonify
from flask_cors import CORS
from models.models import get_engine, create_session, User, Booking, Service,LoyaltyCard, Notification, Category, Business, Product
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
    
@app.route("/me", methods=["GET"])
@token_required
def get_current_user(current_user):
    return jsonify({
        "id": current_user.id,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "is_provider": current_user.is_provider
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
@app.route("/api/categories", methods=["POST"])
@token_required
def create_category(current_user):
    if not current_user.is_provider:
        return jsonify({"error": "Only vendors can create categories"}), 403

    data = request.get_json()
    name = data.get("name", "").strip()

    if not name:
        return jsonify({"error": "Category name is required"}), 400

    existing = session.query(Category).filter_by(name=name).first()
    if existing:
        return jsonify({"error": "Category already exists"}), 409

    new_category = Category(name=name)
    session.add(new_category)
    session.commit()

    return jsonify({
        "id": new_category.id,
        "name": new_category.name
    }), 201
    

@app.route("/products", methods=["POST"])
@token_required
def create_product(current_user):
    if not current_user.is_provider:
         return jsonify({"error": "Only vendors can add products"}), 403

    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    category_id = data.get("category_id")
    business_id = data.get("business_id")

    if not name or not price or not category_id or not business_id:
         return jsonify({"error": "Missing required fields"}), 400

    product = Product(
        name=name,
        description=description,
        price=price,
        category_id=category_id,
        business_id=business_id,
        vendor_id=current_user.id
    )
    session.add(product)
    session.commit()

    return jsonify({"message": "Product created successfully", "product_id": product.id}), 201

@app.route("/products", methods=["GET"])
def get_all_products():
    category = request.args.get("category")
    name = request.args.get("name")
    business = request.args.get("store")

    query = session.query(Product)

    if category:
       query = query.join(Category).filter(Category.name.ilike(f"%{category}%"))
    if name:
       query = query.filter(Product.name.ilike(f"%{name}%"))
    if business:
       query = query.join(Business).filter(Business.name.ilike(f"%{business}%"))

    products = query.all()

    return jsonify([
       {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "category_id": p.category_id,
            "business_id": p.business_id,
            "vendor_id": p.vendor_id
        } for p in products
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

# Create a new business (vendor shop)
@app.route('/businesses', methods=['POST'])
@token_required
def create_business(current_user):
    if not current_user.is_provider:
        return jsonify({'error': 'Only vendors can create a business'}), 403
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    category_id = data.get('category_id')
    if not name or not category_id:
        return jsonify({'error': 'Name and category_id are required'}), 400
    business = Business(
        name=name,
        description=description,
        category_id=category_id,
        owner_id=current_user.id
    )
    session.add(business)
    session.commit()
    return jsonify({'message': 'Business created', 'business_id': business.id}), 201

# Update a business (only by owner)
@app.route('/businesses/<int:business_id>', methods=['PUT'])
@token_required
def update_business(current_user, business_id):
    business = session.query(Business).filter_by(id=business_id, owner_id=current_user.id).first()
    if not business:
        return jsonify({'error': 'Business not found or not owned by user'}), 404
    data = request.get_json()
    business.name = data.get('name', business.name)
    business.description = data.get('description', business.description)
    business.category_id = data.get('category_id', business.category_id)
    session.commit()
    return jsonify({'message': 'Business updated'})

# Delete a business (only by owner)
@app.route('/businesses/<int:business_id>', methods=['DELETE'])
@token_required
def delete_business(current_user, business_id):
    business = session.query(Business).filter_by(id=business_id, owner_id=current_user.id).first()
    if not business:
        return jsonify({'error': 'Business not found or not owned by user'}), 404
    session.delete(business)
    session.commit()
    return jsonify({'message': 'Business deleted'})

# Get all businesses
@app.route('/businesses', methods=['GET'])
def get_all_businesses():
    businesses = session.query(Business).all()
    return jsonify([
        {
            'id': b.id,
            'name': b.name,
            'description': b.description,
            'category_id': b.category_id,
            'owner_id': b.owner_id,
            'created_at': b.created_at
        } for b in businesses
    ])

# Get a specific business by ID
@app.route('/businesses/<int:business_id>', methods=['GET'])
def get_business(business_id):
    business = session.query(Business).filter_by(id=business_id).first()
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    return jsonify({
        'id': business.id,
        'name': business.name,
        'description': business.description,
        'category_id': business.category_id,
        'owner_id': business.owner_id,
        'created_at': business.created_at
    })

# Become a vendor endpoint
@app.route('/user/become-vendor', methods=['PUT'])
@token_required
def become_vendor(current_user):
    if current_user.is_provider:
        return jsonify({'message': 'Already a vendor'}), 200
    current_user.is_provider = True
    session.commit()
    return jsonify({'message': 'You are now a vendor', 'is_provider': True})

if __name__ == "__main__":
    app.run(debug=True)
