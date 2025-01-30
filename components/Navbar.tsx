"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md w-full fixed-top-0 left-0 z-50 ">
      {/* Top Row: Logo | Title | Login/Register */}
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/book_review_logo.jpg" alt="Book Review Logo" width={80} height={80} />
        </div>

        {/* Centered Title & Subtitle */}
        <div className="text-center flex flex-col items-center">
          <h1 className="text-6xl font-bold text-primary">TBD READS</h1>
          <p className="text-md text-primary mt-1">
            Discover, share, and review your favorite books.
          </p>
        </div>

        {/* Login/Register Buttons */}
        <div className="flex flex-col space-y-1">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-3 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="px-3 py-3 mt-2 text-white bg-primary rounded-lg hover:bg-blue-900 w-20">
                  Login
                </button>
              </Link>
              
              {/* <Link href="/register">
                <button className="px-3 py-1 mt-2 text-white bg-blue-900 rounded-lg hover:bg-gray-700 w-20">
                  Register
                </button>
              </Link> */}
            </>
          )}
        </div>
      </div>

      <hr className="border-t-2 border-black my-2" />

      {/* Second Row: Navigation & Search */}
      <div className="bg-white shadow-md w-full py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Navigation Links */}
          <nav className="flex space-x-4">
            <Link href="/">
              <button className="px-3 py-2 text-white bg-primary rounded-lg hover:bg-blue-900">
                Home
              </button>
            </Link>
            <Link href="/books">
              <button className="px-3 py-2 text-white bg-primary rounded-lg hover:bg-blue-900">
                Books
              </button>
            </Link>
            <Link href="/about">
              <button className="px-3 py-2 text-white bg-primary rounded-lg hover:bg-blue-900">
                About
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-3 py-2 text-white bg-primary rounded-lg hover:bg-blue-900">
                Contact
              </button>
            </Link>
          </nav>

          {/* <div className="flex items-center border border-gray-800 px-4 py-2 rounded-lg w-72 bg-white shadow-md focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-300">
            <FaSearch className="text-gray-500 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Search Here..."
              className="focus:outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
            />
          </div> */}
        </div>
      </div>
    </header>
  );
}
