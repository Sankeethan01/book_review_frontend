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
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
            <div className="space-y-4">
                <a
                    href="/admin/books"
                    className="block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Manage Books
                </a>
                <a
                    href="/admin/reviews"
                    className="block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Manage Reviews
                </a>
            </div>
        </div>
    );
}
