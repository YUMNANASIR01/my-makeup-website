

// "use client"

// import Link from 'next/link';
// import { ShoppingCart, Heart, Search } from "lucide-react"; // Added Search icon
// import { Button } from "@/components/ui/button";
// import { useState } from "react"; // For managing search query
// import { useRouter } from "next/navigation"; // Importing useRouter from next/navigation to handle routing
// import { useTheme } from "next-themes";

// export function Navbar() {



//   return (
//     <nav className="bg-pink-900 text-white p-4 sticky top-0 z-50">
//       <div className="container flex items-center justify-between h-8">

//         {/* Left section with logo and main navigation */}
//         <div className="flex items-center gap-6">
//           <ul className="flex space-x-10 ml-120 justify-center text-lg font-semibold">
//             <li><Link href="/">Home</Link></li>
//             <li><Link href="/ProductPage">Products</Link></li>
//             <li><Link href="/About">About</Link></li>
//             <li><Link href="/Contact">Contact</Link></li>
//           </ul>
//         </div>
//         <div />

//         {/* Right section with icons and theme toggle */}
//         <div className="flex items-center gap-4">

//           {/* Wishlist Icon */}
//           <Link href={'/WishlistPage'}>
//             <Button variant="ghost" size="icon">
//               <Heart className="h-5 w-5" />
//               <span className="sr-only">Wishlist</span>
//             </Button>
//           </Link>

//           {/* Cart Icon */}
//           <Link href={'/CartPage'}>
//             <Button variant="ghost" size="icon">
//               <ShoppingCart className="h-5 w-5" />
//               <span className="sr-only">Cart</span>
//             </Button>
//           </Link>

//           {/* Search Form */}
//           <form  className="flex items-center">

//             <Button variant="ghost" size="icon" type="submit">
//               <Search className="h-5 w-5" /> {/* Search Icon */}
//             </Button>
//           </form>

//         </div>
//       </div>
//     </nav>
//   );
// }



"use client"

import type React from "react"

import Link from "next/link"
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react" // Added Menu and X icons
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react" // Added useEffect

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Mobile menu state

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to toggle search modal
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    // Close mobile menu when search is opened
    if (!isSearchOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Close search when mobile menu is opened
    if (!isMobileMenuOpen) {
      setIsSearchOpen(false)
    }
  }

  // Handle input change and fetch suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setQuery(input)

    // Simulate fetching suggestions (replace with real data if needed)
    const allSuggestions = ["Product 1", "Product 2", "Product 3", "Product 4"]
    const filteredSuggestions = allSuggestions.filter((item) => item.toLowerCase().includes(input.toLowerCase()))
    setSuggestions(filteredSuggestions)
  }

  // Add search term to history
  const handleSearchSubmit = () => {
    if (query && !searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory.slice(0, 4)])
    }
  }

  // Navigation links component to avoid duplication
  const NavLinks = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
    <ul className={className}>
      <li>
        <Link href="/" onClick={onClick}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/ProductPage" onClick={onClick}>
          Products
        </Link>
      </li>
      <li>
        <Link href="/About" onClick={onClick}>
          About
        </Link>
      </li>
      <li>
        <Link href="/Contact" onClick={onClick}>
          Contact
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className="bg-pink-900 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-auto">
        {/* Mobile menu button - only visible on small screens */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="mr-2">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>

        {/* Desktop navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <NavLinks className="flex space-x-10 justify-center text-lg font-semibold" />
        </div>

        {/* Right section with icons - always visible */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wishlist Icon */}
          <Link href={"/WishlistPage"}>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>

          {/* Cart Icon */}
          <Link href={"/CartPage"}>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* Search Icon */}
          <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu - slides in from top when open */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-pink-800 py-4 px-2 mt-2 rounded-lg">
          <NavLinks
            className="flex flex-col space-y-4 text-lg font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Search Modal - responsive width */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-white p-4">
          <div className="bg-black p-4 sm:p-8 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-white max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Search</h2>
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={handleInputChange}
              className="p-2 w-full border rounded-lg mb-4 text-black"
            />

            {/* Display search suggestions */}
            {suggestions.length > 0 && (
              <ul className="bg-gray-700 rounded-md max-h-40 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="p-2 hover:bg-gray-600 cursor-pointer">
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

            {/* Display search history */}
            {searchHistory.length > 0 && !suggestions.length && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Recent Searches</h3>
                <ul className="bg-gray-700 rounded-md max-h-40 overflow-auto">
                  {searchHistory.map((term, index) => (
                    <li key={index} className="p-2 hover:bg-gray-600 cursor-pointer">
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <Button variant="outline" onClick={handleSearchSubmit} className="mt-4 w-full bg-black">
              Search
            </Button>

            <Button variant="outline" onClick={handleSearchToggle} className="mt-2 w-full bg-black">
              Close
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
