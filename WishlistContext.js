import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch wishlist from API or localStorage
  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        // Fetch from API if logged in
        const response = await wishlistAPI.getWishlist();
        setWishlistItems(response.data.products || []);
      } else {
        // Get from localStorage if not logged in
        const localWishlist = localStorage.getItem('wishlist');
        if (localWishlist) {
          setWishlistItems(JSON.parse(localWishlist));
        }
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load your wishlist');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch wishlist on mount and when user changes
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Add product to wishlist
  const addToWishlist = async (product) => {
    try {
      if (user) {
        // Add to API if logged in
        // Use product.id if product._id is not available (for local data)
        const productId = product._id || product.id;
        console.log('Adding product to wishlist with ID:', productId);
        await wishlistAPI.addToWishlist(productId);
        toast.success('Item added to wishlist');
        fetchWishlist(); // Refresh wishlist
      } else {
        // Show login prompt for unauthenticated users
        toast.info('Please log in to add items to your wishlist');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error(error.response?.data?.message || 'Product not found');
      return false;
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      if (user) {
        // Remove from API if logged in
        await wishlistAPI.removeFromWishlist(productId);
        toast.success('Item removed from wishlist');
        fetchWishlist(); // Refresh wishlist
      } else {
        // Remove from localStorage if not logged in
        const updatedWishlist = wishlistItems.filter(item => item._id !== productId);
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        toast.success('Item removed from wishlist');
      }
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
      return false;
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item._id || item.id) === productId);
  };

  // Toggle product in wishlist
  const toggleWishlist = async (product) => {
    const productId = product._id || product.id;
    if (isInWishlist(productId)) {
      return removeFromWishlist(productId);
    } else {
      return addToWishlist(product);
    }
  };

  // Clear wishlist
  const clearWishlist = async () => {
    try {
      if (user) {
        // Clear in API if logged in
        await wishlistAPI.clearWishlist();
        toast.success('Wishlist cleared');
        fetchWishlist(); // Refresh wishlist
      } else {
        // Clear in localStorage if not logged in
        setWishlistItems([]);
        localStorage.removeItem('wishlist');
        toast.success('Wishlist cleared');
      }
      return true;
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error('Failed to clear wishlist');
      return false;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};