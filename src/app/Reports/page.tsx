
"use client";
import { useState } from "react";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowDownIcon, MagnifyingGlassIcon, DocumentArrowDownIcon, FunnelIcon } from "@heroicons/react/24/outline";

const AdminReportComponent = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [reportType, setReportType] = useState("sales");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // To handle pagination for the table

  // Sample data - replace with real data
  const reportData = {
    sales: [
      { month: "Jan", value: 4000 },
      { month: "Feb", value: 3000 },
      { month: "Mar", value: 5000 },
      { month: "Apr", value: 6000 },
    ],
    users: [
      { category: "New Users", value: 400 },
      { category: "Returning", value: 300 },
    ],
  };

  // Using reportData directly instead of using a setter for reports
  const reports = reportData.sales;

  const metrics = [
    { title: "Total Revenue", value: "$24,532", change: "+12.5%", positive: true },
    { title: "Active Users", value: "1,234", change: "-3.2%", positive: false },
    { title: "Conversion Rate", value: "3.8%", change: "+2.1%", positive: true },
    { title: "Avg. Order Value", value: "$89.50", change: "+5.6%", positive: true },
  ];

  // Function to simulate exporting PDF
  const handleExportPDF = () => {
    alert("Exporting report as PDF...");
    // Implement PDF export logic here
  };

  // Function to simulate exporting CSV
  const handleExportCSV = () => {
    alert("Exporting report as CSV...");
    // Implement CSV export logic here
  };

  // Pagination functionality: Change page
  const handlePageChange = (direction: string) => {
    if (direction === "next" && currentPage < Math.ceil(reports.length / 10)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Simulate search functionality (you can replace with actual filtering logic)
  const filteredReports = reports.filter((report) =>
    report.month ? report.month.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
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

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">{metric.title}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className={`text-sm ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <select
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="sales">Sales</option>
                <option value="users">Users</option>
                <option value="traffic">Traffic</option>
                <option value="conversion">Conversion</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-[250px]">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Sales Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredReports}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">User Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportData.users}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#10B981"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Detailed Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3">#1234</td>
                  <td className="px-4 py-3">John Doe</td>
                  <td className="px-4 py-3">2023-08-15</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Completed
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">$234.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-gray-500 text-sm">Showing 1-10 of 234 results</span>
            <div className="flex gap-2">
              <button onClick={() => handlePageChange("previous")} className="px-3 py-1 rounded-lg border border-gray-200">
                Previous
              </button>
              <button onClick={() => handlePageChange("next")} className="px-3 py-1 rounded-lg border border-gray-200 bg-blue-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportComponent;















// "use client";
// import { useState } from "react";
// import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { ArrowDownIcon, MagnifyingGlassIcon, DocumentArrowDownIcon, FunnelIcon } from "@heroicons/react/24/outline";

// const AdminReportComponent = () => {
//   const [timeRange, setTimeRange] = useState("monthly");
//   const [reportType, setReportType] = useState("sales");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1); // To handle pagination for the table

//   // Sample data - replace with real data
//   const reportData = {
//     sales: [
//       { month: "Jan", value: 4000 },
//       { month: "Feb", value: 3000 },
//       { month: "Mar", value: 5000 },
//       { month: "Apr", value: 6000 },
//     ],
//     users: [
//       { category: "New Users", value: 400 },
//       { category: "Returning", value: 300 },
//     ],
//   };

//   const [reports, setReports] = useState(reportData.sales); // This will store the actual report data

//   const metrics = [
//     { title: "Total Revenue", value: "$24,532", change: "+12.5%", positive: true },
//     { title: "Active Users", value: "1,234", change: "-3.2%", positive: false },
//     { title: "Conversion Rate", value: "3.8%", change: "+2.1%", positive: true },
//     { title: "Avg. Order Value", value: "$89.50", change: "+5.6%", positive: true },
//   ];

//   // Function to simulate exporting PDF
//   const handleExportPDF = () => {
//     alert("Exporting report as PDF...");
//     // Implement PDF export logic here
//   };

//   // Function to simulate exporting CSV
//   const handleExportCSV = () => {
//     alert("Exporting report as CSV...");
//     // Implement CSV export logic here
//   };

//   // Pagination functionality: Change page
//   const handlePageChange = (direction: string) => {
//     if (direction === "next" && currentPage < Math.ceil(reports.length / 10)) {
//       setCurrentPage(currentPage + 1);
//     } else if (direction === "previous" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Simulate search functionality (you can replace with actual filtering logic)
//   const filteredReports = reports.filter((report) =>
//     report.month ? report.month.toLowerCase().includes(searchQuery.toLowerCase()) : false
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
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

//         {/* Quick Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {metrics.map((metric, index) => (
//             <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
//               <p className="text-gray-500 text-sm">{metric.title}</p>
//               <div className="flex items-baseline gap-2 mt-2">
//                 <span className="text-2xl font-bold">{metric.value}</span>
//                 <span className={`text-sm ${metric.positive ? "text-green-600" : "text-red-600"}`}>
//                   {metric.change}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Filters */}
//         <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
//           <div className="flex flex-wrap gap-4 items-center">
//             <div className="flex items-center gap-2">
//               <FunnelIcon className="w-5 h-5 text-gray-400" />
//               <select
//                 className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
//                 value={timeRange}
//                 onChange={(e) => setTimeRange(e.target.value)}
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//               </select>
//             </div>

//             <div className="flex items-center gap-2">
//               <select
//                 className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
//                 value={reportType}
//                 onChange={(e) => setReportType(e.target.value)}
//               >
//                 <option value="sales">Sales</option>
//                 <option value="users">Users</option>
//                 <option value="traffic">Traffic</option>
//                 <option value="conversion">Conversion</option>
//               </select>
//             </div>

//             <div className="flex items-center gap-2 flex-1 min-w-[250px]">
//               <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search reports..."
//                 className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white p-4 rounded-xl shadow-sm">
//             <h3 className="font-semibold mb-4">Sales Trend</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={filteredReports}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#3B82F6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow-sm">
//             <h3 className="font-semibold mb-4">User Distribution</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={reportData.users}
//                     dataKey="value"
//                     nameKey="category"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#10B981"
//                     label
//                   />
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h3 className="font-semibold">Detailed Transactions</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 <tr className="hover:bg-gray-50">
//                   <td className="px-4 py-3">#1234</td>
//                   <td className="px-4 py-3">John Doe</td>
//                   <td className="px-4 py-3">2023-08-15</td>
//                   <td className="px-4 py-3">
//                     <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                       Completed
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 font-medium">$234.00</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="p-4 border-t border-gray-200 flex justify-between items-center">
//             <span className="text-gray-500 text-sm">Showing 1-10 of 234 results</span>
//             <div className="flex gap-2">
//               <button onClick={() => handlePageChange("previous")} className="px-3 py-1 rounded-lg border border-gray-200">
//                 Previous
//               </button>
//               <button onClick={() => handlePageChange("next")} className="px-3 py-1 rounded-lg border border-gray-200 bg-blue-100">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminReportComponent;
