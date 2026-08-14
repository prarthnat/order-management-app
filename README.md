# Order Management System - Food Delivery App

A full-stack order management feature for a food delivery application, built as part of a Senior Full Stack Developer assessment. 

This application allows users to browse a food menu, add items to their cart, place an order with their delivery details, and track the real-time status of their order.

## 🚀 Features

- **Dynamic Menu Display**: Browse available food items with images, descriptions, and pricing.
- **Cart & Order Placement**: Users can add items, specify quantities, and securely checkout.
- **Real-Time Order Tracking**: Once an order is placed, users are redirected to a tracking page where the order status automatically updates ("Order Received" ➔ "Preparing" ➔ "Out for Delivery" ➔ "Delivered").
- **RESTful API**: Node.js/Express backend handling order placement and state management using an in-memory datastore.
- **Test-Driven**: Comprehensive test suites covering API endpoints, input validation, and key React UI components.
- **Modern UI**: Built with React and Vite, featuring a sleek, responsive, and intuitive glassmorphism design.

## 🛠️ Tech Stack

**Frontend:**
- React 19 (via Vite)
- Vanilla CSS (Custom Glassmorphism Design System)
- React Router DOM
- Jest & React Testing Library (for UI testing)

**Backend:**
- Node.js
- Express.js
- CORS
- Jest & Supertest (for API testing)

## 📋 Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

## ⚙️ Installation & Setup

The project is divided into two separate directories: `frontend` and `backend`. You will need to start both servers to run the application locally.

### 1. Backend Setup
Navigate into the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
npm start

The backend server will start on http://localhost:5001.

2. Frontend Setup
Open a new terminal window, navigate into the frontend directory, install dependencies, and start the development server:

bash


cd frontend
npm install
npm run dev
The frontend application will start on http://localhost:5173.

🧪 Running Tests (TDD)
This project strictly adheres to Test-Driven Development (TDD) principles. Tests are written for both the frontend UI components and the backend REST API endpoints.

Run Backend API Tests:

bash


cd backend
npm run test
Tests cover: Fetching the menu, order placement, input validation, missing cart items, and fetching order statuses.

Run Frontend UI Tests:

bash


cd frontend
npm run test
Tests cover: Context state management (Cart context), component rendering, and checkout functionality.

📡 API Endpoints
Method	Endpoint	Description
GET	/api/menu	Retrieves the list of available menu items.
POST	/api/orders	Places a new order. Requires items array and deliveryDetails object.
GET	/api/orders/:id	Retrieves the details and current real-time status of a specific order.
