

"use client"

import type React from "react"

import { useCartStore } from "@/stores/cart-store"
import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, DollarSign, Building, Smartphone } from "lucide-react"

// Define transaction interface
interface Transaction {
  id: string
  status: "pending" | "completed" | "failed"
  amount: number
  method: string
  date: string
}

export default function PaymentPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    paymentMethod: "Cash on Delivery",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    accountNumber: "",
    mobileWallet: "",
  })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First create the transaction record
      const transactionRes = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           amount: total,
           method: formData.paymentMethod,
           items: items.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
           })),
        }),
     });
      const transactionData = await transactionRes.json();
      console.log(transactionData);  // Check the full response
      if (!transactionRes.ok) {
         throw new Error(transactionData.error || "Failed to create transaction");
      }

      const newTransaction: Transaction = {
        id: transactionData.transactionId,
        status: "pending",
        amount: total,
        method: formData.paymentMethod,
        date: new Date().toISOString(),
      }

      setTransaction(newTransaction)

      // Then create the shipment
      const res = await fetch("/api/shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cartItems: items,
          transactionId: transactionData.transactionId,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // Update transaction status
        try {
          await fetch(`/api/transaction/${transactionData.transactionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "completed" }),
          })

          setTransaction((prev) => (prev ? { ...prev, status: "completed" } : null))
          setResponse(`success:${data.message} (ID: ${data.shipmentId})`)
          clearCart()
        } catch (updateError) {
          console.error("Failed to update transaction status:", updateError)
          // Still consider the transaction successful even if status update fails
          setResponse(`success:${data.message} (ID: ${data.shipmentId})`)
          clearCart()
        }
      } else {
        // Update transaction status to failed
        try {
          await fetch(`/api/transaction/${transactionData.transactionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "failed" }),
          })
        } catch (updateError) {
          console.error("Failed to update transaction status:", updateError)
        }

        setTransaction((prev) => (prev ? { ...prev, status: "failed" } : null))
        setResponse(`error:${data.error || "Payment processing failed"}`)
      }
    } catch (err) {
      console.error("Payment error:", err)
      setResponse("error:Something went wrong. Please try again.")

      // Only attempt to update transaction if we have one
      if (transaction?.id) {
        try {
          await fetch(`/api/transaction/${transaction.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "failed" }),
          })

          setTransaction((prev) => (prev ? { ...prev, status: "failed" } : null))
        } catch (updateError) {
          console.error("Failed to update transaction status:", updateError)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    setStep(2)
  }

  const prevStep = () => {
    setStep(1)
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-5 w-5 text-pink-500" />
      case "Bank Transfer":
        return <Building className="h-5 w-5 text-pink-500" />
      case "EasyPaisa / JazzCash":
        return <Smartphone className="h-5 w-5 text-pink-500" />
      default:
        return <DollarSign className="h-5 w-5 text-pink-500" />
    }
  }

  const renderPaymentMethodFields = () => {
    switch (formData.paymentMethod) {
      case "Credit Card":
        return (
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  id="cardExpiry"
                  name="cardExpiry"
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-2">
                  CVC
                </label>
                <input
                  id="cardCvc"
                  name="cardCvc"
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                  value={formData.cardCvc}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )
      case "Bank Transfer":
        return (
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                Please transfer the exact amount to our bank account. Include your order ID in the reference.
              </p>
              <p className="text-sm font-medium text-yellow-800 mt-2">
                Bank: National Bank
                <br />
                Account: 1234-5678-9012-3456
                <br />
                Beneficiary: Your Store Name
              </p>
            </div>
          </div>
        )
      case "EasyPaisa / JazzCash":
        return (
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="mobileWallet" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                id="mobileWallet"
                name="mobileWallet"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                value={formData.mobileWallet}
                onChange={handleChange}
              />
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                You will receive a payment request on your mobile wallet. Please complete the payment within 15 minutes.
              </p>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-4 bg-green-50 rounded-lg mt-4">
            <p className="text-sm text-green-800">
              You will pay when your order is delivered. Please have the exact amount ready.
            </p>
          </div>
        )
    }
  }

  const renderTransactionReceipt = () => {
    if (!transaction) return null

    return (
      <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Receipt</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{transaction.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date(transaction.date).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">${transaction.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">{transaction.method}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span
              className={`font-medium ${
                transaction.status === "completed"
                  ? "text-green-600"
                  : transaction.status === "failed"
                    ? "text-red-600"
                    : "text-yellow-600"
              }`}
            >
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 lg:p-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        Secure Checkout
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-pink-600">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Steps */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Checkout Progress</h4>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 1 ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div
                    className={`h-full ${step >= 2 ? "bg-pink-600" : "bg-gray-200"}`}
                    style={{ width: step >= 2 ? "100%" : "0%" }}
                  ></div>
                </div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 2 ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Shipping</span>
                <span>Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                >
                  Continue to Payment
                </button>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
                  <fieldset>
                    <legend className="text-sm font-medium text-gray-700 mb-3">Payment Method</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {["Cash on Delivery", "Credit Card", "Bank Transfer", "EasyPaisa / JazzCash"].map((method) => (
                        <label
                          key={method}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.paymentMethod === method
                              ? "border-pink-500 bg-pink-50"
                              : "border-gray-200 hover:border-pink-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                          />
                          <div className="ml-3 flex items-center">
                            {getPaymentMethodIcon(method)}
                            <span className="ml-2 text-sm font-medium text-gray-700">{method}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {renderPaymentMethodFields()}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-pink-600 hover:bg-pink-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      "Confirm & Pay Now"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {response && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                response.startsWith("success:") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              {response.split(":")[1]}
            </div>
          )}

          {transaction && renderTransactionReceipt()}
        </div>
      </div>
    </div>
  )
}


// 'use client';

// import { useCartStore } from '@/stores/cart-store';
// import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function PaymentPage() {
//   const items = useCartStore((state) => state.items);
//   const clearCart = useCartStore((state) => state.clearCart);
//   const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     country: '',
//     paymentMethod: 'Cash on Delivery',
//   });
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/shipment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           cartItems: items,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setResponse(`success:${data.message} (ID: ${data.shipmentId})`);
//         clearCart();
//       } else {
//         setResponse(`error:${data.error}`);
//       }
//     } catch (err) {
//       setResponse('error:Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-7xl mx-auto mt-10 p-4 lg:p-8">
//       <motion.h1 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-gray-900 mb-8 text-center"
//       >
//         Secure Checkout
//       </motion.h1>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Order Summary */}
//         <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <h3 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h3>
//           <div className="space-y-4">
//             {items.map((item) => (
//               <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
//                 <div>
//                   <p className="font-medium text-gray-700">{item.name}</p>
//                   <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                 </div>
//                 <p className="font-medium text-gray-900">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 pt-4 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-900">Total:</span>
//               <span className="text-xl font-bold text-pink-600">${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   autoComplete="tel"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
//                   City
//                 </label>
//                 <input
//                   id="city"
//                   name="city"
//                   type="text"
//                   autoComplete="address-level2"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
//                 Country
//               </label>
//               <input
//                 id="country"
//                 name="country"
//                 type="text"
//                 autoComplete="country-name"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
//                 value={formData.country}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//                 Shipping Address
//               </label>
//               <textarea
//                 id="address"
//                 name="address"
//                 rows={3}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
//                 value={formData.address}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <fieldset>
//                 <legend className="text-sm font-medium text-gray-700 mb-3">
//                   Payment Method
//                 </legend>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {['Cash on Delivery', 'Credit Card', 'Bank Transfer', 'EasyPaisa / JazzCash'].map((method) => (
//                     <label
//                       key={method}
//                       className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
//                         formData.paymentMethod === method
//                           ? 'border-pink-500 bg-pink-50'
//                           : 'border-gray-200 hover:border-pink-300'
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value={method}
//                         checked={formData.paymentMethod === method}
//                         onChange={handleChange}
//                         className="h-4 w-4 text-pink-600 focus:ring-pink-500"
//                       />
//                       <span className="ml-3 text-sm font-medium text-gray-700">{method}</span>
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   <span>Processing Payment...</span>
//                 </div>
//               ) : (
//                 'Confirm & Pay Now'
//               )}
//             </button>
//           </form>

//           {response && (
//             <div
//               className={`mt-6 p-4 rounded-lg ${
//                 response.startsWith('success:')
//                   ? 'bg-green-50 text-green-800'
//                   : 'bg-red-50 text-red-800'
//               }`}
//             >
//               {response.split(':')[1]}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }