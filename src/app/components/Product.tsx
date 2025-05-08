'use client';
import { useWishlistStore } from '@/stores/Wishlist-Store';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

export default function Product({ product }: { product: Product }) {
  const { addItem } = useWishlistStore();

  return (
    <div className="product-card">
      {/* Your product display */}
      <button 
        onClick={() => addItem({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          description: product.description
        })}
        className="bg-pink-600 text-white px-4 py-2 rounded"
      >
        Add to Wishlist
      </button>
    </div>
  );
}