"use client";
import { useState } from "react";
import { ArrowDownIcon, DocumentArrowDownIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const AdminOrderPage = () => {
  const [orderStatus, setOrderStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination

  // Sample order data
  const orderData = [
    { id: "#1234", user: "John Doe", date: "2023-08-15", status: "Completed", amount: "$234.00" },
    { id: "#1235", user: "Jane Smith", date: "2023-08-16", status: "Pending", amount: "$100.00" },
    { id: "#1236", user: "Alice Johnson", date: "2023-08-17", status: "Shipped", amount: "$500.00" },
    { id: "#1237", user: "Bob Brown", date: "2023-08-18", status: "Completed", amount: "$120.00" },
    // More sample orders...
  ];

 
  // Filter orders based on order status
interface Order {
    id: string;
    user: string;
    date: string;
    status: string;
    amount: string;
}

const filteredOrders = orderData.filter((order: Order) => 
    orderStatus === "all" || order.status.toLowerCase() === orderStatus.toLowerCase()
).filter((order: Order) => 
    order.id.includes(searchQuery) || order.user.toLowerCase().includes(searchQuery.toLowerCase())
);

  // Export orders as PDF
  const handleExportPDF = () => {
    alert("Exporting orders as PDF...");
    // Implement PDF export logic using a library like jsPDF
  };

  // Export orders as CSV
  const handleExportCSV = () => {
    alert("Exporting orders as CSV...");
    // Implement CSV export logic
  };

  // Pagination logic
  const handlePageChange = (direction: string) => {
    if (direction === "next" && currentPage < Math.ceil(filteredOrders.length / 10)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3">
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

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
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

            <div className="flex items-center gap-2 flex-1 min-w-[250px]">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Order List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
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
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600">View</button>
                      <button className="text-red-600 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-gray-500 text-sm">Showing {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, filteredOrders.length)} of {filteredOrders.length} results</span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange("previous")}
                className="px-3 py-1 rounded-lg border border-gray-200"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange("next")}
                className="px-3 py-1 rounded-lg border border-gray-200 bg-blue-100"
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

export default AdminOrderPage;
