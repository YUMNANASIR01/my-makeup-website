


'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUsers, FiShoppingCart, FiBarChart, FiPackage } from 'react-icons/fi';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const router = useRouter();

  // Check if the user is an admin and has logged in
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'admin') {
      router.push('/admin'); // Redirect non-admins
    }
  }, [isLoaded, user, router]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === adminPassword) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
      setPassword(''); // Clear password on error
    }
  };

  // Show loading screen until user data is loaded
  if (!isLoaded) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading Security Module...</p>
      </div>
    </div>
  );

  // Show password form if the password is not correct
  if (!isPasswordCorrect) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-emerald-100"
        >
          <div className="space-y-2 text-center">
            <div className="mx-auto bg-emerald-100 p-3 rounded-full w-max">
              <LockClosedIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500">Enter security credentials to continue</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Security Key
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all 
                        transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Authenticate
            </button>
          </form>

          {!isPasswordCorrect && password && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-4 text-sm text-red-700 bg-red-50 rounded-lg"
            >
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              <span>Invalid security key. Please verify and try again.</span>
            </motion.div>
          )}

          <p className="text-center text-sm text-gray-500">
            Contact system administrator if you&apos;ve lost your credentials
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard content (when password is correct)
  return (
    <>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-emerald-600 text-white p-6">
        <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link 
                href="/products-admin"
                className="flex items-center gap-2 hover:text-emerald-200"
              >
                <FiUsers size={20} /> Products
              </Link>
            </li>
            <li className="mb-4">
              <Link 
                href="/users"
                className="flex items-center gap-2 hover:text-emerald-200"
              >
                <FiUsers size={20} /> Users
              </Link>
            </li>
            <li className="mb-4">
              <a
                href="/orders"
                className="flex items-center gap-2 hover:text-emerald-200"
              >
                <FiShoppingCart size={20} /> Orders
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/Reports"
                className="flex items-center gap-2 hover:text-emerald-200"
              >
                <FiBarChart size={20} /> Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Admin Dashboard */}
      <div className="flex-1 p-10 overflow-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.firstName ? user.firstName : 'Admin'}!
          </h1>
          <p className="text-gray-600">Here&apos;s a quick overview of your dashboard.</p>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-emerald-600">1,234</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-emerald-600">567</p>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-3xl font-bold text-emerald-600">$45,678</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Recent Activity</h3>
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <p className="text-gray-600">View your most recent transactions, orders, and user activity here.</p>
            
            {/* Activity details */}
            <div className="space-y-4 mt-4">
              {/* Activity 1 */}
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FiPackage className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New product added: &#39;Premium Leather Chair&#39;</p>
                    <p className="text-sm text-gray-500">&#39;Premium Leather Chair&#39; added to inventory.</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>

              {/* Activity 2 */}
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiUsers className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">User &#39;John Doe&#39; registered</p>
                    <p className="text-sm text-gray-500">A new user, &#39;John Doe&#39;, registered on the platform.</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">5h ago</span>
              </div>

              {/* Activity 3 */}
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FiShoppingCart className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New order placed: Order #1234</p>
                    <p className="text-sm text-gray-500">Order #1234 placed by &#39;Jane Smith&#39;.</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">12h ago</span>
              </div>

              {/* Activity 4 */}
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FiBarChart className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Revenue update</p>
                    <p className="text-sm text-gray-500">Total revenue has increased by $500 from recent sales.</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>

              {/* Activity 5 */}
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FiPackage className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Product Wireless Headphones updated</p>
                    <p className="text-sm text-gray-500">Product details for Wireless Headphones were updated.</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}





// "use client";

// import { useUser } from '@clerk/nextjs';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { FiUsers, FiShoppingCart, FiBarChart, FiPackage } from 'react-icons/fi';
// import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// import { motion } from 'framer-motion';
// import Link from 'next/link';


// export default function AdminPage() {
//   const { user, isLoaded } = useUser();
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
//   const router = useRouter();

//   // Check if the user is an admin and has logged in
//   useEffect(() => {
//     if (isLoaded && user?.publicMetadata?.role !== 'admin') {
//       router.push('/admin'); // Redirect non-admins
//     }
//   }, [isLoaded, user, router]);

//   const handlePasswordSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
//     if (password === adminPassword) {
//       setIsPasswordCorrect(true);
//     } else {
//       setIsPasswordCorrect(false);
//       setPassword(''); // Clear password on error
//     }
//   };

//   // Show loading screen until user data is loaded
//   if (!isLoaded) return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-500">
//       <div className="flex flex-col items-center space-y-4">
//         <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-gray-600 font-medium">Loading Security Module...</p>
//       </div>
//     </div>
//   );

//   // Show password form if the password is not correct
//   if (!isPasswordCorrect) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-emerald-100"
//         >
//           <div className="space-y-2 text-center">
//             <div className="mx-auto bg-emerald-100 p-3 rounded-full w-max">
//               <LockClosedIcon className="h-8 w-8 text-emerald-600" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
//             <p className="text-gray-500">Enter security credentials to continue</p>
//           </div>

