import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image from next/image

function Feature() {
  return (
    <div className="bg-black text-white">
      {/* Featured Products Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product Card 1 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://img.heroui.chat/image/fashion?w=400&h=400&u=matte_liquid_lipstick1"
              alt="Lipstick"
              width={400} // Set width
              height={400} // Set height
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Jwellery and Earrings</h3>

            <Link href="http://localhost:3000/product-details?id=1&name=Jwellery+and+Earrings&price=%2456.01&image=https%3A%2F%2Fimg.heroui.chat%2Fimage%2Ffashion%3Fw%3D400%26h%3D400%26u%3Dmatte_liquid_lipstick1&description=Long-lasting+matte+finish+with+rich+color+payoff">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>

          {/* Product Card 2 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGGwJYv_PXuviVLPjwDxxRqgGyVshbqSgh-g0gHNhkjzCdKfGFA84uO36bl2Oat0bbThQ&usqp=CAU"
              alt="Foundation"
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Hydrating Lip Gloss</h3>

            <Link href="http://localhost:3000/product-details?id=2&name=Hydrating+Lip+Gloss&price=%2444.15&image=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQGGwJYv_PXuviVLPjwDxxRqgGyVshbqSgh-g0gHNhkjzCdKfGFA84uO36bl2Oat0bbThQ%26usqp%3DCAU&description=Non-sticky+formula+with+vitamin+E">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>

          {/* Product Card 3 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://www.makeupcityshop.com/cdn/shop/files/pL6Asc.8809598456242_360x.jpg?v=1742539722"
              alt="Mascara"
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Cosrx</h3>

            <Link href="http://localhost:3000/product-details?id=3&name=Cosrx&price=%24118.43&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FpL6Asc.8809598456242_360x.jpg%3Fv%3D1742539722&description=Rich+and+smooth+texture+with+a+soft+finish">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>

          {/* Product Card 4 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://www.makeupcityshop.com/cdn/shop/files/BeautyOfJoseon-GlowDeepSerumRice_Alpha-Arbutin-30ml_83e22904-3e91-4798-a620-f28e2e0a2bf8_360x.jpg?v=1742540939"
              alt="Eyeshadow Palette"
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Beauty of Joseon - Glow Serum</h3>

            <Link href="http://localhost:3000/product-details?id=4&name=Beauty+of+Joseon+-+Glow+Serum&price=%2456.12&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FBeautyOfJoseon-GlowDeepSerumRice_Alpha-Arbutin-30ml_83e22904-3e91-4798-a620-f28e2e0a2bf8_360x.jpg%3Fv%3D1742540939&description=High-shine+finish+with+a+moisturizing+effect">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>

          {/* Product Card 5 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://www.makeupcityshop.com/cdn/shop/files/pLNLXJ.8809981339206_360x.jpg?v=174253959"
              alt="Blush"
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Medicube - Glow Booster Serum</h3>

            <Link href="http://localhost:3000/product-details?id=5&name=Medicube+-+Glow+Booster+Serum&price=%2447.78&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FpLNLXJ.8809981339206_360x.jpg%3Fv%3D1742539592&description=Smooth+and+creamy+texture+with+intense+color">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>

          {/* Product Card 6 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://www.makeupcityshop.com/cdn/shop/files/Sheglam---Color-Bloom-Matte-Liquid-Blush---Risky-Business-2_360x.jpg?v=1696337286"
              alt="Highlighter"
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Sheglam - Color Bloom Matte Liquid Blush</h3>

            <Link href="http://localhost:3000/product-details?id=6&name=Sheglam+-+Color+Bloom+Matte+Liquid+Blush&price=%2457.19&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FSheglam---Color-Bloom-Matte-Liquid-Blush---Risky-Business-2_360x.jpg%3Fv%3D1696337286&description=Bold+and+vibrant+red+for+every+occasion">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>

          {/* Product Card 7 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://img.heroui.chat/image/fashion?w=400&h=400&u=pink_satin_lipstick1"
              alt="Eyeliner"
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Golden Heals</h3>

            <Link href="http://localhost:3000/product-details?id=7&name=Golden+Heals+&price=%24118.73&image=https%3A%2F%2Fimg.heroui.chat%2Fimage%2Ffashion%3Fw%3D400%26h%3D400%26u%3Dpink_satin_lipstick1&description=Satin+finish+with+soft+pink+hues">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>

          {/* Product Card 8 */}
          <div className="border p-4 rounded-lg">
            <Image
              src="https://img.heroui.chat/image/fashion?w=400&h=400&u=berry_lipstick1"
              alt="Setting Spray"
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">Classic Clothes</h3>

            <Link href="http://localhost:3000/product-details?id=8&name=Classic+Clothes&price=%2491.31&image=https%3A%2F%2Fimg.heroui.chat%2Fimage%2Ffashion%3Fw%3D400%26h%3D400%26u%3Dberry_lipstick1&description=Deep+berry+shade+for+a+chic+look">
              <button className="text-blue-500">View Details</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feature;
















// import Link from 'next/link'
// import React from 'react'

// function Feature() {
//   return (
//     <div className="bg-black text-white">
//        {/* Featured Products Section */}
         
//             <section className="container mx-auto py-16 px-4">
//               <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {/* Product Card 1 */}
//                 <div className="border p-4 rounded-lg">
//                   <img src="https://img.heroui.chat/image/fashion?w=400&h=400&u=matte_liquid_lipstick1" alt="Lipstick" className="w-full h-64 object-cover mb-4" />
//                   <h3 className="font-semibold text-lg">Jwellery and Earrings</h3>
           
//                   <Link href="http://localhost:3000/product-details?id=1&name=Jwellery+and+Earrings&price=%2456.01&image=https%3A%2F%2Fimg.heroui.chat%2Fimage%2Ffashion%3Fw%3D400%26h%3D400%26u%3Dmatte_liquid_lipstick1&description=Long-lasting+matte+finish+with+rich+color+payoff">
//                     <button className="text-blue-500">View Details</button>
//                   </Link>
//                 </div>
      
//                 {/* Product Card 2 */}
//                 <div className="border p-4 rounded-lg">
//                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGGwJYv_PXuviVLPjwDxxRqgGyVshbqSgh-g0gHNhkjzCdKfGFA84uO36bl2Oat0bbThQ&usqp=CAU" alt="Foundation" className="w-full h-64 object-cover mb-4" />
//                   <h3 className="font-semibold text-lg">Hydrating Lip Gloss</h3>
               
//                   <Link href="http://localhost:3000/product-details?id=2&name=Hydrating+Lip+Gloss&price=%2444.15&image=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQGGwJYv_PXuviVLPjwDxxRqgGyVshbqSgh-g0gHNhkjzCdKfGFA84uO36bl2Oat0bbThQ%26usqp%3DCAU&description=Non-sticky+formula+with+vitamin+E">
//                     <button className="text-blue-500">View Details</button>
//                   </Link>
//                 </div>
      
//                 {/* Product Card 3 */}
//                 <div className="border p-4 rounded-lg">
//                   <img src="https://www.makeupcityshop.com/cdn/shop/files/pL6Asc.8809598456242_360x.jpg?v=1742539722" alt="Mascara" className="w-full h-64 object-cover mb-4" />
//                   <h3 className="font-semibold text-lg">Cosrx</h3>
                
//                   <Link href="http://localhost:3000/product-details?id=3&name=Cosrx&price=%24118.43&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FpL6Asc.8809598456242_360x.jpg%3Fv%3D1742539722&description=Rich+and+smooth+texture+with+a+soft+finish">
//                     <button className="text-blue-500">View Details</button>
//                   </Link>
//                 </div>
      
//                 {/* Product Card 4 */}
//                 <div className="border p-4 rounded-lg">
//                   <img src="https://www.makeupcityshop.com/cdn/shop/files/BeautyOfJoseon-GlowDeepSerumRice_Alpha-Arbutin-30ml_83e22904-3e91-4798-a620-f28e2e0a2bf8_360x.jpg?v=1742540939" alt="Eyeshadow Palette" className="w-full h-64 object-cover mb-4" />
//                   <h3 className="font-semibold text-lg">Beauty of Joseon - Glow Serum</h3>
                
//                   <Link href="http://localhost:3000/product-details?id=4&name=Beauty+of+Joseon+-+Glow+Serum&price=%2456.12&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FBeautyOfJoseon-GlowDeepSerumRice_Alpha-Arbutin-30ml_83e22904-3e91-4798-a620-f28e2e0a2bf8_360x.jpg%3Fv%3D1742540939&description=High-shine+finish+with+a+moisturizing+effect">
//                     <button className="text-blue-500">View Details</button>
//                   </Link>
//                 </div>
//                 {/* Product Card 5 */}
//           <div className="border p-4 rounded-lg">
//             <img src="https://www.makeupcityshop.com/cdn/shop/files/pLNLXJ.8809981339206_360x.jpg?v=174253959" alt="Blush" className="w-full h-64 object-cover mb-4" />
//             <h3 className="font-semibold text-lg">Medicube - Glow Booster Serum</h3>
          
//             <Link href="http://localhost:3000/product-details?id=5&name=Medicube+-+Glow+Booster+Serum&price=%2447.78&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FpLNLXJ.8809981339206_360x.jpg%3Fv%3D1742539592&description=Smooth+and+creamy+texture+with+intense+color">
//               <button className="text-blue-500">View Details</button>
//             </Link>
//           </div>
      
//           {/* Product Card 6 */}
//           <div className="border p-4 rounded-lg">
//             <img src="https://www.makeupcityshop.com/cdn/shop/files/Sheglam---Color-Bloom-Matte-Liquid-Blush---Risky-Business-2_360x.jpg?v=1696337286" alt="Highlighter" className="w-full h-64 object-cover mb-4" />
//             <h3 className="font-semibold text-lg">Sheglam - Color Bloom Matte Liquid Blush</h3>
         
//             <Link href="http://localhost:3000/product-details?id=6&name=Sheglam+-+Color+Bloom+Matte+Liquid+Blush&price=%2457.19&image=https%3A%2F%2Fwww.makeupcityshop.com%2Fcdn%2Fshop%2Ffiles%2FSheglam---Color-Bloom-Matte-Liquid-Blush---Risky-Business-2_360x.jpg%3Fv%3D1696337286&description=Bold+and+vibrant+red+for+every+occasion">
//               <button className="text-blue-500">View Details</button>
//             </Link>
//           </div>
      
//           {/* Product Card 7 */}
//           <div className="border p-4 rounded-lg">
//             <img src='https://img.heroui.chat/image/fashion?w=400&h=400&u=pink_satin_lipstick1 alt="Eyeliner" className="w-full h-64 object-cover mb-4' />
//             <h3 className="font-semibold text-lg">Golden Heals</h3>
           
//             <Link href="http://localhost:3000/product-details?id=7&name=Golden+Heals+&price=%24118.73&image=https%3A%2F%2Fimg.heroui.chat%2Fimage%2Ffashion%3Fw%3D400%26h%3D400%26u%3Dpink_satin_lipstick1&description=Satin+finish+with+soft+pink+hues">
//               <button className="text-blue-500">View Details</button>
//             </Link>
//           </div>
      
//           {/* Product Card 8 */}
//           <div className="border p-4 rounded-lg">
//             <img src="https://img.heroui.chat/image/fashion?w=400&h=400&u=berry_lipstick1" alt="Setting Spray" className="w-full h-64 object-cover mb-4" />
//             <h3 className="font-semibold text-lg">Classic Clothes</h3>
    
//             <Link href="http://localhost:3000/product-details?id=8&name=Classic+Clothes&price=%2491.31&image=https%3A%2F%2Fimg.heroui.chat%2Fimage%2Ffashion%3Fw%3D400%26h%3D400%26u%3Dberry_lipstick1&description=Deep+berry+shade+for+a+chic+look">
//               <button className="text-blue-500">View Details</button>
//             </Link>
//           </div>
      
         
//         </div>
//       </section>
      
//     </div>
//   )
// }

// export default Feature
