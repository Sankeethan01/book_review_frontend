"use client";

import { useState } from "react";
import API from "@/utils/api";

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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <form onSubmit={handleRegister} className="w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Username"
                    className="block w-full px-4 py-2 mb-4 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="block w-full px-4 py-2 mb-4 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block w-full px-4 py-2 mb-4 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Register
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
