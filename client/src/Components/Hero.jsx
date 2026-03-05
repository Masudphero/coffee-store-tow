import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 min-h-[80vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Coffee Image */}
      <img
        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
        alt="Coffee"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Light Overlay instead of black */}
      <div className="absolute inset-0 bg-white bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-900 drop-shadow-lg mb-6">
          Discover the Best Coffee ☕
        </h1>

        <p className="text-lg md:text-xl text-yellow-800 mb-8 leading-relaxed">
          Freshly brewed happiness in every cup.  
          Explore our premium coffee collection and enjoy the perfect taste crafted for coffee lovers.
        </p>

        <Link to="/addcoffee">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-transform text-lg">
            Add Coffee
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;