"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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
    <header className="bg-white shadow-md w-full fixed-top-0 left-0 z-50">
      {/* Top Row: Logo | Title | Login/Register */}
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/book_review_logo.jpg" alt="Book Review Logo" width={110} height={80} />
        </div>

        {/* Centered Title & Subtitle */}
        <div className="text-center flex flex-col items-center">
          <h1 className="text-7xl font-bold text-primary font-agbalumo">TBD READS</h1>
          <p className="text-xl text-primary mt-1 font-bold font-alegreya">
            Discover, share, and review your favorite books.
          </p>
        </div>

        {/* Login/Register Buttons */}
        <div className="flex flex-col space-y-1">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-3 mt-2 text-white bg-primary rounded-lg hover:bg-blue-900 w-20">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <hr className="border-t-2 border-black" />
    </header>
  );
}
