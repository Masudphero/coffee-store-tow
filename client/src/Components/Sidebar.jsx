import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between bg-black text-white p-4">
        <h1 className="text-xl font-bold text-green-400">Coffee Admin</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-black text-gray-200 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-green-400">Coffee Panel</h1>
        </div>

        {/* Menu */}
        <ul className="p-4 space-y-3">
          <li>
            <a
              href="/"
              className="block p-3 rounded-lg hover:bg-green-500 hover:text-black transition"
            >
              Dashboard
            </a>
          </li>

          <li>
            <a
              href="/addCoffee"
              className="block p-3 rounded-lg hover:bg-green-500 hover:text-black transition"
            >
              Add Coffee
            </a>
          </li>

          <li>
            <a
              href="/coffees"
              className="block p-3 rounded-lg hover:bg-green-500 hover:text-black transition"
            >
              All Coffees
            </a>
          </li>

          <li>
            <a
              href="/users"
              className="block p-3 rounded-lg hover:bg-green-500 hover:text-black transition"
            >
              Users
            </a>
          </li>

          <li>
            <a
              href="/settings"
              className="block p-3 rounded-lg hover:bg-green-500 hover:text-black transition"
            >
              Settings
            </a>
          </li>
        </ul>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 text-center text-sm text-gray-400">
          © 2026 Coffee Store
        </div>
      </div>
    </>
  );
}

export default Sidebar;