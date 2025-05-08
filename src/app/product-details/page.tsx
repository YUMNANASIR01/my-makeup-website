
'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/Wishlist-Store';
import { toast } from 'sonner';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import Image from 'next/image';

function ProductDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem); // Function to add to wishlist

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const price = searchParams.get('price');
  const image = searchParams.get('image');
  const description = searchParams.get('description');

  if (!id || !name || !price || !image || !description) {
    return <div className="text-center py-10 text-red-500">Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem({
      name,
      price: Number(price),
      image,
      description,
      quantity: 1,
    });

    toast.success(`${name} added to cart`);
    router.push('/CartPage');
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id,
      name,
      price: Number(price),
      image,
      description,
    });

    toast.success(`${name} added to wishlist`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="w-full lg:w-1/2">
            <Image
              src={image}
              alt={name}
              width={500} 
              height={500} 
              className="object-cover w-full h-full rounded-t-xl lg:rounded-l-xl lg:rounded-t-none"
            />
          </div>
          <div className="p-8 w-full lg:w-1/2">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{name}</h1>
            <p className="text-lg font-medium text-emerald-600 mb-4">${price}</p>
            <p className="text-gray-700 mb-6">{description}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <button onClick={handleAddToWishlist} className="text-gray-600 hover:text-pink-600 transition-all">
                <Heart size={24} />
              </button>
              <Link href={'/CartPage'}>
                <button
                  onClick={handleAddToCart}
                  className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Use Suspense for asynchronous loading
export default function SuspendedProductDetail() {
  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <ProductDetail />
    </Suspense>
  );
}



















// // ✅ ProductDetail.tsx
// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useCartStore } from '@/stores/cart-store';
// import { useWishlistStore } from '@/stores/Wishlist-Store'; // Import the wishlist store
// import { toast } from 'sonner';
// import Link from 'next/link';
// import { Heart } from 'lucide-react'; // Import Heart icon from lucide-react

// export default function ProductDetail() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const addItem = useCartStore((state) => state.addItem);
//   const addToWishlist = useWishlistStore((state) => state.addItem); // Function to add to wishlist

//   const id = searchParams.get('id');
//   const name = searchParams.get('name');
//   const price = searchParams.get('price');
//   const image = searchParams.get('image');
//   const description = searchParams.get('description');

//   if (!id || !name || !price || !image || !description) {
//     return <div className="text-center py-10 text-red-500">Product not found</div>;
//   }

//   const handleAddToCart = () => {
//     addItem({
//       name,
//       price: Number(price),
//       image,
//       description,
//       quantity: 1,
//     });

//     toast.success(`${name} added to cart`);
//     router.push('/CartPage');
//   };

//   const handleAddToWishlist = () => {
//     addToWishlist({
//       id,
//       name,
//       price: Number(price),
//       image,
//       description,
//     });

//     toast.success(`${name} added to wishlist`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
//           <div className="w-full lg:w-1/2">
//             <img
//               src={image}
//               alt={name}
//               className="object-cover w-full h-full rounded-t-xl lg:rounded-l-xl lg:rounded-t-none"
//             />
//           </div>
//           <div className="p-8 w-full lg:w-1/2">
//             <h1 className="text-3xl font-semibold text-gray-900 mb-4">{name}</h1>
//             <p className="text-lg font-medium text-emerald-600 mb-4">${price}</p>
//             <p className="text-gray-700 mb-6">{description}</p>
            
//             <div className="flex items-center space-x-4 mb-4">
//               {/* Heart Icon to Add to Wishlist */}
//               <button onClick={handleAddToWishlist} className="text-gray-600 hover:text-pink-600 transition-all">
//                 <Heart size={24} />
//               </button>
//               <Link href={'/CartPage'}>
//                 <button
//                   onClick={handleAddToCart}
//                   className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all"
//                 >
//                   Add to Cart
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










































































// // ✅ ProductDetail.tsx
// 'use client';

// import { useRouter, useSearchParams} from 'next/navigation';
// import { useCartStore } from '@/stores/cart-store';
// import { toast } from 'sonner';
// import Link from 'next/link';

// export default function ProductDetail() {
  
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const addItem = useCartStore((state) => state.addItem);

//   const id = searchParams.get('id');
//   const name = searchParams.get('name');
//   const price = searchParams.get('price');
//   const image = searchParams.get('image');
//   const description = searchParams.get('description');

//   if (!id || !name || !price || !image || !description) {
//     return <div className="text-center py-10 text-red-500">Product not found</div>;
//   }

//   const handleAddToCart = () => {
//     addItem({
//       name,
//       price: Number(price), // ✅ convert string to number safely
//       image,
//       description,
//       quantity: 1, // ✅ correct default value
//     });
  
//     toast.success(`${name} added to cart`);
//     router.push('/CartPage');
//   };


//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
//           <div className="w-full lg:w-1/2">
//             <img
//               src={image}
//               alt={name}
//               className="object-cover w-full h-full rounded-t-xl lg:rounded-l-xl lg:rounded-t-none"
//             />
//           </div>
//           <div className="p-8 w-full lg:w-1/2">
//             <h1 className="text-3xl font-semibold text-gray-900 mb-4">{name}</h1>
//             <p className="text-lg font-medium text-emerald-600 mb-4">${price}</p>
//             <p className="text-gray-700 mb-6">{description}</p>
//            <Link href={'/CartPage'}>
//            <button
//               onClick={handleAddToCart}
//               className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all"
//             >
//               Add to Cart
//             </button>
//            </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 





