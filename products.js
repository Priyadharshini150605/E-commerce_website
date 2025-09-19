// Mock product data
export const products = {
  women: [
    {
      id: 101,
      title: 'Elegant Floral Dress',
      brand: 'Fashion House',
      price: 1299,
      originalPrice: 1999,
      image: 'https://images.pexels.com/photos/10544108/pexels-photo-10544108.jpeg',
      category: 'women',
      subcategory: 'dresses',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Red', 'Blue', 'Black'],
      description: 'Beautiful floral dress perfect for summer occasions. Made with premium cotton blend fabric that ensures comfort and breathability. Features a flattering A-line silhouette with adjustable straps and a hidden side zipper for easy wear. The vibrant floral print adds a touch of elegance to any summer gathering.',
      keyFeatures: [
        'Premium cotton blend fabric',
        'Breathable and comfortable',
        'Adjustable straps',
        'Hidden side zipper',
        'A-line silhouette',
        'Easy to maintain'
      ],
      reviews: [
        {
          id: 1,
          user: 'Sarah M.',
          rating: 5,
          comment: 'Absolutely love this dress! The fit is perfect and the fabric is so comfortable.',
          date: '2024-01-15'
        },
        {
          id: 2,
          user: 'Priya K.',
          rating: 4,
          comment: 'Beautiful design and great quality. Perfect for summer parties!',
          date: '2024-01-10'
        }
      ]
    },
    {
      id: 102,
      title: 'Casual Cotton Top',
      brand: 'Zara',
      price: 699,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&crop=center',
      category: 'women',
      subcategory: 'tops',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['White', 'Pink', 'Green'],
      description: 'Comfortable cotton top for everyday wear. Crafted from 100% organic cotton for ultimate comfort and breathability. Features a relaxed fit with a round neckline and short sleeves. Perfect for casual outings, office wear, or weekend activities. Easy to style with jeans, skirts, or trousers.',
      keyFeatures: [
        '100% organic cotton',
        'Breathable fabric',
        'Relaxed fit',
        'Round neckline',
        'Short sleeves',
        'Easy to style'
      ],
      reviews: [
        {
          id: 3,
          user: 'Emily R.',
          rating: 5,
          comment: 'Super comfortable and soft! Perfect for everyday wear.',
          date: '2024-01-12'
        },
        {
          id: 4,
          user: 'Lisa T.',
          rating: 4,
          comment: 'Great quality cotton and fits perfectly. Love the colors!',
          date: '2024-01-08'
        }
      ]
    },
    {
      id: 103,
      title: 'Designer Jeans',
      brand: 'Levis',
      price: 1899,
      originalPrice: 2499,
      image: 'https://images.pexels.com/photos/2068349/pexels-photo-2068349.jpeg',
      category: 'women',
      subcategory: 'jeans',
      sizes: ['28', '30', '32', '34'],
      colors: ['Blue', 'Black'],
      description: 'Premium quality designer jeans with perfect fit'
    },
    {
      id: 104,
      title: 'Ethnic Kurti Set',
      brand: 'Rangmanch',
      price: 1599,
      originalPrice: 2299,
      image: 'https://images.pexels.com/photos/20702676/pexels-photo-20702676.jpeg',
      category: 'women',
      subcategory: 'ethnic',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Yellow', 'Red', 'Green'],
      description: 'Traditional kurti set with beautiful embroidery'
    },
    {
      id: 105,
      title: 'Party Wear Gown',
      brand: 'Glamour',
      price: 2999,
      originalPrice: 4499,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&crop=center',
      category: 'women',
      subcategory: 'dresses',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Red', 'Navy'],
      description: 'Stunning party wear gown for special occasions'
    },
    {
      id: 106,
      title: 'Linen Palazzo Set',
      brand: 'Comfort Zone',
      price: 999,
      originalPrice: 1699,
      image: 'https://images.pexels.com/photos/8217774/pexels-photo-8217774.jpeg',
      category: 'women',
      subcategory: 'sets',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Beige', 'Blue'],
      description: 'Comfortable linen palazzo set for casual wear'
    }
  ],
  men: [
    {
      id: 201,
      title: 'Formal Cotton Shirt',
      brand: 'Puma',
      price: 699,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop&crop=center',
      category: 'men',
      subcategory: 'shirts',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Blue', 'Black'],
      description: 'Premium cotton formal shirt for office wear'
    },
    {
      id: 202,
      title: 'Casual T-Shirt',
      brand: 'Adidas',
      price: 599,
      originalPrice: 899,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center',
      category: 'men',
      subcategory: 'tshirts',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Gray', 'Navy'],
      description: 'Comfortable cotton t-shirt for casual wear'
    },
    {
      id: 203,
      title: 'Slim Fit Jeans',
      brand: 'Denim Works',
      price: 1299,
      originalPrice: 2699,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center',
      category: 'men',
      subcategory: 'jeans',
      sizes: ['30', '32', '34', '36', '38'],
      colors: ['Blue', 'Black', 'Gray'],
      description: 'Stylish slim fit jeans with premium denim'
    },
    {
      id: 204,
      title: 'Sports Track Suit',
      brand: 'Athletic Pro',
      price: 1299,
      originalPrice: 2999,
      image: 'https://images.pexels.com/photos/30587044/pexels-photo-30587044.jpeg',
      category: 'men',
      subcategory: 'sportswear',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Gray'],
      description: 'Complete track suit for workout and sports'
    },
    {
      id: 205,
      title: 'Ethnic Kurta',
      brand: 'Traditional',
      price: 1599,
      originalPrice: 2199,
      image: 'https://images.pexels.com/photos/29138637/pexels-photo-29138637.jpeg',
      category: 'men',
      subcategory: 'ethnic',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Cream', 'Maroon'],
      description: 'Traditional kurta for festive occasions'
    },
    {
      id: 206,
      title: 'Leather Jacket',
      brand: 'H&M',
      price: 4999,
      originalPrice: 7499,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&crop=center',
      category: 'men',
      subcategory: 'jackets',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Brown'],
      description: 'Premium leather jacket for style statement'
    }
  ],
  kids: [
    {
      id: 301,
      title: 'Cotton Dress for Girls',
      brand: 'Little Princess',
      price: 799,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/30015985/pexels-photo-30015985.jpeg',
      category: 'kids',
      subcategory: 'girls',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      colors: ['Pink', 'Purple', 'Yellow'],
      description: 'Cute cotton dress for little girls'
    },
    {
      id: 302,
      title: 'Boys Casual Shirt',
      brand: 'Little Gentleman',
      price: 699,
      originalPrice: 999,
      image: 'https://images.pexels.com/photos/33133393/pexels-photo-33133393.jpeg',
      category: 'kids',
      subcategory: 'boys',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
      colors: ['Blue', 'White', 'Green'],
      description: 'Comfortable casual shirt for boys'
    },
    {
      id: 303,
      title: 'Denim Dungarees',
      brand: 'Puma',
      price: 1299,
      originalPrice: 1799,
      image: 'https://images.pexels.com/photos/4715320/pexels-photo-4715320.jpeg',
      category: 'kids',
      subcategory: 'unisex',
      sizes: ['2-3Y', '4-5Y', '6-7Y'],
      colors: ['Blue', 'Black'],
      description: 'Trendy denim dungarees for kids'
    },
    {
      id: 304,
      title: 'Summer Shorts Set',
      brand: 'Play Time',
      price: 599,
      originalPrice: 899,
      image: 'https://images.pexels.com/photos/8421904/pexels-photo-8421904.jpeg',
      category: 'kids',
      subcategory: 'sets',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      colors: ['Red', 'Blue', 'Green', 'Yellow'],
      description: 'Comfortable summer shorts and t-shirt set'
    },
    {
      id: 305,
      title: 'Girls Party Wear Frock',
      brand: 'Zara',
      price: 1599,
      originalPrice: 2299,
      image: 'https://images.pexels.com/photos/13332570/pexels-photo-13332570.jpeg',
      category: 'kids',
      subcategory: 'girls',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      colors: ['Pink', 'Purple', 'Red'],
      description: 'Beautiful party wear frock for special occasions'
    },
    {
      id: 306,
      title: 'Superhero T-Shirt',
      brand: 'Tommy Hilfiger',
      price: 499,
      originalPrice: 749,
      image: 'https://images.pexels.com/photos/9817167/pexels-photo-9817167.jpeg',
      category: 'kids',
      subcategory: 'boys',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
      colors: ['Red', 'Blue', 'Black'],
      description: 'Cool superhero printed t-shirt for boys'
    }
  ]
};