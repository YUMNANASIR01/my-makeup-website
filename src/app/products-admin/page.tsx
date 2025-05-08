"use client";

import { useState, useEffect } from "react";
import {  FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

// Simulated API for product data (fetching 48 products now)
const fetchRandomProducts = async () => {
  const products = [];
  for (let i = 0; i < 48; i++) {  // Generating 48 products
    products.push({
      id: `prod-${i + 1}`,
      name: `Product ${i + 1}`,
      description: `This is a description for product ${i + 1}`,
      price: (Math.random() * 100).toFixed(2),
      image: `https://picsum.photos/400/400?random=${encodeURIComponent(`Product ${i + 1}`)}`,
      category: "Electronics",
    });
  }
  return products;
};

export default function AdminProductPage() {
  const [products, setProducts] = useState<{ 
    id: string; 
    name: string; 
    description: string; 
    price: string; 
    image: string; 
    category: string; 
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchRandomProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleDelete = (productId: string): void => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <button
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
          onClick={() => alert("Add Product feature coming soon!")}
        >
          <FiPlus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={imageErrors.has(product.image) ? '/fallback-image.jpg' : product.image}
                  alt={product.name}
                  width={320}
                  height={240}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  priority
                  unoptimized={process.env.NODE_ENV !== 'production'}
                  onError={() => {
                    setImageErrors(prev => new Set(prev).add(product.image));
                  }}
                />
                <button
                  onClick={() => handleDelete(product.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FiTrash className="h-5 w-5" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                <span className="text-sm text-gray-400">{product.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
