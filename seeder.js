const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const User = require('../models/User');

// Import frontend product data
const { products: frontendProducts } = require('../../src/data/products');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dress-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Transform frontend product data to match our MongoDB schema
const transformProducts = () => {
  const allProducts = [];
  
  // Process women's products
  if (frontendProducts.women) {
    frontendProducts.women.forEach(product => {
      allProducts.push({
        id: product.id.toString(), // Store the numeric ID as a string
        title: product.title,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image,
        category: 'women',
        subcategory: product.subcategory || 'general',
        sizes: product.sizes || [],
        colors: product.colors || [],
        description: product.description || `${product.title} by ${product.brand}`,
        keyFeatures: product.keyFeatures || [],
        inStock: true,
        reviews: product.reviews ? product.reviews.map(review => ({
          user: new mongoose.Types.ObjectId(),
          userName: review.user,
          rating: review.rating,
          comment: review.comment,
          date: review.date ? new Date(review.date) : new Date()
        })) : []
      });
    });
  }
  
  // Process men's products
  if (frontendProducts.men) {
    frontendProducts.men.forEach(product => {
      allProducts.push({
        id: product.id.toString(), // Store the numeric ID as a string
        title: product.title,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image,
        category: 'men',
        subcategory: product.subcategory || 'general',
        sizes: product.sizes || [],
        colors: product.colors || [],
        description: product.description || `${product.title} by ${product.brand}`,
        keyFeatures: product.keyFeatures || [],
        inStock: true,
        reviews: product.reviews ? product.reviews.map(review => ({
          user: new mongoose.Types.ObjectId(),
          userName: review.user,
          rating: review.rating,
          comment: review.comment,
          date: review.date ? new Date(review.date) : new Date()
        })) : []
      });
    });
  }
  
  // Process kids' products
  if (frontendProducts.kids) {
    frontendProducts.kids.forEach(product => {
      allProducts.push({
        id: product.id.toString(), // Store the numeric ID as a string
        title: product.title,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image,
        category: 'kids',
        subcategory: product.subcategory || 'general',
        sizes: product.sizes || [],
        colors: product.colors || [],
        description: product.description || `${product.title} by ${product.brand}`,
        keyFeatures: product.keyFeatures || [],
        inStock: true,
        reviews: product.reviews ? product.reviews.map(review => ({
          user: new mongoose.Types.ObjectId(),
          userName: review.user,
          rating: review.rating,
          comment: review.comment,
          date: review.date ? new Date(review.date) : new Date()
        })) : []
      });
    });
  }
  
  return allProducts;
};

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }
    
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('Admin user created');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Seed database
const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log('Products cleared');
    
    // Transform and insert products
    const transformedProducts = transformProducts();
    await Product.insertMany(transformedProducts);
    console.log(`${transformedProducts.length} products inserted`);
    
    // Create admin user
    await createAdminUser();
    
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();