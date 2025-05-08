"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
    <Navbar/>
      <Head>
        <title>About Us - Makeup Brand</title>
        <meta name="description" content="Learn about our makeup brand, mission, team, and products" />
      </Head>

      {/* Hero Section */}
      <section className="hero bg-cover bg-center relative h-full w-full" style={{ backgroundImage: "url('https://www.shopaholic.com.pk/cdn/shop/collections/image_1_9580e371-fb78-48d0-85a1-4ef74a396f23.png?v=1738310256&width=1800')" }}>
        <div className="absolute inset-0 bg-black opacity-50 "></div>
        <div className="relative z-10 text-center text-white py-32">
          <h1 className="text-5xl font-bold mt-20">Discover Your Perfect Beauty</h1>
          <p className="text-xl mt-4">Luxury Makeup Products for Every Skin Tone</p>
         <Link href={"/ProductPage"}> <button className="mt-8 bg-pink-700 hover:bg-pink-900 text-white px-6 py-3 rounded-lg">Shop Now</button></Link>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center ">
          <h2 className="text-4xl font-semibold">Our Story</h2>
          <p className="mt-4 text-lg">Our journey started with a passion for beauty and the belief that everyone deserves to feel beautiful. We are committed to cruelty-free, high-quality makeup that empowers individuals to express themselves with confidence.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-pink-500">Our Mission</h2>
          <p className="mt-4 text-lg">To create makeup that celebrates diversity, sustainability, and inclusivity. Our products are formulated with the highest standards to deliver flawless results every time.</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold">Meet the Team</h2>
          <p className="mt-4 text-lg">The passionate team behind our brand, committed to bringing you the best in beauty.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <Image src="https://t3.ftcdn.net/jpg/01/42/01/84/360_F_142018449_yR0avsaJqbIx8NA47sINMoaxdtn1sPzh.jpg" alt="Team Member 1" width={200} height={200} className="rounded-full mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
              <p className="text-lg">Founder & CEO</p>
            </div>
            <div>
              <Image src="https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg" alt="Team Member 2" width={200} height={200} className="rounded-full mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">Jane Smith</h3>
              <p className="text-lg">Lead Makeup Artist</p>
            </div>
            <div>
              <Image src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740" alt="Team Member 3" width={200} height={200} className="rounded-full mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">Emily Johnson</h3>
              <p className="text-lg">Creative Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold">Our Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          <div className="product-card">
  <Image
    src="https://www.shopaholic.com.pk/cdn/shop/files/makeuprevolution-skin-silk-serum-foundation-f0.5-shopaholic-2.jpg?v=1726059071&width=360"
    alt="Product 1"
    width={300}
    height={300}
    className="rounded-lg"
  />
  <h3 className="mt-4 text-xl font-semibold">Flawless Foundation</h3>
  <p className="text-lg">$40.00</p>
</div>

<div className="product-card">
  <Image
    src="https://www.shopaholic.com.pk/cdn/shop/files/FLOWER-GARDEN-LIPSTICK-NO-02.jpg?v=1733921494&width=360"
    alt="Product 2"
    width={300}
    height={300}
    className="rounded-lg"
  />
  <h3 className="mt-4 text-xl font-semibold">Luxury Lipstick</h3>
  <p className="text-lg">$25.00</p>
</div>

<div className="product-card">
  <Image
    src="https://www.shopaholic.com.pk/cdn/shop/files/Savage-Coral.jpg?v=1699600379&width=360"
    alt="Product 3"
    width={300}
    height={300}
    className="rounded-lg"
  />
  <h3 className="mt-4 text-xl font-semibold">Perfect Blush</h3>
  <p className="text-lg">$30.00</p>
</div>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Makeup Brand. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
