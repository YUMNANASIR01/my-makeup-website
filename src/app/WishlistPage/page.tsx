
'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import TestImagePage from '../components/bg';
import { useWishlistStore } from '@/stores/Wishlist-Store';
import Image from 'next/image'; // Import Image component from next/image

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const [open, setOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <>
      <TestImagePage />
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        ❤️ Wishlist ({hasHydrated ? items.length : 0})
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold">Your Wishlist</h2>
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto h-[calc(100%-150px)] space-y-4">
          {!hasHydrated ? (
            <p className="text-gray-500 text-center mt-10">Loading wishlist...</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start border-b pb-4 relative"
              >
                {/* Use Image from next/image for optimization */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64} // Set the width for the image
                  height={64} // Set the height for the image
                  className="object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-pink-600 font-bold text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-0 right-0 p-1 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">Your wishlist is empty.</p>
          )}
        </div>

        <div className="p-5 border-t">
          <Link href={'/ProductPage'}>
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

















// 'use client';
// import { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import Link from 'next/link';
// import TestImagePage from '../components/bg';
// import { useWishlistStore } from '@/stores/Wishlist-Store';

// export default function WishlistPage() {
//   const { items, removeItem } = useWishlistStore();
//   const [open, setOpen] = useState(false);
//   const [hasHydrated, setHasHydrated] = useState(false);

//   // Fix hydration mismatch
//   useEffect(() => {
//     setHasHydrated(true);
//   }, []);

//   return (
//     <>
//       <TestImagePage/>
//       <button
//         onClick={() => setOpen(true)}
//         className="fixed top-6 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full shadow-lg transition"
//       >
//         ❤️ Wishlist ({hasHydrated ? items.length : 0})
//       </button>

//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <div
//         className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
//           open ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex items-center justify-between p-5 border-b">
//           <h2 className="text-xl font-bold">Your Wishlist</h2>
//           <button onClick={() => setOpen(false)}>
//             <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
//           </button>
//         </div>

//         <div className="p-5 overflow-y-auto h-[calc(100%-150px)] space-y-4">
//           {!hasHydrated ? (
//             <p className="text-gray-500 text-center mt-10">Loading wishlist...</p>
//           ) : items.length > 0 ? (
//             items.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex gap-4 items-start border-b pb-4 relative"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-md border"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <p className="text-pink-600 font-bold text-sm">
//                     ${item.price.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-gray-500 line-clamp-2">
//                     {item.description}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="absolute top-0 right-0 p-1 hover:text-red-500"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center mt-10">Your wishlist is empty.</p>
//           )}
//         </div>

//         <div className="p-5 border-t">
//           <Link href={'/ProductPage'}>
//             <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg">
//               Continue Shopping
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
















































// 'use client';

//  // assuming you're using Zustand
// import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
// import { X } from 'lucide-react';
// import Link from 'next/link';
// import TestImagePage from '../components/bg';
// import { useWishlistStore } from '@/stores/Wishlist-Store';

// export default function WishlistPage() {
//   const items = useWishlistStore((state: { items: any; }) => state.items);  // Fetch wishlist items
//   const removeItem = useWishlistStore((state: { removeItem: any; }) => state.removeItem); // Remove item from wishlist
//   const [open, setOpen] = useState(false); // State to toggle wishlist sidebar

//   return (
//     <>
//       <TestImagePage/>
//       <button
//         onClick={() => setOpen(true)}
//         className="fixed top-6 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full shadow-lg transition"
//       >
//         ❤️ Wishlist ({items.length})
//       </button>

//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <div
//         className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
//           open ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex items-center justify-between p-5 border-b">
//           <h2 className="text-xl font-bold">Your Wishlist</h2>
//           <button onClick={() => setOpen(false)}>
//             <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
//           </button>
//         </div>

//         <div className="p-5 overflow-y-auto h-[calc(100%-150px)] space-y-4">
//           {items.length > 0 ? (
//             items.map((item: { image: string | Blob | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: number; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, idx: Key | null | undefined) => (
//               <div
//                 key={idx}
//                 className="flex gap-4 items-start border-b pb-4 relative"
//               >
//                 <img
//                   src={item.image}
//                   alt={typeof item.name === 'string' ? item.name : String(item.name)}
//                   className="w-16 h-16 object-cover rounded-md border"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <p className="text-pink-600 font-bold text-sm">
//                     ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
//                   </p>
//                   <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
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
//             <p className="text-gray-500 text-center mt-10">Your wishlist is empty.</p>
//           )}
//         </div>

//         <div className="p-5 border-t">
//           <Link href={'/ProductPage'}>
//             <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg">
//               Continue Shopping
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }