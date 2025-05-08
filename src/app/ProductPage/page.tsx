
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Image from 'next/image'; // Import Image from next/image

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}


const categories = {
  makeup: {
    lipsticks: [
      { 
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=matte_liquid_lipstick1', 
        name: 'Jwellery and Earrings', 
        description: 'Long-lasting matte finish with rich color payoff Long-lasting matte finish with rich color payoff Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
        price: 1499.99
      },
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGGwJYv_PXuviVLPjwDxxRqgGyVshbqSgh-g0gHNhkjzCdKfGFA84uO36bl2Oat0bbThQ&usqp=CAU',
        name: 'Hydrating Lip Gloss kit - 3 pcs', 
        description: 'Non-sticky formula with vitamin E for hydration and shine lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/pL6Asc.8809598456242_360x.jpg?v=1742539722',
        name: 'Cosrx',
        description: 'Rich and smooth texture with a soft finish for long-lasting wear lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/BeautyOfJoseon-GlowDeepSerumRice_Alpha-Arbutin-30ml_83e22904-3e91-4798-a620-f28e2e0a2bf8_360x.jpg?v=1742540939',
        name: 'Beauty of Joseon - Glow Serum',
        description: 'High-shine finish with a moisturizing effect for a plump look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99 
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/pLNLXJ.8809981339206_360x.jpg?v=1742539592',
        name: 'Medicube - Glow Booster Serum',
        description: 'Smooth and creamy texture with intense color payoff lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/Sheglam---Color-Bloom-Matte-Liquid-Blush---Risky-Business-2_360x.jpg?v=1696337286',
        name: 'Sheglam - Color Bloom Matte Liquid Blush',
        description: 'Bold and vibrant red for every occasion - perfect for a romantic night out lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=pink_satin_lipstick1',
        name: 'Golden Heals ',
        description: 'Satin finish with soft pink hues for a natural look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=berry_lipstick1',
        name: 'Classic Clothes',
        description: 'Deep berry shade for a chic look on any occasion lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=nude_lipstick1',
        name: 'Perfume with a Twist',
        description: 'Perfect nude shade for a natural look suitable for all skin tones lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/lips_b37022e6-ad31-4a48-aa80-1b6a055871fb.jpg?v=1728994768',
        name: 'Matte Red Lipstick',
        description: 'Bold matte red with high color payoff for a pop of color lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      }
    ],
    foundations: [
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=hydrating_foundation1',
        name: 'Nude Natural Lipstick',
        description: 'Lightweight with natural dewy finish for a fresh look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/face_571aebfb-d5bf-4d34-b705-8769db745e33.jpg?v=1728994768',
        name: 'Longwear Foundation',
        description: 'Lasts all day, no touch-ups needed for a flawless look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=silicone_based_foundation1',
        name: 'Glassy Black',
        description: 'Smooth, long-lasting matte finish for a polished look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/13315_360x.jpg?v=1745218267',
        name: 'Powder Foundation',
        description: 'Matte finish with buildable coverage for a natural look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      }
    ],
    mascaras: [
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=volume_mascara1',
        name: 'Red Heels',
        description: 'Clump-free volumizing formula for a dramatic look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/Makeup_Palettes.jpg?v=1728995050',
        name: 'Revolution',
        description: 'Provides long, fluttery lashes for a voluminous look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/eyes_e72a904d-ab8e-408c-ba2b-0741108fce96.jpg?v=1728994768',
        name: 'Waterproof Mascara',
        description: 'Resistant to water and smudging for all-day wear lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/products/Kryolan---TV-Paint-Stick---FS-45_360x.jpg?v=1693554805',
        name: 'Kryolan',
        description: 'Adds dramatic volume to lashes for a bold look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/810134211445_0897c5a9-2006-40e0-b670-467915456cc0_360x.jpg?v=1741584528',
        name: 'Lamel',
        description: 'Provides extreme length to lashes for a dramatic look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 1499.99
      }
    ]
  },
  skincare: {
    cleansers: [
      {
        image: 'https://moogoousa.com/cdn/shop/files/MG-Face-Web-FoamCleanser-3_405x.jpg?v=1722472737',
        name: 'Gentle Foam Cleanser',
        description: 'pH-balanced daily cleanser lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 15.99
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/Masks_6e7d2fa3-7dce-470b-a444-f36e149315d3.jpg?v=1729154651',
        name: 'Deep Cleanser',
        description: 'Deep cleansing for impurities lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 17.99
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/Toners_8c647679-0102-4316-8772-c4587f77f6ed.jpg?v=1729154651',
        name: 'Toner Cleanser',
        description: 'Detoxifying and purifying cleanser lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 14.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/products/aveeno---baby-barrier-cream---100ml_360x.jpg?v=1669375509',
        name: 'Salicylic Acid Cleanser',
        description: 'For acne-prone skin lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 16.99
      }
    ],
  
    moisturizers: [
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=hyaluronic_acid_moisturizer1',
        name: 'Hyaluronic Acid Moisturizer',
        description: '72-hour hydration boost lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 25.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/pLNuXm.8809738316993_360x.jpg?v=1742539757',
        name: 'Beauty Of Joseon',
        description: 'Brightens and evens skin tone lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 23.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/8809634610959_a98b837d-de6f-4e6d-a5a3-ed8097609b03_360x.jpg?v=1742540036',
        name: 'AXIS-Y',
        description: 'Fights signs of aging and wrinkles lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 27.99
      },
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/8809640733659_cc5d2ded-dd06-40a1-afd0-0c471a0709d3_360x.jpg?v=1742540125',
        name: 'Aloe Vera Moisturizer',
        description: 'Soothes and hydrates skin lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 22.99
      }
    ]
  },

  jewelry: {
    rings: [
      {
        image: 'https://www.makeupcityshop.com/cdn/shop/files/17227_668172ba-a7ca-4c2b-aa4c-d2292245ce28_360x.jpg?v=1719397845',
        name: 'ST London',
        description: '925 silver adjustable ring lorem ipsum dolor sit amet...',
        price: 5500
      },
      {
        image: 'data:image/jpeg;base64,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',
        name: 'Diamond Ring',
        description: 'Elegant and sparkling design lorem ipsum dolor sit amet...',
        price: 15500
      },
      {
        image: 'https://ringconcierge.com/cdn/shop/collections/RingConcierge_Web_CollectionHero_Rings_grande.jpg?v=1722543868',
        name: 'Rose Gold Ring',
        description: 'A delicate rose gold design lorem ipsum dolor sit amet...',
        price: 7200
      },
      {
        image: 'https://images.meesho.com/images/products/405279385/wf8tx_512.webp',
        name: 'Emerald necklace',
        description: 'Classic design with emerald stone lorem ipsum dolor sit amet...',
        price: 8700
      }
    ],
    necklaces: [
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=choker_necklace1',
        name: 'Choker Necklace',
        description: '18k gold plated chain lorem ipsum dolor sit amet...',
        price: 4300
      },
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=pearl_necklace1',
        name: 'Pearl Necklace',
        description: 'Classic and timeless design lotem ipsum dolor sit amet...',
        price: 5100
      },
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=statement_necklace1',
        name: 'Statement Necklace',
        description: 'Bold and eye-catching design lorem ipsum dolor sit amet...',
        price: 6200
      },
      {
        image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=gold_chain_necklace1',
        name: 'Cheeta Glasses',
        description: 'Elegant and sophisticated gold chain lorem ipsum dolor sit amet...',
        price: 3900
      }
    ]
  },
  
  earrings: [
    {
      image: 'https://img.drz.lazcdn.com/static/pk/p/23b4e39743a8a2a89f53386dfd05c7ec.jpg_720x720q80.jpg',
      name: 'Stud Earrings',
      description: 'Simple and elegant lorem stud earrings lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 799
    },
    {
      image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=dangle_earrings1',
      name: 'Dangle Watch',
      description: 'Long, elegant dangling earrings lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 1299
    },
    {
      image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=hoop_earrings1',
      name: 'Hoodi Black',
      description: 'Stylish and modern hoops Hoodie lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 999
    },
    {
      image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=silver_hoop_earrings1',
      name: 'Silver Hoop Heal',
      description: 'Stylish and modern silver hoops and heels lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 1499
    },
    {
      image: 'https://www.makeupcityshop.com/cdn/shop/files/8101342169382_1_360x.jpg?v=1741333750',
      name: 'Lamel',
      description: 'Lamel 3D Brow Gel - Clear long-lasting brow gel with a natural finish. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 699
    }
  ]
  } 


export default function Products() {
  // Generate all products from categories dynamically
  const [products] = useState<Product[]>(() => {
    const allProducts = Object.values(categories)
      .flatMap((category) => Object.values(category).flat());
    return allProducts.map((product, index) => ({
      id: index + 1,
      name: product.name,
      price: parseFloat((Math.random() * 100 + 20).toFixed(2)), // Random price for now
      image: product.image,
      description: product.description,
    }));
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-white ">
            Our Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out">
                <div className="aspect-square overflow-hidden rounded-t-xl relative">
                  {/* Replace <img> with <Image /> from next/image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400} // Define width of the image
                    height={400} // Define height of the image
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                  <p className="text-lg font-medium text-emerald-600 mb-4">{product.price}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <Link
                      href={{
                        pathname: `/product-details`,
                        query: {
                          id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          description: product.description,
                        },
                      }}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

















// // src\app\ProductPage\page.tsx
// "use client"; 

// import { useState } from 'react';
// import Link from 'next/link';
// import { Navbar } from '../components/Navbar';
// import { Footer } from '../components/Footer';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }

// const categories = {
//   makeup: {
//     lipsticks: [
//       { 
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=matte_liquid_lipstick1', 
//         name: 'Jwellery and Earrings', 
//         description: 'Long-lasting matte finish with rich color payoff Long-lasting matte finish with rich color payoff Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
//         price: 1499.99
//       },
//       {
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGGwJYv_PXuviVLPjwDxxRqgGyVshbqSgh-g0gHNhkjzCdKfGFA84uO36bl2Oat0bbThQ&usqp=CAU',
//         name: 'Hydrating Lip Gloss kit - 3 pcs', 
//         description: 'Non-sticky formula with vitamin E for hydration and shine lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/pL6Asc.8809598456242_360x.jpg?v=1742539722',
//         name: 'Cosrx',
//         description: 'Rich and smooth texture with a soft finish for long-lasting wear lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/BeautyOfJoseon-GlowDeepSerumRice_Alpha-Arbutin-30ml_83e22904-3e91-4798-a620-f28e2e0a2bf8_360x.jpg?v=1742540939',
//         name: 'Beauty of Joseon - Glow Serum',
//         description: 'High-shine finish with a moisturizing effect for a plump look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99 
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/pLNLXJ.8809981339206_360x.jpg?v=1742539592',
//         name: 'Medicube - Glow Booster Serum',
//         description: 'Smooth and creamy texture with intense color payoff lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/Sheglam---Color-Bloom-Matte-Liquid-Blush---Risky-Business-2_360x.jpg?v=1696337286',
//         name: 'Sheglam - Color Bloom Matte Liquid Blush',
//         description: 'Bold and vibrant red for every occasion - perfect for a romantic night out lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=pink_satin_lipstick1',
//         name: 'Golden Heals ',
//         description: 'Satin finish with soft pink hues for a natural look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=berry_lipstick1',
//         name: 'Classic Clothes',
//         description: 'Deep berry shade for a chic look on any occasion lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=nude_lipstick1',
//         name: 'Perfume with a Twist',
//         description: 'Perfect nude shade for a natural look suitable for all skin tones lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/lips_b37022e6-ad31-4a48-aa80-1b6a055871fb.jpg?v=1728994768',
//         name: 'Matte Red Lipstick',
//         description: 'Bold matte red with high color payoff for a pop of color lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       }
//     ],
//     foundations: [
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=hydrating_foundation1',
//         name: 'Nude Natural Lipstick',
//         description: 'Lightweight with natural dewy finish for a fresh look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/face_571aebfb-d5bf-4d34-b705-8769db745e33.jpg?v=1728994768',
//         name: 'Longwear Foundation',
//         description: 'Lasts all day, no touch-ups needed for a flawless look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=silicone_based_foundation1',
//         name: 'Glassy Black',
//         description: 'Smooth, long-lasting matte finish for a polished look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/13315_360x.jpg?v=1745218267',
//         name: 'Powder Foundation',
//         description: 'Matte finish with buildable coverage for a natural look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       }
//     ],
//     mascaras: [
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=volume_mascara1',
//         name: 'Red Heels',
//         description: 'Clump-free volumizing formula for a dramatic look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/Makeup_Palettes.jpg?v=1728995050',
//         name: 'Revolution',
//         description: 'Provides long, fluttery lashes for a voluminous look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/eyes_e72a904d-ab8e-408c-ba2b-0741108fce96.jpg?v=1728994768',
//         name: 'Waterproof Mascara',
//         description: 'Resistant to water and smudging for all-day wear lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/products/Kryolan---TV-Paint-Stick---FS-45_360x.jpg?v=1693554805',
//         name: 'Kryolan',
//         description: 'Adds dramatic volume to lashes for a bold look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/810134211445_0897c5a9-2006-40e0-b670-467915456cc0_360x.jpg?v=1741584528',
//         name: 'Lamel',
//         description: 'Provides extreme length to lashes for a dramatic look lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 1499.99
//       }
//     ]
//   },
//   skincare: {
//     cleansers: [
//       {
//         image: 'https://moogoousa.com/cdn/shop/files/MG-Face-Web-FoamCleanser-3_405x.jpg?v=1722472737',
//         name: 'Gentle Foam Cleanser',
//         description: 'pH-balanced daily cleanser lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 15.99
//       },
//       {
//         image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/Masks_6e7d2fa3-7dce-470b-a444-f36e149315d3.jpg?v=1729154651',
//         name: 'Deep Cleanser',
//         description: 'Deep cleansing for impurities lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 17.99
//       },
//       {
//         image: 'https://cdn.shopify.com/s/files/1/0561/4259/4241/files/Toners_8c647679-0102-4316-8772-c4587f77f6ed.jpg?v=1729154651',
//         name: 'Toner Cleanser',
//         description: 'Detoxifying and purifying cleanser lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 14.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/products/aveeno---baby-barrier-cream---100ml_360x.jpg?v=1669375509',
//         name: 'Salicylic Acid Cleanser',
//         description: 'For acne-prone skin lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 16.99
//       }
//     ],
  
//     moisturizers: [
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=hyaluronic_acid_moisturizer1',
//         name: 'Hyaluronic Acid Moisturizer',
//         description: '72-hour hydration boost lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 25.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/pLNuXm.8809738316993_360x.jpg?v=1742539757',
//         name: 'Beauty Of Joseon',
//         description: 'Brightens and evens skin tone lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 23.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/8809634610959_a98b837d-de6f-4e6d-a5a3-ed8097609b03_360x.jpg?v=1742540036',
//         name: 'AXIS-Y',
//         description: 'Fights signs of aging and wrinkles lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 27.99
//       },
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/8809640733659_cc5d2ded-dd06-40a1-afd0-0c471a0709d3_360x.jpg?v=1742540125',
//         name: 'Aloe Vera Moisturizer',
//         description: 'Soothes and hydrates skin lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         price: 22.99
//       }
//     ]
//   },

//   jewelry: {
//     rings: [
//       {
//         image: 'https://www.makeupcityshop.com/cdn/shop/files/17227_668172ba-a7ca-4c2b-aa4c-d2292245ce28_360x.jpg?v=1719397845',
//         name: 'ST London',
//         description: '925 silver adjustable ring lorem ipsum dolor sit amet...',
//         price: 5500
//       },
//       {
//         image: 'data:image/jpeg;base64,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',
//         name: 'Diamond Ring',
//         description: 'Elegant and sparkling design lorem ipsum dolor sit amet...',
//         price: 15500
//       },
//       {
//         image: 'https://ringconcierge.com/cdn/shop/collections/RingConcierge_Web_CollectionHero_Rings_grande.jpg?v=1722543868',
//         name: 'Rose Gold Ring',
//         description: 'A delicate rose gold design lorem ipsum dolor sit amet...',
//         price: 7200
//       },
//       {
//         image: 'https://images.meesho.com/images/products/405279385/wf8tx_512.webp',
//         name: 'Emerald necklace',
//         description: 'Classic design with emerald stone lorem ipsum dolor sit amet...',
//         price: 8700
//       }
//     ],
//     necklaces: [
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=choker_necklace1',
//         name: 'Choker Necklace',
//         description: '18k gold plated chain lorem ipsum dolor sit amet...',
//         price: 4300
//       },
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=pearl_necklace1',
//         name: 'Pearl Necklace',
//         description: 'Classic and timeless design lotem ipsum dolor sit amet...',
//         price: 5100
//       },
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=statement_necklace1',
//         name: 'Statement Necklace',
//         description: 'Bold and eye-catching design lorem ipsum dolor sit amet...',
//         price: 6200
//       },
//       {
//         image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=gold_chain_necklace1',
//         name: 'Cheeta Glasses',
//         description: 'Elegant and sophisticated gold chain lorem ipsum dolor sit amet...',
//         price: 3900
//       }
//     ]
//   },
  
//   earrings: [
//     {
//       image: 'https://img.drz.lazcdn.com/static/pk/p/23b4e39743a8a2a89f53386dfd05c7ec.jpg_720x720q80.jpg',
//       name: 'Stud Earrings',
//       description: 'Simple and elegant lorem stud earrings lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       price: 799
//     },
//     {
//       image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=dangle_earrings1',
//       name: 'Dangle Watch',
//       description: 'Long, elegant dangling earrings lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       price: 1299
//     },
//     {
//       image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=hoop_earrings1',
//       name: 'Hoodi Black',
//       description: 'Stylish and modern hoops Hoodie lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       price: 999
//     },
//     {
//       image: 'https://img.heroui.chat/image/fashion?w=400&h=400&u=silver_hoop_earrings1',
//       name: 'Silver Hoop Heal',
//       description: 'Stylish and modern silver hoops and heels lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       price: 1499
//     },
//     {
//       image: 'https://www.makeupcityshop.com/cdn/shop/files/8101342169382_1_360x.jpg?v=1741333750',
//       name: 'Lamel',
//       description: 'Lamel 3D Brow Gel - Clear long-lasting brow gel with a natural finish. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       price: 699
//     }
//   ]
//   } 


// export default function Products() {
//   // Generate all products from categories dynamically
//   const [products] = useState<Product[]>(() => {
//     const allProducts = Object.values(categories)
//       .flatMap((category) => Object.values(category).flat());
//     return allProducts.map((product, index) => ({
//       id: index + 1,
//       name: product.name,
//       price: parseFloat((Math.random() * 100 + 20).toFixed(2)), // Random price for now
//       image: product.image,
//       description: product.description,
//     }));
//   });

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-black py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-center mb-12 text-white ">
//           Our Products
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out">
//               <div className="aspect-square overflow-hidden rounded-t-xl relative">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
//                   }}
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
//                 <p className="text-lg font-medium text-emerald-600 mb-4">{product.price}</p>
//                 <div className="border-t border-gray-100 pt-4">
//                   <Link
//                     href={{
//                       pathname: `/product-details`,
//                       query: {
//                         id: product.id.toString(),
//                         name: product.name,
//                         price: product.price,
//                         image: product.image,
//                         description: product.description,
//                       },
//                     }}
//                     className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                   >
//                     View Details
//                     <svg
//                       className="w-4 h-4 ml-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 8l4 4m0 0l-4 4m4-4H3"
//                       />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// }











































































// // components/Products.tsx
// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

// export default function Products() {
//   const [products] = useState<Product[]>(() =>
//     Array.from({ length: 32 }, (_, index) => ({
//       id: index + 1,
//       name: `Product ${index + 1}`,
//       price: `$${(Math.random() * 100).toFixed(2)}`,
//       image: `https://picsum.photos/400/400?random=${index + 1}`,
//     }))
//   ); // Keep your existing product array

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
//           Makeup, Jewelry & Bags
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out"
//             >
//               <div className="aspect-square overflow-hidden rounded-t-xl relative">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105"
//                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                   placeholder="blur"
//                   blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.src = "https://placehold.co/400x400?text=No+Image";
//                   }}
//                 />
//               </div>

//               {/* Rest of your product card content remains the same */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
//                   {product.name}
//                 </h3>
//                 <p className="text-lg font-medium text-emerald-600 mb-4">
//                   {product.price}
//                 </p>
//                 <div className="border-t border-gray-100 pt-4">
//                   <Link
//                     href={`/products/${product.id}`}
//                     className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                   >
//                     View Details
//                     <svg
//                       className="w-4 h-4 ml-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 8l4 4m0 0l-4 4m4-4H3"
//                       />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// // src\app\ProductPage\page.tsx
// "use client"; 
// import { useState } from 'react';
// import Link from 'next/link';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

// export default function Products() {
//   const categories = {
//     jewelry: [
//       'Silver Pendant Necklace',
//       'Gold-plated Hoop Earrings',
//       'Stackable Gemstone Rings',
//       'Personalized Name Bracelet',
//       'Pearl Drop Earrings'
//     ],
//     bags: [
//       'Crossbody Leather Bag',
//       'Vegan Tote Bag',
//       'Designer Clutch Purse',
//       'Bucket Shoulder Bag',
//       'Mini Backpack Purse'
//     ],
//     makeup: [
//       'Matte Liquid Lipstick Set',
//       'Hydrating Face Primer',
//       'Contour Palette Kit',
//       'Mascara Volume Boost',
//       'Blending Brush Set'
//     ],
//     accessories: [
//       'Oversized Sunglasses',
//       'Silk Twilly Scarf',
//       'Wide Brim Fedora',
//       'Designer Belt',
//       'Cashmere Winter Gloves'
//     ],
//     skincare: [
//       'Vitamin C Serum',
//       'Hyaluronic Acid Moisturizer',
//       'Detox Clay Mask',
//       'SPF 50 Sunscreen',
//       'Night Repair Cream'
//     ]
//   };

//   const [products] = useState<Product[]>(() => {
//     const allNames = Object.values(categories).flat();
//     return Array.from({ length: 32 }, (_, index) => {
//       const categoryKeys = Object.keys(categories) as (keyof typeof categories)[];
//       const category = categoryKeys[index % categoryKeys.length];
//       const nameIndex = Math.floor(Math.random() * categories[category].length);
      
//       return {
//         id: index + 1,
//         name: categories[category][nameIndex],
//         price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
//         image: `https://picsum.photos/400/400?random=${index + 1}`,
//       }
//     });
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
//           Our Products
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out">
//               <div className="aspect-square overflow-hidden rounded-t-xl relative">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
//                 <p className="text-lg font-medium text-emerald-600 mb-4">{product.price}</p>
//                 <div className="border-t border-gray-100 pt-4">
//                   <Link
//                     href={`/products/${product.id}`}
//                     className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                   >
//                     View Details
//                     <svg
//                       className="w-4 h-4 ml-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 8l4 4m0 0l-4 4m4-4H3"
//                       />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



