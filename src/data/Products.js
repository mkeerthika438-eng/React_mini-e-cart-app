const products = [
  { id: 1, name: "iPhone 15 Pro", price: 134900, oldPrice: 149900, category: "Mobiles", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop&q=80", rating: 4.8 },
  { id: 2, name: "Samsung Galaxy S24", price: 79999, oldPrice: 89999, category: "Mobiles", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop&q=80", rating: 4.6 },
  { id: 3, name: "Google Pixel 8", price: 67999, oldPrice: 75999, category: "Mobiles", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 4, name: "OnePlus 12", price: 64999, oldPrice: 69999, category: "Mobiles", image: "https://images.unsplash.com/photo-1592286927505-1def25115481?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 5, name: "Xiaomi Redmi Note 13", price: 18999, oldPrice: 21999, category: "Mobiles", image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&h=500&fit=crop&q=80", rating: 4.2 },

  { id: 6, name: "MacBook Air M3", price: 114900, oldPrice: 124900, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&q=80", rating: 4.9 },
  { id: 7, name: "Dell XPS 15 Laptop", price: 109900, oldPrice: 119900, category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 8, name: "Sony WH-1000XM5 Headphones", price: 26990, oldPrice: 34990, category: "Electronics", image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=500&fit=crop&q=80", rating: 4.8 },
  { id: 9, name: "AirPods Pro 2", price: 24900, oldPrice: 27900, category: "Electronics", image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&h=500&fit=crop&q=80", rating: 4.6 },
  { id: 10, name: "Canon EOS R5 Camera", price: 329000, oldPrice: 349000, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop&q=80", rating: 4.7 },
  { id: 11, name: "Apple Watch Series 9", price: 41900, oldPrice: 45900, category: "Electronics", image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop&q=80", rating: 4.7 },
  { id: 12, name: "JBL Flip 6 Speaker", price: 9999, oldPrice: 12999, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=80", rating: 4.4 },

  { id: 13, name: "Boys Cotton Casual Shirt", price: 599, oldPrice: 999, category: "Fashion", subCategory: "Boys", image: "https://images.unsplash.com/photo-1503944168849-5f1c8b9ad17d?w=500&h=500&fit=crop&q=80", rating: 4.2 },
  { id: 14, name: "Boys Denim Jeans", price: 799, oldPrice: 1299, category: "Fashion", subCategory: "Boys", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&q=80", rating: 4.1 },
  { id: 15, name: "Boys Printed T-Shirt", price: 349, oldPrice: 599, category: "Fashion", subCategory: "Boys", image: "https://images.unsplash.com/photo-1519278409-1f56fdda7485?w=500&h=500&fit=crop&q=80", rating: 4.0 },
  { id: 16, name: "Boys Hooded Sweatshirt", price: 899, oldPrice: 1399, category: "Fashion", subCategory: "Boys", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop&q=80", rating: 4.3 },

  { id: 17, name: "Girls Floral Frock", price: 699, oldPrice: 1099, category: "Fashion", subCategory: "Girls", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 18, name: "Girls Party Dress", price: 999, oldPrice: 1599, category: "Fashion", subCategory: "Girls", image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 19, name: "Girls Casual Top", price: 449, oldPrice: 749, category: "Fashion", subCategory: "Girls", image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=500&h=500&fit=crop&q=80", rating: 4.1 },
  { id: 20, name: "Girls Denim Skirt", price: 599, oldPrice: 949, category: "Fashion", subCategory: "Girls", image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=500&h=500&fit=crop&q=80", rating: 4.0 },

  { id: 21, name: "Kids Cartoon T-Shirt", price: 299, oldPrice: 499, category: "Fashion", subCategory: "Kids", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=500&fit=crop&q=80", rating: 4.2 },
  { id: 22, name: "Kids Romper Set", price: 549, oldPrice: 899, category: "Fashion", subCategory: "Kids", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 23, name: "Kids Birthday Party Dress", price: 899, oldPrice: 1399, category: "Fashion", subCategory: "Kids", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 24, name: "Kids Winter Hoodie", price: 649, oldPrice: 999, category: "Fashion", subCategory: "Kids", image: "https://images.unsplash.com/photo-1543854589-e10f4d6e0a1f?w=500&h=500&fit=crop&q=80", rating: 4.3 },

  { id: 25, name: "Lakme Lipstick Combo", price: 499, oldPrice: 799, category: "Beauty", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop&q=80", rating: 4.3 },
  { id: 26, name: "Nivea Face Cream", price: 249, oldPrice: 399, category: "Beauty", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&q=80", rating: 4.1 },
  { id: 27, name: "Perfume Gift Set", price: 1299, oldPrice: 1999, category: "Beauty", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 28, name: "Hair Dryer", price: 899, oldPrice: 1399, category: "Beauty", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&h=500&fit=crop&q=80", rating: 4.0 },

  { id: 29, name: "Mixer Grinder 750W", price: 2499, oldPrice: 3499, category: "Home Appliances", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop&q=80", rating: 4.3 },
  { id: 30, name: "Electric Kettle", price: 799, oldPrice: 1199, category: "Home Appliances", image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=500&h=500&fit=crop&q=80", rating: 4.2 },
  { id: 31, name: "Air Fryer 4L", price: 4999, oldPrice: 6999, category: "Home Appliances", image: "https://images.unsplash.com/photo-1648609824508-eb86d361e7d1?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 32, name: "Ceiling Fan", price: 1899, oldPrice: 2499, category: "Home Appliances", image: "https://images.unsplash.com/photo-1631083219373-6cf6df6a0639?w=500&h=500&fit=crop&q=80", rating: 4.1 },

  { id: 33, name: "Remote Control Car", price: 999, oldPrice: 1499, category: "Toys", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 34, name: "Building Blocks Set", price: 799, oldPrice: 1199, category: "Toys", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 35, name: "Soft Teddy Bear", price: 449, oldPrice: 699, category: "Toys", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f51?w=500&h=500&fit=crop&q=80", rating: 4.6 },
  { id: 36, name: "Puzzle Game Set", price: 349, oldPrice: 599, category: "Toys", image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=500&h=500&fit=crop&q=80", rating: 4.2 },

  { id: 37, name: "Assorted Chocolate Box", price: 599, oldPrice: 899, category: "Food", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&h=500&fit=crop&q=80", rating: 4.6 },
  { id: 38, name: "Premium Dry Fruits Pack", price: 799, oldPrice: 1199, category: "Food", image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 39, name: "Cookies Gift Pack", price: 349, oldPrice: 549, category: "Food", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=500&fit=crop&q=80", rating: 4.3 },

  { id: 40, name: "Digital Thermometer", price: 299, oldPrice: 449, category: "Healthcare", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&h=500&fit=crop&q=80", rating: 4.2 },
  { id: 41, name: "Blood Pressure Monitor", price: 1499, oldPrice: 1999, category: "Healthcare", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 42, name: "First Aid Kit", price: 599, oldPrice: 899, category: "Healthcare", image: "https://images.unsplash.com/photo-1603398938425-2dc1799c0c4b?w=500&h=500&fit=crop&q=80", rating: 4.3 },

  { id: 43, name: "Basmati Rice 5kg", price: 599, oldPrice: 799, category: "Grocery", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 44, name: "Cooking Oil 1L", price: 199, oldPrice: 259, category: "Grocery", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop&q=80", rating: 4.1 },
  { id: 45, name: "Organic Honey 500g", price: 349, oldPrice: 499, category: "Grocery", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&h=500&fit=crop&q=80", rating: 4.5 },

  { id: 46, name: "Cricket Bat", price: 1299, oldPrice: 1799, category: "Sports & Equipment", image: "https://images.unsplash.com/photo-1593766787879-e8e3503b3b22?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 47, name: "Football", price: 699, oldPrice: 999, category: "Sports & Equipment", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500&h=500&fit=crop&q=80", rating: 4.3 },
  { id: 48, name: "Yoga Mat", price: 499, oldPrice: 799, category: "Sports & Equipment", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 49, name: "Dumbbell Set 10kg", price: 1599, oldPrice: 2199, category: "Sports & Equipment", image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&h=500&fit=crop&q=80", rating: 4.5 },

  { id: 50, name: "Bestseller Novel Collection", price: 599, oldPrice: 899, category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop&q=80", rating: 4.6 },
  { id: 51, name: "Children's Story Book Set", price: 449, oldPrice: 699, category: "Books", image: "https://images.unsplash.com/photo-1471173441619-78d2eb1fcb01?w=500&h=500&fit=crop&q=80", rating: 4.5 },
  { id: 52, name: "Self Help Book", price: 349, oldPrice: 499, category: "Books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop&q=80", rating: 4.4 },

  { id: 53, name: "Wooden Study Table", price: 3499, oldPrice: 4999, category: "Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&h=500&fit=crop&q=80", rating: 4.3 },
  { id: 54, name: "Office Chair", price: 4999, oldPrice: 6999, category: "Furniture", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop&q=80", rating: 4.4 },
  { id: 55, name: "Bookshelf Rack", price: 2499, oldPrice: 3499, category: "Furniture", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&h=500&fit=crop&q=80", rating: 4.2 },
];

export default products;
