import connectDB from "./configs/db.js";
import Product from "./Models/Product.js";
import "dotenv/config";

await connectDB();

const products = [

  // Vegetables
  { name: "Potato 500g", category: "Vegetables", price: 25, offerPrice: 20, image: [], description: "Fresh and organic", inStock: true },
  { name: "Tomato 1kg", category: "Vegetables", price: 40, offerPrice: 35, image: [], description: "Juicy and ripe", inStock: true },
  { name: "Carrot 500g", category: "Vegetables", price: 30, offerPrice: 28, image: [], description: "Sweet and crunchy", inStock: true },
  { name: "Spinach 500g", category: "Vegetables", price: 18, offerPrice: 15, image: [], description: "Rich in iron", inStock: true },
  { name: "Onion 500g", category: "Vegetables", price: 22, offerPrice: 19, image: [], description: "Kitchen staple", inStock: true },

  // Fruits
  { name: "Apple 1kg", category: "Fruits", price: 120, offerPrice: 110, image: [], description: "Crisp and juicy", inStock: true },
  { name: "Orange 1kg", category: "Fruits", price: 80, offerPrice: 75, image: [], description: "Vitamin C rich", inStock: true },
  { name: "Banana 1kg", category: "Fruits", price: 50, offerPrice: 45, image: [], description: "Sweet and ripe", inStock: true },
  { name: "Mango 1kg", category: "Fruits", price: 150, offerPrice: 140, image: [], description: "Seasonal favorite", inStock: true },
  { name: "Grapes 500g", category: "Fruits", price: 70, offerPrice: 65, image: [], description: "Fresh grapes", inStock: true },

  // Dairy
  { name: "Amul Milk 1L", category: "Dairy", price: 60, offerPrice: 55, image: [], description: "Pure milk", inStock: true },
  { name: "Paneer 200g", category: "Dairy", price: 90, offerPrice: 85, image: [], description: "Fresh paneer", inStock: true },
  { name: "Eggs 12pcs", category: "Dairy", price: 90, offerPrice: 85, image: [], description: "Farm fresh eggs", inStock: true },
  { name: "Cheese 200g", category: "Dairy", price: 140, offerPrice: 130, image: [], description: "Creamy cheese", inStock: true },

  // Drinks
  { name: "Coca Cola 1.5L", category: "Drinks", price: 80, offerPrice: 75, image: [], description: "Chilled drink", inStock: true },
  { name: "Pepsi 1.5L", category: "Drinks", price: 78, offerPrice: 73, image: [], description: "Refreshing cola", inStock: true },
  { name: "Sprite 1.5L", category: "Drinks", price: 79, offerPrice: 74, image: [], description: "Lemon drink", inStock: true },
  { name: "Fanta 1.5L", category: "Drinks", price: 77, offerPrice: 72, image: [], description: "Orange soda", inStock: true },
  { name: "7 Up 1.5L", category: "Drinks", price: 76, offerPrice: 71, image: [], description: "Clear soda", inStock: true },

  // Grains
  { name: "Basmati Rice 5kg", category: "Grains", price: 550, offerPrice: 520, image: [], description: "Premium rice", inStock: true },
  { name: "Wheat Flour 5kg", category: "Grains", price: 250, offerPrice: 230, image: [], description: "Whole wheat flour", inStock: true },
  { name: "Quinoa 500g", category: "Grains", price: 450, offerPrice: 420, image: [], description: "Protein rich grain", inStock: true },
  { name: "Brown Rice 1kg", category: "Grains", price: 120, offerPrice: 110, image: [], description: "Healthy rice", inStock: true },
  { name: "Barley 1kg", category: "Grains", price: 150, offerPrice: 140, image: [], description: "Fiber rich grain", inStock: true },

  // Bakery
  { name: "Brown Bread", category: "Bakery", price: 40, offerPrice: 35, image: [], description: "Healthy bread", inStock: true },
  { name: "Butter Croissant", category: "Bakery", price: 50, offerPrice: 45, image: [], description: "Flaky croissant", inStock: true },
  { name: "Chocolate Cake", category: "Bakery", price: 350, offerPrice: 325, image: [], description: "Rich cake", inStock: true },
  { name: "Whole Wheat Bread", category: "Bakery", price: 45, offerPrice: 40, image: [], description: "Whole wheat bread", inStock: true },
  { name: "Vanilla Muffins", category: "Bakery", price: 100, offerPrice: 90, image: [], description: "Soft muffins", inStock: true },

  // Instant
  { name: "Maggi Noodles", category: "Instant", price: 55, offerPrice: 50, image: [], description: "Instant noodles", inStock: true },
  { name: "Top Ramen", category: "Instant", price: 45, offerPrice: 40, image: [], description: "Quick noodles", inStock: true },
  { name: "Knorr Soup", category: "Instant", price: 35, offerPrice: 30, image: [], description: "Cup soup", inStock: true },
  { name: "Yippee Noodles", category: "Instant", price: 50, offerPrice: 45, image: [], description: "Non fried noodles", inStock: true },
  { name: "Oats Noodles", category: "Instant", price: 40, offerPrice: 35, image: [], description: "Healthy noodles", inStock: true }

];

try {
  await Product.deleteMany(); // optional — clears old products
  await Product.insertMany(products);
  console.log("Products seeded successfully");
} catch (err) {
  console.error(err);
}

process.exit();
