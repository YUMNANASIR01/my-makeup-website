'use client';

import { useCartStore } from '@/stores/cart-store';
import { X, Heart } from 'lucide-react'; // Import Heart Icon
import Link from 'next/link';
import OrderConfirmationPage from '../OrderConfirmation/page';

import { useWishlistStore } from '@/stores/Wishlist-Store'; // Wishlist store for adding items
import Image from 'next/image'; // Import Image from next/image
import { Navbar } from '../components/Navbar';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items as CartItem[]);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const addItemToWishlist = useWishlistStore((state) => state.addItem); // Add item to wishlist

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Generate a unique ID for each item when adding to the wishlist
  const generateUniqueId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9); // Simple unique ID generation
  };

  interface CartItem {
      id?: string; // Make id property optional
      name: string;
      description: string;
      price: number;
      quantity: number;
      image: string;
    }

  // Handle adding item to wishlist with a unique ID
  const handleAddToWishlist = (item: CartItem): void => {
    const itemWithId = { ...item, id: generateUniqueId() }; // Add id when adding to wishlist
    addItemToWishlist(itemWithId); // Add item to wishlist store
  };

  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-r from-pink-200 to-pink-500'>
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">🧾 Checkout </h1>

          {items.length > 0 ? (
            <>
              <div className="grid gap-6">
                {items.map((item: CartItem, idx) => (  // Explicitly type the item here
                  <div
                    key={idx}
                    className="flex gap-5 bg-white border rounded-xl shadow-md p-4 relative hover:shadow-lg transition-all duration-200"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96} // Replace with actual width
                      height={96} // Replace with actual height
                      className="object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mr-8">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-gray-500 text-sm mb-1">{item.description}</p>
                      <p className="text-emerald-600 font-semibold text-sm mb-2">
                        ${typeof item.price === 'number'
                          ? (item.price * item.quantity).toFixed(2)
                          : '0.00'}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(idx)}
                          className="px-2 py-1 bg-gray-200 rounded-md text-lg hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="min-w-[24px] text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(idx)}
                          className="px-2 py-1 bg-gray-200 rounded-md text-lg hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Heart Icon for adding to wishlist */}
                    <button
                      onClick={() => handleAddToWishlist(item)} // Add to wishlist when clicked
                      className="absolute top-3 right-4 p-1 text-pink-600 hover:text-pink-700"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <OrderConfirmationPage />
              <div className="mt-10 max-w-md mx-auto bg-white border rounded-2xl shadow-lg p-6">
                <div className="flex justify-between text-xl font-semibold text-gray-800 mb-4">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link href={'/PaymentPage'}>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition">
                    Confirm & Pay
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-20 text-lg">🛒 Your cart is empty.</p>
          )}
        </div>
      </div>
      <hr />
      {/* Footer Section */}
      {/* If you want to use Footer, add it here */}
      {/* <Footer /> */}
    </>
  );
}




// 'use client';

// import { useCartStore } from '@/stores/cart-store';
// import { X } from 'lucide-react';
// import Link from 'next/link';
// import OrderConfirmationPage from '../OrderConfirmation/page';
// import { Footer } from '../components/Footer';
// import { Navbar } from '../components/Navbar';

// export default function CheckoutPage() {
//   const items = useCartStore((state) => state.items);
//   const removeItem = useCartStore((state) => state.removeItem);
//   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
//   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

//   const total = items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <>
//     <Navbar/>
//     <div className='bg-gradient-to-r from-pink-200 to-pink-500'>
//     <div className="max-w-5xl mx-auto p-6 ">
//       <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">🧾 Checkout </h1>

//       {items.length > 0 ? (
//         <>
//           <div className="grid gap-6">
//             {items.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="flex gap-5 bg-white border rounded-xl shadow-md p-4 relative hover:shadow-lg transition-all duration-200"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-lg border"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                     <button
//                       onClick={() => removeItem(idx)}
//                       className="text-red-500 hover:text-red-700 transition"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <p className="text-gray-500 text-sm mb-1">{item.description}</p>
//                   <p className="text-emerald-600 font-semibold text-sm mb-2">
//                     ${typeof item.price === 'number'
//                       ? (item.price * item.quantity).toFixed(2)
//                       : '0.00'}
//                   </p>

//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => decreaseQuantity(idx)}
//                       className="px-2 py-1 bg-gray-200 rounded-md text-lg hover:bg-gray-300"
//                     >
//                       −
//                     </button>
//                     <span className="min-w-[24px] text-center font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQuantity(idx)}
//                       className="px-2 py-1 bg-gray-200 rounded-md text-lg hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <OrderConfirmationPage/>
//           <div className="mt-10 max-w-md mx-auto bg-white border rounded-2xl shadow-lg p-6">
//             <div className="flex justify-between text-xl font-semibold text-gray-800 mb-4">
//               <span>Total Amount</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
// <Link href={'/PaymentPage'}>
// <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition">
//               Confirm & Pay
//             </button>
// </Link>
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-500 text-center mt-20 text-lg">🛒 Your cart is empty.</p>
//       )}
    
//     </div>
//     </div>
//     <hr />
//           {/* Footer Section */}
//           <footer className="bg-gray-900 text-white py-8">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2025 Makeup Brand. All rights reserved.</p>
//           <div className="flex justify-center gap-6 mt-4">
//             <Link href="#">Privacy Policy</Link>
//             <Link href="#">Terms of Service</Link>
//             <Link href="/contact">Contact</Link>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }


























































// 'use client';

// import { useCartStore } from '@/stores/cart-store';
// import { X, Heart } from 'lucide-react'; // Import Heart Icon
// import Link from 'next/link';
// import OrderConfirmationPage from '../OrderConfirmation/page';
// import { Footer } from '../components/Footer';
// import { Navbar } from '../components/Navbar';
// import { useWishlistStore } from '@/stores/Wishlist-Store'; // Wishlist store for adding items

// export default function CheckoutPage() {
//   const items = useCartStore((state) => state.items);
//   const removeItem = useCartStore((state) => state.removeItem);
//   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
//   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  
//   const addItemToWishlist = useWishlistStore((state) => state.addItem); // Add item to wishlist

//   const total = items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   interface CartItem {
//     name: string;
//     description: string;
//     price: number;
//     quantity: number;
//     image: string;
//   }

//   const handleAddToWishlist = (item: CartItem): void => {
//     addItemToWishlist(item); // Add item to wishlist store
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='bg-gradient-to-r from-pink-200 to-pink-500'>
//         <div className="max-w-5xl mx-auto p-6">
//           <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">🧾 Checkout </h1>

//           {items.length > 0 ? (
//             <>
//               <div className="grid gap-6">
//                 {items.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex gap-5 bg-white border rounded-xl shadow-md p-4 relative hover:shadow-lg transition-all duration-200"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-24 h-24 object-cover rounded-lg border"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mr-8">
//                         <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                         <button
//                           onClick={() => removeItem(idx)}
//                           className="text-red-500 hover:text-red-700 transition"
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       </div>

//                       <p className="text-gray-500 text-sm mb-1">{item.description}</p>
//                       <p className="text-emerald-600 font-semibold text-sm mb-2">
//                         ${typeof item.price === 'number'
//                           ? (item.price * item.quantity).toFixed(2)
//                           : '0.00'}
//                       </p>

//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => decreaseQuantity(idx)}
//                           className="px-2 py-1 bg-gray-200 rounded-md text-lg hover:bg-gray-300"
//                         >
//                           −
//                         </button>
//                         <span className="min-w-[24px] text-center font-medium">{item.quantity}</span>
//                         <button
//                           onClick={() => increaseQuantity(idx)}
//                           className="px-2 py-1 bg-gray-200 rounded-md text-lg hover:bg-gray-300"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     {/* Heart Icon for adding to wishlist */}
//                     <button
//                       onClick={() => handleAddToWishlist(item)} // Add to wishlist when clicked
//                       className="absolute top-3 right-4 p-1 text-pink-600 hover:text-pink-700"
//                     >
//                       <Heart className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <OrderConfirmationPage />
//               <div className="mt-10 max-w-md mx-auto bg-white border rounded-2xl shadow-lg p-6">
//                 <div className="flex justify-between text-xl font-semibold text-gray-800 mb-4">
//                   <span>Total Amount</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//                 <Link href={'/PaymentPage'}>
//                   <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition">
//                     Confirm & Pay
//                   </button>
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-center mt-20 text-lg">🛒 Your cart is empty.</p>
//           )}
//         </div>
//       </div>
//       <hr />
//       {/* Footer Section */}
//       <footer className="bg-gray-900 text-white py-8">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2025 Makeup Brand. All rights reserved.</p>
//           <div className="flex justify-center gap-6 mt-4">
//             <Link href="#">Privacy Policy</Link>
//             <Link href="#">Terms of Service</Link>
//             <Link href="/contact">Contact</Link>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }
