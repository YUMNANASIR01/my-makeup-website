'use client';

import { useCartStore } from '@/stores/cart-store';
import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import TestImagePage from '../components/bg';
import Image from 'next/image'; // Import Image from next/image

export default function SideCart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const [open, setOpen] = useState(false);

  return (
    <>
      <TestImagePage />
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        🛒 Cart ({items.length})
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] md:w-[500px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto h-[calc(100%-150px)] space-y-4">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start border-b pb-4 relative"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}  // Replace with the actual width you need
                  height={64} // Replace with the actual height you need
                  className="object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-emerald-600 font-bold text-sm">
                    ${typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : '0.00'}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(idx)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(idx)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(idx)}
                  className="absolute top-0 right-0 p-1 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          )}
        </div>

        <div className="p-5 border-t">
          <Link href={'/CheckoutPage'}>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}













// 'use client';

// import { useCartStore } from '@/stores/cart-store';
// import { useState } from 'react';
// import { X } from 'lucide-react';
// import Link from 'next/link';
// import TestImagePage from '../components/bg';

// export default function SideCart() {
//   const items = useCartStore((state) => state.items);
//   const removeItem = useCartStore((state) => state.removeItem);
//   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
//   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <TestImagePage />
//       <button
//         onClick={() => setOpen(true)}
//         className="fixed top-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full shadow-lg transition"
//       >
//         🛒 Cart ({items.length})
//       </button>

//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <div
//         className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] md:w-[500px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
//           open ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex items-center justify-between p-5 border-b">
//           <h2 className="text-xl font-bold">Your Cart</h2>
//           <button onClick={() => setOpen(false)}>
//             <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
//           </button>
//         </div>

//         <div className="p-5 overflow-y-auto h-[calc(100%-150px)] space-y-4">
//           {items.length > 0 ? (
//             items.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="flex gap-4 items-start border-b pb-4 relative"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-md border"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <p className="text-emerald-600 font-bold text-sm">
//                     ${typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : '0.00'}
//                   </p>
//                   <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>

//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => decreaseQuantity(idx)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQuantity(idx)}
//                       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => removeItem(idx)}
//                   className="absolute top-0 right-0 p-1 hover:text-red-500"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
//           )}
//         </div>

//         <div className="p-5 border-t">
//           <Link href={'/CheckoutPage'}>
//             <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg">
//               Proceed to Checkout
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
