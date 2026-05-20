const mongoose = require('mongoose');
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');

const menuItems = [
  // Appetizers
  {
    name: 'Truffle Burrata',
    description: 'Creamy burrata cheese drizzled with black truffle oil, served on a bed of heirloom tomatoes and fresh basil.',
    price: 16.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500',
    featured: true
  },
  {
    name: 'Crispy Calamari',
    description: 'Lightly battered squid rings with a zesty marinara dipping sauce and lemon wedges.',
    price: 13.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500',
    featured: false
  },
  {
    name: 'Wagyu Beef Tartare',
    description: 'Hand-cut wagyu beef with capers, shallots, and a quail egg yolk on toasted brioche.',
    price: 22.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500',
    featured: false
  },
  {
    name: 'Lobster Bisque',
    description: 'Velvety smooth lobster soup finished with brandy cream and chive oil.',
    price: 14.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    featured: true
  },
  // Mains
  {
    name: 'Grilled Ribeye Steak',
    description: 'Prime 12oz ribeye grilled to perfection, served with truffle mashed potatoes and asparagus.',
    price: 42.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500',
    featured: true
  },
  {
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon fillet with a citrus glaze, wild rice pilaf, and seasonal vegetables.',
    price: 32.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
    featured: true
  },
  {
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms, parmesan, and a drizzle of truffle oil.',
    price: 24.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500',
    featured: false
  },
  {
    name: 'Herb-Crusted Lamb Rack',
    description: 'New Zealand lamb rack with a rosemary-dijon crust, roasted potatoes, and mint jus.',
    price: 44.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=500',
    featured: false
  },
  {
    name: 'Seafood Linguine',
    description: 'Fresh linguine tossed with shrimp, mussels, and clams in a white wine garlic sauce.',
    price: 28.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500',
    featured: false
  },
  {
    name: 'Duck Confit',
    description: 'Slow-cooked duck leg with cherry reduction, creamy polenta, and braised greens.',
    price: 36.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
    featured: false
  },
  // Desserts
  {
    name: 'Crème Brûlée',
    description: 'Classic vanilla bean custard with a perfectly caramelized sugar crust.',
    price: 12.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=500',
    featured: true
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm dark chocolate cake with a molten center, vanilla bean ice cream, and berry coulis.',
    price: 14.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
    featured: false
  },
  {
    name: 'Tiramisu',
    description: 'Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone cream.',
    price: 11.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
    featured: false
  },
  // Drinks
  {
    name: 'Signature Old Fashioned',
    description: 'Bourbon, bitters, brown sugar, and a twist of orange peel — our house classic.',
    price: 15.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500',
    featured: true
  },
  {
    name: 'Sparkling Elderflower Mocktail',
    description: 'Elderflower cordial, fresh lime, cucumber, and sparkling water over ice.',
    price: 8.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500',
    featured: false
  },
  {
    name: 'Espresso Martini',
    description: 'Freshly pulled espresso shaken with vodka, coffee liqueur, and vanilla syrup.',
    price: 16.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
    featured: false
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    console.log('Database seeded with menu items!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
