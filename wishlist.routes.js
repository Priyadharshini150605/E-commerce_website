const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: []
      });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/wishlist
// @desc    Add product to wishlist
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    let { productId } = req.body;
    
    // Check if productId is a number and convert to string
    if (typeof productId === 'number') {
      productId = productId.toString();
    }
    
    console.log('Received productId:', productId, 'Type:', typeof productId);
    
    // Try to find product by numeric ID if it's not a valid ObjectId
    let product;
    try {
      // First try to find by MongoDB ObjectId
      product = await Product.findById(productId);
    } catch (err) {
      // If that fails, try to find by numeric ID stored as string
      product = await Product.findOne({ id: productId });
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find user's wishlist
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    // Create wishlist if it doesn't exist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: []
      });
    }

    // Use product._id to ensure we're using the MongoDB ObjectId
    const productObjectId = product._id;
    
    // Check if product already in wishlist
    if (wishlist.products.some(p => p.toString() === productObjectId.toString())) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    // Add product to wishlist using the MongoDB ObjectId
    wishlist.products.push(productObjectId);
    await wishlist.save();

    // Return updated wishlist with populated product details
    wishlist = await Wishlist.findById(wishlist._id).populate('products');

    res.status(201).json(wishlist);
  } catch (error) {
    console.error('Wishlist add error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      product => product.toString() !== req.params.productId
    );

    await wishlist.save();

    // Return updated wishlist with populated product details
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');

    res.json(updatedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/wishlist
// @desc    Clear wishlist
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Clear wishlist products
    wishlist.products = [];
    await wishlist.save();

    res.json({ message: 'Wishlist cleared' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;