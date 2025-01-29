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
            const response = await API.post("/token/", {
                username,
                password,
            });
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("is_staff", response.data.is_staff ? "true" : "false"); // Ensure string storage
            setIsLoggedIn(true); // Update global state

            if (response.data.is_staff) {
                router.push("/admin"); // Redirect admin to admin page
            } else {
                router.push("/books"); // Redirect non-admins to home page
            }
        } catch (error: any) {
            setMessage(error.response?.data?.detail || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Username"
                    className="block w-full px-4 py-2 mb-4 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block w-full px-4 py-2 mb-4 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}

            {/* Register Link */}
            <p className="mt-6 text-gray-600">
                Don't have an account?{" "}
                <span
                    onClick={() => router.push("/register")}
                    className="text-blue-600 cursor-pointer hover:underline"
                >
                    Click to register
                </span>
            </p>
        </div>
    );
}
