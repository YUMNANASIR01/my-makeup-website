'use client';

import React from 'react';

export default function TestImagePage() {
  const imageUrl =
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFrZXVwJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"; // ← aapka full base64 image yahaan hona chahiye

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      {/* Optional Overlay for dim effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white">
        <h1 className=" font-bold text-2xl">Welcome to My Store</h1>
        <p className="mt-4 text-lg">Best products, best prices, fast delivery</p>
      </div>
    </div>
  );
}
