"use client";

import { useState } from "react";
import API from "@/utils/api";
import SecondaryNavbar from "@/components/SecondaryNavbar";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await API.post("/register/", {
                username,
                email,
                password,
            });
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <>
        <SecondaryNavbar />
        <div className="flex flex-col items-center  h-screen bg-gray-100 px-6 py-6 pt-24">
            {/* Card Container */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">
                    Create an Account
                </h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Username Field */}
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    
                    {/* Email Field */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    {/* Password Field */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Register Button */}
                    <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-900 transition">
                        Register
                    </button>
                </form>

                {/* Success/Error Message */}
                {message && (
                    <p className="mt-4 text-center text-red-600 font-medium">
                        {message}
                    </p>
                )}

                {/* Login Redirect */}
                <p className="mt-6 text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
        </>
    );
}
