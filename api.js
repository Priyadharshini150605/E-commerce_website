import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:3000",  // Use relative URL to work with proxy setting in package.json
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (userData) => API.put('/auth/profile', userData)
};

// Products API
export const productsAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  getByCategory: (category) => API.get(`/products/category/${category}`),
  addReview: (productId, reviewData) => API.post(`/products/${productId}/reviews`, reviewData)
};

// Cart API
export const cartAPI = {
  getCart: () => API.get('/cart'),
  addToCart: (item) => API.post('/cart', item),
  updateCartItem: (itemId, quantity) => API.put(`/cart/${itemId}`, { quantity }),
  removeCartItem: (itemId) => API.delete(`/cart/${itemId}`),
  clearCart: () => API.delete('/cart')
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => API.get('/wishlist'),
  addToWishlist: (productId) => API.post('/wishlist', { productId }),
  removeFromWishlist: (productId) => API.delete(`/wishlist/${productId}`),
  clearWishlist: () => API.delete('/wishlist')
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData) => API.post('/orders', orderData),
  getMyOrders: () => API.get('/orders/myorders'),
  getOrderById: (id) => API.get(`/orders/${id}`),
  updateOrderToPaid: (id, paymentResult) => API.put(`/orders/${id}/pay`, paymentResult)
};

export default API;