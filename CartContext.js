import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch cart from API or localStorage
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        // Fetch from API if logged in
        const response = await cartAPI.getCart();
        setCartItems(response.data.items || []);
      } else {
        // Get from localStorage if not logged in
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load your cart');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch cart on mount and when user changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add product to cart
  const addToCart = async (product, size, color, quantity = 1) => {
    try {
      if (user) {
        // Add to API if logged in
        // Use product.id if product._id is not available (for local data)
        const productId = product._id || product.id;
        console.log('Adding product to cart with ID:', productId);
        await cartAPI.addToCart({
          productId,
          size,
          color,
          quantity
        });
        toast.success('Item added to cart');
        fetchCart(); // Refresh cart
      } else {
        // Show login prompt for unauthenticated users
        toast.info('Please log in to add items to your cart');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || 'Product not found');
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      if (user) {
        // Remove from API if logged in
        await cartAPI.removeCartItem(itemId);
        toast.success('Item removed from cart');
        fetchCart(); // Refresh cart
      } else {
        // Remove from localStorage if not logged in
        const updatedCart = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Item removed from cart');
      }
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      if (user) {
        // Update in API if logged in
        await cartAPI.updateCartItem(itemId, quantity);
        toast.success('Cart updated');
        fetchCart(); // Refresh cart
      } else {
        // Update in localStorage if not logged in
        const updatedCart = cartItems.map(item => {
          if (item._id === itemId) {
            return { ...item, quantity };
          }
          return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Cart updated');
      }
      return true;
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
      return false;
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      if (user) {
        // Clear in API if logged in
        await cartAPI.clearCart();
        toast.success('Cart cleared');
        fetchCart(); // Refresh cart
      } else {
        // Clear in localStorage if not logged in
        setCartItems([]);
        localStorage.removeItem('cart');
        toast.success('Cart cleared');
      }
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
      return false;
    }
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || item.price) * item.quantity;
    }, 0);
  };

  // Get cart items count
  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};