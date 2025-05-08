import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'; // Import Lucide icons
import Link from 'next/link';

export function Footer() {
  return (
    <>
      <hr />
      <footer className="bg-gray-900 text-white p-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white">
                <Facebook className="text-2xl" /> {/* Lucide icon */}
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
                <Instagram className="text-2xl" /> {/* Lucide icon */}
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                <Twitter className="text-2xl" /> {/* Lucide icon */}
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <Linkedin className="text-2xl" /> {/* Lucide icon */}
              </Link>
            </div>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest updates on new products and promotions.</p>
            <form action="#" method="POST" className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-white w-full sm:w-auto"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">© 2025 E-commerce Site. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}













// import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'; // Import Lucide icons
// import Link from 'next/link';

// export function Footer() {
//   return (
//     <>
//     <hr />
//     <footer className="bg-gray-900 text-white p-8">
     
//       <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
//         {/* Column 1: Quick Links */}
//         <div>
//           <h3 className="font-semibold mb-4">Quick Links</h3>
//           <ul>
//             <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
//             <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
//             <li><a href="/" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
//             <li><a href="/" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
//           </ul>
//         </div>

//         {/* Column 2: Customer Service */}
//         <div>
//           <h3 className="font-semibold mb-4">Customer Service</h3>
//           <ul>
//             <li><Link href="/" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
//             <li><Link href="/" className="text-gray-400 hover:text-white">Return Policy</Link></li>
//             <li><Link href="/" className="text-gray-400 hover:text-white">FAQ</Link></li>
//             <li><Link href="/" className="text-gray-400 hover:text-white">Support</Link></li>
//           </ul>
//         </div>

//         {/* Column 3: Follow Us */}
//         <div>
//           <h3 className="font-semibold mb-4">Follow Us</h3>
//           <div className="flex space-x-4">
//             <Link href="https://facebook.com" className="text-gray-400 hover:text-white">
//               <Facebook className="text-2xl" /> {/* Lucide icon */}
//             </Link>
//             <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
//               <Instagram className="text-2xl" /> {/* Lucide icon */}
//             </Link>
//             <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
//               <Twitter className="text-2xl" /> {/* Lucide icon */}
//             </Link>
//             <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
//               <Linkedin className="text-2xl" /> {/* Lucide icon */}
//             </Link>
//           </div>
//         </div>

//         {/* Column 4: Newsletter Subscription */}
//         <div>
//           <h3 className="font-semibold mb-4">Subscribe to Our Newsletter</h3>
//           <p className="text-gray-400 mb-4">Get the latest updates on new products and promotions.</p>
//           <form action="#" method="POST" className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//             <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg text-white w-full sm:w-auto" />
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="text-center mt-8">
//         <p className="text-gray-400 text-sm">© 2025 E-commerce Site. All rights reserved.</p>
//       </div>
//     </footer>
//     </>
//   );
// }
