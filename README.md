# Hustle-Hub
HustleHub is a digital platform designed to help student entrepreneurs at the African Leadership University promote and grow their businesses to showcase, discover, and engage with student-operated businesses within their campus community. Right now, talented students offering valuable services are essentially invisible to most of their potential customers. The platform will serve as a comprehensive hub where student entrepreneurs can establish their digital presence and potential customers can easily browse and purchase products and services offered by their peers by replacing outdated promotion methods like WhatsApp broadcasts and campus flyers with a modern, streamlined solution for all.
---

## Table of Contents
- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Key Features Achieved
- **Marketplace & Explore Page**: A discovery section, where users can browse businesses by category (food, beauty, fashion, etc.) or search directly for what they need.
- **Become a Vendor and Vendor Store:**: Users who offer products and services can create become vendor account and create a vendor store, and add their products to the store.
- **Checkout & WhatsApp Integration**: Orders are placed and confirmed via WhatsApp, including order number and details.
- **Loyalty Cards**:Store owners can issue digital loyalty cards or promo cards to their customers. These can be used to get discounts on orders placed through the platform.
- **Ordering & Booking System**: A simple order or booking system, so customers can reach out directly to service providers via WhatsApp or through the platform.
- **Authentication**: Secure login and registration for users and vendors.
- **Responsive UI**: Modern, mobile-friendly design using Tailwind CSS.

---

## System Architecture
```
[User Browser]
    |
    v
[React Frontend (Vite, TypeScript, Tailwind CSS)]
    |
    v
[Express.js API Backend (Node.js)]
    |
    v
[MongoDB Database]
```

---

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM), JWT
- **Database**: MongoDB
- **Other**: dotenv, Lucide-react (icons)

---

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone <(https://github.com/H-levison/Hustle-Hub.git)>
   cd Hustle-Hub
   ```
2. **Install dependencies:**
   - Backend:
     ```bash
     cd Backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../
     npm install
     ```
3. **Environment variables:**
   - Copy `.env.example` to `.env` in both root and `/Backend` and fill in required values (e.g., `MONGODB_URI`, `JWT_SECRET`).
4. **Seed the database:**
   - Categories:
     ```bash
     node Backend/seedCategories.js
     ```
   - Tiers:
     ```bash
     node Backend/seedTiers.js
     ```
5. **Start MongoDB:**
   - Ensure MongoDB is running locally or update `MONGODB_URI` for remote DB.
6. **Run the backend:**
   ```bash
   cd Backend
   npm start
   ```
7. **Run the frontend:**
   ```bash
   npm run dev
   ```
8. **Access the app:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage
- **User:**
  - Register/login, browse products, add to cart (one vendor at a time), checkout, and confirm order via WhatsApp.
  - Earn loyalty tiers based on completed orders and spend at each vendor.
- **Vendor:**
  - Register/login, create/manage products, view/manage orders, set up loyalty tiers (choose from Bronze, Silver, Gold, Platinum, set min spend, min completed orders, and discount).

---

## API Overview
- **Base URL:** `http://localhost:5000/`
- **Key Endpoints:**
  - `/products` (GET, POST, PUT, DELETE)
  - `/orders` (GET, POST, PUT)
  - `/users` (GET, POST, PUT)
  - `/loyalty-cards` (GET, POST, DELETE)
  - `/tiers` (GET)
- **Authentication:** Most endpoints require a JWT token in the `Authorization` header.
- **Response Format:** JSON

---

## Contributing
1. Fork the repository and create your branch from `main`.
2. Commit your changes with clear messages.
3. Open a pull request and describe your changes.
4. Participate in code reviews and address feedback.

---

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact
For questions, issues, or contributions, please open an issue or contact the maintainers via GitHub.
