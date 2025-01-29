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
        setIsLoggedIn(false); // Update global state
        router.push("/");
    };

    return (
        <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link href="/">Book Review</Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link href="/books" className="hover:underline">
                        Books
                    </Link>
                    <Link href="/about" className="hover:underline">
                        About
                    </Link>
                    <Link href="/contact" className="hover:underline">
                        Contact
                    </Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link href="/login">
                            <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
