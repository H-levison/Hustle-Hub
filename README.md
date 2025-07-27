# Hustle-Hub

A full-stack marketplace platform for local businesses and customers, featuring single-vendor cart, WhatsApp order confirmation, loyalty tiers, and a vendor dashboard.

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

## Features
- **Product Catalog & Search**: Browse, search, and filter products by category.
- **Single-Vendor Cart**: Cart only accepts products from one vendor at a time.
- **Checkout & WhatsApp Integration**: Orders are placed and confirmed via WhatsApp, including order number and details.
- **Vendor Dashboard**: Vendors can manage products, view orders, and configure loyalty tiers.
- **Loyalty Tiers**: Vendors set up Bronze, Silver, Gold, and Platinum tiers with custom requirements (min spend, completed orders, discount).
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
   git clone <repo-link>
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
