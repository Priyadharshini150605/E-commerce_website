const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'title image price inStock'
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    let { productId, quantity, size, color } = req.body;
    
    // Check if productId is a number and convert to string
    if (typeof productId === 'number') {
      productId = productId.toString();
    }
    
    console.log('Cart - Received productId:', productId, 'Type:', typeof productId);
    
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

    // Check if product is in stock
    if (!product.inStock) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }
    
    // Use product._id to ensure we're using the MongoDB ObjectId
    const productObjectId = product._id;

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productObjectId.toString() && item.size === size && item.color === color
    );

    // If item exists, update quantity
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: productObjectId,
        quantity,
        size,
        color,
        price: product.price
      });
    }

    await cart.save();

    // Return updated cart with populated product details
    cart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'title image price inStock'
    });

    res.status(201).json(cart);
  } catch (error) {
    console.error('Cart add error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/cart/:itemId
// @desc    Update cart item quantity
// @access  Private
router.put('/:itemId', protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    // Return updated cart with populated product details
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'title image price inStock'
    });

    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/:itemId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    );

    await cart.save();

    // Return updated cart with populated product details
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'title image price inStock'
    });

    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear cart items
    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;