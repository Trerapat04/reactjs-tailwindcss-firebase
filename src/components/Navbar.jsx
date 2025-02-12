import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext"; 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useUserAuth(); //  ดึง user และ logOut

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-indigo-500 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Welcome</div>

        {/* Toggle Menu */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <Link to="/" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
              Home
            </Link>
          </li>

          {/* ถ้ามี user แสดงอีเมลและปุ่ม Logout */}
          {user ? (
            <>
              <li className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
                {/*  Avatar Icon */}
                <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
                  {user.email.charAt(0).toUpperCase()} {/* ใช้ตัวแรกของอีเมล */}
                </span>

                {/*  อีเมลผู้ใช้ */}
                <span className="text-indigo-100 font-semibold">{user.email}</span>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-indigo-600 mt-2 p-4 space-y-4 rounded-lg shadow-lg">
          <li>
            <Link to="/" className="block text-white font-bold py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-800">
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg shadow-md">
                {/*  Avatar Icon */}
                <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </span>

                {/*  อีเมลผู้ใช้ */}
                <span className="text-indigo-100 font-semibold">{user.email}</span>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="block text-white font-bold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-700">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="block text-white font-bold py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-700">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
