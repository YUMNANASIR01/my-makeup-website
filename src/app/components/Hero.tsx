import Link from "next/link"

function Hero() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[560px] bg-gray-800 text-white">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://www.makeupcityshop.com/cdn/shop/files/Lamel-Desktop_91a7ddef-377f-41ab-aa72-2b66d42c175b.gif?v=1745831720)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="absolute inset-0 z-10 flex justify-between items-center container mx-auto py-8 sm:py-12 md:py-16 px-4">
          <div className="text-center w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-10 mt-4 sm:mt-6 md:mt-10">
              Discover Your Perfect Beauty
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8">
              Shop the latest trends in beauty and skincare products
            </p>
            <Link href="/ProductPage">
              <button className="bg-pink-800 hover:bg-pink-900 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-base sm:text-lg">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
