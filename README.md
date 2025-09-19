# Dress Shop Backend API

This is the backend API for the Dress Shop e-commerce application. It provides endpoints for user authentication, product management, cart operations, wishlist management, and order processing.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/dress-shop
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

   Note: Replace `your_jwt_secret_key_here` with a secure random string.

### Running the Server

1. Start the development server:
   ```
   npm run dev
   ```

2. The server will run on http://localhost:5000

### Seeding the Database

To populate the database with initial product data:

```
node utils/seeder.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products

- `GET /api/products` - Get all products (with optional filtering)
- `GET /api/products/:id` - Get a single product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)
- `POST /api/products/:id/reviews` - Add a review to a product (protected)

### Cart

- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item quantity (protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Wishlist

- `GET /api/wishlist` - Get user's wishlist (protected)
- `POST /api/wishlist` - Add product to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove product from wishlist (protected)
- `DELETE /api/wishlist` - Clear wishlist (protected)

### Orders

- `POST /api/orders` - Create a new order (protected)
- `GET /api/orders/myorders` - Get logged in user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders` - Get all orders (admin only)