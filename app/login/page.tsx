"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import API from "@/utils/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setIsLoggedIn } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await API.post("/token/", { username, password });
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("is_staff", response.data.is_staff ? "true" : "false"); 
            setIsLoggedIn(true);

            if (response.data.is_staff) {
                router.push("/admin");
            } else {
                router.push("/books");
            }
        } catch (error: any) {
            setMessage(error.response?.data?.detail || "Invalid username or password");
        }
    };

    return (
        <div className="flex flex-col items-center  h-screen bg-gray-100 px-6 py-6 pt-24">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                {/* Title */}
                <h1 className="text-3xl font-bold text-primary text-center mb-4">
                    Login
                </h1>
                
                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-900 transition duration-300"
                    >
                        Login
                    </button>
                </form>
    
                {/* Error Message */}
                {message && (
                    <p className="mt-4 text-red-600 text-center font-semibold">{message}</p>
                )}
    
                {/* Register Link */}
                <p className="mt-6 text-gray-700 text-center">
                    Don't have an account?{" "}
                    <span
                        onClick={() => router.push("/register")}
                        className="text-primary font-bold cursor-pointer hover:underline"
                    >
                        Register Now
                    </span>
                </p>
            </div>
        </div>
    );
    
}
