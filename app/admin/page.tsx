"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const isStaff = localStorage.getItem("is_staff");

        // Validate admin access
        if (!token || isStaff !== "true") {
            router.push("/"); // Redirect non-admins to landing page
        } else {
            setIsLoading(false); // Allow rendering for admins
        }
    }, [router]);

    if (isLoading) {
        return <div className="text-center text-xl font-semibold p-6">Loading...</div>;
    }

    return (
        <section className="relative w-full h-screen flex items-center justify-center">
            {/* Background Image */}
            <img
                src="https://miro.medium.com/v2/resize:fit:5120/1*42ebJizcUtZBNIZPmmMZ5Q.jpeg"
                alt="Bookshelf Background"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
            />

            {/* Overlay for Buttons */}
            <div className="relative z-10 flex  items-center space-x-4">
                <button
                    onClick={() => router.push("/admin/manage-books")}
                    className="w-64 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    Manage Books
                </button>
                <button
                    onClick={() => router.push("/admin/manage-reviews")}
                    className="w-64 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-700 transition duration-300"
                >
                    Manage Reviews
                </button>
            </div>
        </section>
    );
}
