
'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
  

    <div className="flex items-center justify-center mt-10 ">
      <div className="  bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-lg w-full text-center border border-emerald-200">
        <CheckCircle className="w-20 h-20 text-pink-600 mx-auto mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">🎉 Order Confirmed!</h1>
        
        <p className="text-gray-600 text-base mb-4">
          Thank you for your purchase. Your order has been successfully placed and is now being processed.
        </p>

        <div className="bg-emerald-50 border border-emerald-200 text-pink-700 rounded-lg px-4 py-2 text-sm font-medium mb-6">
          Estimated delivery: <span className="font-semibold">3-5 business days</span>
        </div>

        <Link href="/ProductPage">
          <button className="bg-pink-800 hover:bg-pink-700 transition duration-200 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
            🛍️ Continue Shopping
          </button>
        </Link>
      </div>

    </div>
  );
}