//           <form onSubmit={handlePasswordSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Security Key
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type="password"
//                   autoComplete="current-password"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12 transition-all"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeSlashIcon className="h-5 w-5" />
//                   ) : (
//                     <EyeIcon className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all 
//                         transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
//             >
//               Authenticate
//             </button>
//           </form>

//           {!isPasswordCorrect && password && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center p-4 text-sm text-red-700 bg-red-50 rounded-lg"
//             >
//               <ExclamationCircleIcon className="h-5 w-5 mr-2" />
//               <span>Invalid security key. Please verify and try again.</span>
//             </motion.div>
//           )}

//           <p className="text-center text-sm text-gray-500">
//             Contact system administrator if you've lost your credentials
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   // Admin Dashboard content (when password is correct)
//   return (
//     <>
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-emerald-600 text-white p-6">
//         <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
//         <nav>
//           <ul>
//           <li className="mb-4">
//               <Link 
//                 href="/products-admin"
//                 className="flex items-center gap-2 hover:text-emerald-200"
//               >
//                 <FiUsers size={20} /> Products
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link 
//                 href="/users"
//                 className="flex items-center gap-2 hover:text-emerald-200"
//               >
//                 <FiUsers size={20} /> Users
//               </Link>
//             </li>
//             <li className="mb-4">
//               <a
//                 href="/orders"
//                 className="flex items-center gap-2 hover:text-emerald-200"
//               >
//                 <FiShoppingCart size={20} /> Orders
//               </a>
//             </li>
//             <li className="mb-4">
//               <a
//                 href="/Reports"
//                 className="flex items-center gap-2 hover:text-emerald-200"
//               >
//                 <FiBarChart size={20} /> Reports
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Admin Dashboard */}
//       <div className="flex-1 p-10 overflow-auto">
//         {/* Welcome Section */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Welcome, {user?.firstName ? user.firstName : 'Admin'}!
//           </h1>
//           <p className="text-gray-600">Here a quick overview of your dashboard.</p>
//         </div>

//         {/* Stats Cards Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Total Users */}
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//             <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
//             <p className="text-3xl font-bold text-emerald-600">1,234</p>
//           </div>

//           {/* Total Orders */}
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//             <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
//             <p className="text-3xl font-bold text-emerald-600">567</p>
//           </div>

//           {/* Revenue */}
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//             <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
//             <p className="text-3xl font-bold text-emerald-600">$45,678</p>
//           </div>
//         </div>

// {/* Dashboard Content */}
// <div className="mt-8">
//   <h3 className="text-2xl font-semibold text-gray-800">Recent Activity</h3>
//   <div className="bg-white p-6 rounded-lg shadow-md mt-4">
//     <p className="text-gray-600">View your most recent transactions, orders, and user activity here.</p>
    
//     {/* Activity details */}
//     <div className="space-y-4 mt-4">
//       {/* Activity 1 */}
//       <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
//         <div className="flex items-center gap-4">
//           <div className="p-2 bg-emerald-100 rounded-lg">
//             <FiPackage className="h-5 w-5 text-emerald-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-800">New product added: 'Premium Leather Chair'</p>
//             <p className="text-sm text-gray-500">"Premium Leather Chair" added to inventory.</p>
//           </div>
//         </div>
//         <span className="text-sm text-gray-500">2h ago</span>
//       </div>

//       {/* Activity 2 */}
//       <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
//         <div className="flex items-center gap-4">
//           <div className="p-2 bg-blue-100 rounded-lg">
//             <FiUsers className="h-5 w-5 text-blue-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-800">User 'John Doe' registered</p>
//             <p className="text-sm text-gray-500">A new user, 'John Doe', registered on the platform.</p>
//           </div>
//         </div>
//         <span className="text-sm text-gray-500">5h ago</span>
//       </div>

//       {/* Activity 3 */}
//       <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
//         <div className="flex items-center gap-4">
//           <div className="p-2 bg-purple-100 rounded-lg">
//             <FiShoppingCart className="h-5 w-5 text-purple-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-800">New order placed: Order #1234</p>
//             <p className="text-sm text-gray-500">Order #1234 placed by 'Jane Smith'.</p>
//           </div>
//         </div>
//         <span className="text-sm text-gray-500">12h ago</span>
//       </div>

//       {/* Activity 4 */}
//       <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
//         <div className="flex items-center gap-4">
//           <div className="p-2 bg-yellow-100 rounded-lg">
//             <FiBarChart className="h-5 w-5 text-yellow-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-800">Revenue update</p>
//             <p className="text-sm text-gray-500">Total revenue has increased by $500 from recent sales.</p>
//           </div>
//         </div>
//         <span className="text-sm text-gray-500">1 day ago</span>
//       </div>

//       {/* Activity 5 */}
//       <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
//         <div className="flex items-center gap-4">
//           <div className="p-2 bg-red-100 rounded-lg">
//             <FiPackage className="h-5 w-5 text-red-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-800">Product Wireless Headphones updated</p>
//             <p className="text-sm text-gray-500">Product details for Wireless Headphones were updated.</p>
//           </div>
//         </div>
//         <span className="text-sm text-gray-500">2 days ago</span>
//       </div>
//     </div>
//   </div>
// </div>

//         </div>
//       </div>
    
   
  
//        </>
//   );
// }
