import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Coffee Store ☕</h2>
          <p className="text-gray-300">
            Discover the best coffee from around the world.
            Fresh taste, premium quality, and the perfect aroma
            for every coffee lover.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-300">

            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/addcoffee" className="hover:text-yellow-400 transition">
                Add Coffee
              </Link>
            </li>

            <li>
              <Link to="/updatecoffee" className="hover:text-yellow-400 transition">
                Update Coffee
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <p className="text-gray-300">Email: coffee@store.com</p>
          <p className="text-gray-300">Phone: +880 123 456 789</p>
          <p className="text-gray-300">Location: Bangladesh</p>

          {/* Social */}
          <div className="flex gap-4 mt-4">

            <a className="hover:text-yellow-400 cursor-pointer">🌐</a>
            <a className="hover:text-yellow-400 cursor-pointer">📘</a>
            <a className="hover:text-yellow-400 cursor-pointer">📸</a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-600 text-center py-4 text-gray-400">
        © {new Date().getFullYear()} Coffee Store. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;