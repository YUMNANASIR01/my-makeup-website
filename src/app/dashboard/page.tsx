
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ArrowDownIcon, DocumentArrowDownIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HiCheckCircle, HiXCircle, HiPaperClip } from "react-icons/hi";
import Link from "next/link";

const AdminDashboard = () => {
  const { user, isLoaded } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState("all");

  // Sample order data
  const orderData = [
    { id: "#1234", user: "John Doe", date: "2023-08-15", status: "Completed", amount: "$234.00" },
    { id: "#1235", user: "Jane Smith", date: "2023-08-16", status: "Pending", amount: "$100.00" },
    { id: "#1236", user: "Alice Johnson", date: "2023-08-17", status: "Shipped", amount: "$500.00" },
    { id: "#1237", user: "Bob Brown", date: "2023-08-18", status: "Completed", amount: "$120.00" },
  ];

  const router = useRouter();

  // Filter orders based on status
  const filteredOrders = orderData
    .filter((order) =>
      orderStatus === "all" || order.status.toLowerCase() === orderStatus.toLowerCase()
    )
    .filter(
      (order) =>
        order.id.includes(searchQuery) || order.user.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Pagination function
  const handlePageChange = (direction: string) => {
    if (direction === "next" && currentPage < Math.ceil(filteredOrders.length / 10)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Export to PDF function (mockup)
  const handleExportPDF = () => {
    alert("Exporting orders as PDF...");
    // Actual PDF generation logic would go here (e.g., using jsPDF)
  };

  // Export to CSV function (mockup)
  const handleExportCSV = () => {
    alert("Exporting orders as CSV...");
    // Actual CSV generation logic would go here (e.g., using react-csv)
  };

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [isLoaded, user, router]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-emerald-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-emerald-600">Admin Dashboard</h2>
              <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.firstName}!</p>
            </div>
            <div className="space-y-4 p-4">
              <Link href="/dashboard">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-200 text-gray-700">Dashboard</button>
              </Link>
              <Link href="/orders">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-200 text-gray-700">Orders</button>
              </Link>
              <Link href="/users">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-200 text-gray-700">Users</button>
              </Link>
            </div>
          </div>
          <div className="p-6">
            <button
              onClick={() => router.push("/logout")}
              className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Export PDF
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <ArrowDownIcon className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-500" />
              <select
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search orders..."
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-gray-800">Order List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.slice((currentPage - 1) * 10, currentPage * 10).map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.user}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">
                      {order.status === "Completed" ? (
                        <span className="text-green-600 flex items-center gap-2">
                          <HiCheckCircle className="w-4 h-4" /> {order.status}
                        </span>
                      ) : order.status === "Pending" ? (
                        <span className="text-yellow-500 flex items-center gap-2">
                          <HiXCircle className="w-4 h-4" /> {order.status}
                        </span>
                      ) : (
                        <span className="text-blue-500 flex items-center gap-2">
                          <HiPaperClip className="w-4 h-4" /> {order.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-700">View</button>
                      <button className="text-red-600 ml-2 hover:text-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-between items-center">
            <span className="text-gray-500 text-sm">Showing {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, filteredOrders.length)} of {filteredOrders.length} results</span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange("previous")}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange("next")}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-blue-100 hover:bg-blue-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;













// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { ArrowDownIcon, DocumentArrowDownIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { HiCheckCircle, HiXCircle, HiPaperClip } from "react-icons/hi";
// import Link from "next/link";

// const AdminDashboard = () => {
//   const { user, isLoaded } = useUser();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [orderStatus, setOrderStatus] = useState("all");

//   // Sample order data
//   const orderData = [
//     { id: "#1234", user: "John Doe", date: "2023-08-15", status: "Completed", amount: "$234.00" },
//     { id: "#1235", user: "Jane Smith", date: "2023-08-16", status: "Pending", amount: "$100.00" },
//     { id: "#1236", user: "Alice Johnson", date: "2023-08-17", status: "Shipped", amount: "$500.00" },
//     { id: "#1237", user: "Bob Brown", date: "2023-08-18", status: "Completed", amount: "$120.00" },
//   ];

//   const [orders, setOrders] = useState(orderData);
//   const router = useRouter();

//   // Filter orders based on status
//   const filteredOrders = orders.filter(
//     (order) =>
//       orderStatus === "all" || order.status.toLowerCase() === orderStatus.toLowerCase()
//   ).filter(
//     (order) =>
//       order.id.includes(searchQuery) || order.user.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination function
//   const handlePageChange = (direction: string) => {
//     if (direction === "next" && currentPage < Math.ceil(filteredOrders.length / 10)) {
//       setCurrentPage(currentPage + 1);
//     } else if (direction === "previous" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Export to PDF function (mockup)
//   const handleExportPDF = () => {
//     alert("Exporting orders as PDF...");
//     // Actual PDF generation logic would go here (e.g., using jsPDF)
//   };

//   // Export to CSV function (mockup)
//   const handleExportCSV = () => {
//     alert("Exporting orders as CSV...");
//     // Actual CSV generation logic would go here (e.g., using react-csv)
//   };

//   useEffect(() => {
//     if (isLoaded && !user) {
//       router.push("/login"); // Redirect to login if not authenticated
//     }
//   }, [isLoaded, user, router]);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-emerald-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg">
//         <div className="h-full flex flex-col justify-between">
//           <div>
//             <div className="p-6">
//               <h2 className="text-2xl font-semibold text-emerald-600">Admin Dashboard</h2>
//               <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.firstName}!</p>
//             </div>
//             <div className="space-y-4 p-4">
//               <Link href="/dashboard">
//                 <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-200 text-gray-700">Dashboard</button>
//               </Link>
//               <Link href="/orders">
//                 <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-200 text-gray-700">Orders</button>
//               </Link>
//               <Link href="/users">
//                 <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-200 text-gray-700">Users</button>
//               </Link>
//             </div>
//           </div>
//           <div className="p-6">
//             <button
//               onClick={() => router.push("/logout")}
//               className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 space-y-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
//             <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
//           </div>
//           <div className="flex gap-4">
//             <button
//               onClick={handleExportPDF}
//               className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
//             >
//               <DocumentArrowDownIcon className="w-5 h-5" />
//               Export PDF
//             </button>
//             <button
//               onClick={handleExportCSV}
//               className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
//             >
//               <ArrowDownIcon className="w-5 h-5" />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Filter Section */}
//         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
//           <div className="flex gap-6 items-center">
//             <div className="flex items-center gap-2">
//               <FunnelIcon className="w-5 h-5 text-gray-500" />
//               <select
//                 className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
//                 value={orderStatus}
//                 onChange={(e) => setOrderStatus(e.target.value)}
//               >
//                 <option value="all">All Orders</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Shipped">Shipped</option>
//               </select>
//             </div>
//             <div className="flex items-center gap-2 flex-1">
//               <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search orders..."
//                 className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="font-semibold text-lg text-gray-800">Order List</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredOrders.slice((currentPage - 1) * 10, currentPage * 10).map((order, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">{order.id}</td>
//                     <td className="px-4 py-3">{order.user}</td>
//                     <td className="px-4 py-3">{order.date}</td>
//                     <td className="px-4 py-3">
//                       {order.status === "Completed" ? (
//                         <span className="text-green-600 flex items-center gap-2">
//                           <HiCheckCircle className="w-4 h-4" /> {order.status}
//                         </span>
//                       ) : order.status === "Pending" ? (
//                         <span className="text-yellow-500 flex items-center gap-2">
//                           <HiXCircle className="w-4 h-4" /> {order.status}
//                         </span>
//                       ) : (
//                         <span className="text-blue-500 flex items-center gap-2">
//                           <HiPaperClip className="w-4 h-4" /> {order.status}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3">{order.amount}</td>
//                     <td className="px-4 py-3">
//                       <button className="text-blue-600 hover:text-blue-700">View</button>
//                       <button className="text-red-600 ml-2 hover:text-red-700">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="p-6 border-t border-gray-200 flex justify-between items-center">
//             <span className="text-gray-500 text-sm">Showing {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, filteredOrders.length)} of {filteredOrders.length} results</span>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handlePageChange("previous")}
//                 className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => handlePageChange("next")}
//                 className="px-4 py-2 rounded-lg border border-gray-200 bg-blue-100 hover:bg-blue-200"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { ArrowDownIcon, DocumentArrowDownIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

// const AdminDashboard = () => {
//   const { user, isLoaded } = useUser();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [orderStatus, setOrderStatus] = useState("all");

//   // Sample order data
//   const orderData = [
//     { id: "#1234", user: "John Doe", date: "2023-08-15", status: "Completed", amount: "$234.00" },
//     { id: "#1235", user: "Jane Smith", date: "2023-08-16", status: "Pending", amount: "$100.00" },
//     { id: "#1236", user: "Alice Johnson", date: "2023-08-17", status: "Shipped", amount: "$500.00" },
//     { id: "#1237", user: "Bob Brown", date: "2023-08-18", status: "Completed", amount: "$120.00" },
//   ];

//   const [orders, setOrders] = useState(orderData);
//   const router = useRouter();

//   // Filter orders based on status
//   const filteredOrders = orders.filter(
//     (order) =>
//       orderStatus === "all" || order.status.toLowerCase() === orderStatus.toLowerCase()
//   ).filter(
//     (order) =>
//       order.id.includes(searchQuery) || order.user.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination function
//   const handlePageChange = (direction: string) => {
//     if (direction === "next" && currentPage < Math.ceil(filteredOrders.length / 10)) {
//       setCurrentPage(currentPage + 1);
//     } else if (direction === "previous" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Export to PDF function (mockup)
//   const handleExportPDF = () => {
//     alert("Exporting orders as PDF...");
//     // Actual PDF generation logic would go here (e.g., using jsPDF)
//   };

//   // Export to CSV function (mockup)
//   const handleExportCSV = () => {
//     alert("Exporting orders as CSV...");
//     // Actual CSV generation logic would go here (e.g., using react-csv)
//   };

//   useEffect(() => {
//     if (isLoaded && !user) {
//       router.push("/login"); // Redirect to login if not authenticated
//     }
//   }, [isLoaded, user, router]);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="h-full flex flex-col justify-between">
//           <div>
//             <div className="p-4">
//               <h2 className="text-lg font-bold">Admin Dashboard</h2>
//               <p className="text-gray-500 text-sm">Welcome back, {user?.firstName}!</p>
//             </div>
//             <div className="space-y-4 p-4">
//               <Link href="/dashboard">
//                 <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Dashboard</button>
//               </Link>
//               <Link href="/orders">
//                 <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Orders</button>
//               </Link>
//               <Link href="/users">
//                 <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Users</button>
//               </Link>
//             </div>
//           </div>
//           <div className="p-4">
//             <button
//               onClick={() => router.push("/logout")}
//               className="w-full px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
//             <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={handleExportPDF}
//               className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
//             >
//               <DocumentArrowDownIcon className="w-5 h-5" />
//               Export PDF
//             </button>
//             <button
//               onClick={handleExportCSV}
//               className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
//             >
//               <ArrowDownIcon className="w-5 h-5" />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Filter Section */}
//         <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
//           <div className="flex flex-wrap gap-4 items-center">
//             <div className="flex items-center gap-2">
//               <FunnelIcon className="w-5 h-5 text-gray-400" />
//               <select
//                 className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
//                 value={orderStatus}
//                 onChange={(e) => setOrderStatus(e.target.value)}
//               >
//                 <option value="all">All Orders</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Shipped">Shipped</option>
//               </select>
//             </div>
//             <div className="flex items-center gap-2 flex-1 min-w-[250px]">
//               <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search orders..."
//                 className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h3 className="font-semibold">Order List</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredOrders.slice((currentPage - 1) * 10, currentPage * 10).map((order, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">{order.id}</td>
//                     <td className="px-4 py-3">{order.user}</td>
//                     <td className="px-4 py-3">{order.date}</td>
//                     <td className="px-4 py-3">{order.status}</td>
//                     <td className="px-4 py-3">{order.amount}</td>
//                     <td className="px-4 py-3">
//                       <button className="text-blue-600">View</button>
//                       <button className="text-red-600 ml-2">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="p-4 border-t border-gray-200 flex justify-between items-center">
//             <span className="text-gray-500 text-sm">Showing {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, filteredOrders.length)} of {filteredOrders.length} results</span>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handlePageChange("previous")}
//                 className="px-3 py-1 rounded-lg border border-gray-200"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => handlePageChange("next")}
//                 className="px-3 py-1 rounded-lg border border-gray-200 bg-blue-100"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
