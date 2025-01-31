"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import API from "@/utils/api";
import AdminNavbar from "@/components/AdminNavbar";

export default function ManageReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Refresh the access token if expired
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            router.push("/login"); // Redirect to login if no refresh token
            return null;
        }

        try {
            const response = await API.post("/token/refresh/", { refresh: refreshToken });
            const newAccessToken = response.data.access;
            localStorage.setItem("access_token", newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            router.push("/login"); // Redirect to login if refresh fails
            return null;
        }
    };

    // Fetch all reviews
    const fetchReviews = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/login"); // Redirect if no token
            return;
        }

        try {
            const response = await API.get("/reviews/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(response.data);
            setLoading(false);
        } catch (error: any) {
            if (error.response?.status === 401 && error.response?.data?.code === "token_not_valid") {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    fetchReviews(); // Retry fetching reviews with new token
                }
            } else {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Handle deleting a review
    const handleDeleteReview = async (reviewId: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this review?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/login"); // Redirect if no token
            return;
        }

        try {
            await API.delete(`/reviews/${reviewId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(reviews.filter((review) => review.id !== reviewId)); // Remove review from state
        } catch (error: any) {
            if (error.response?.status === 401 && error.response?.data?.code === "token_not_valid") {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    handleDeleteReview(reviewId); // Retry deletion with new token
                }
            } else {
                console.error("Error deleting review:", error);
            }
        }
    };

    // Define columns for the data table
    const columns = [
        {
            name: "Book Title",
            selector: (row: any) => row.book?.title || "No Title",
            sortable: true,
        },
        {
            name: "Reviewer",
            selector: (row: any) => row.user || "Unknown",
            sortable: true,
        },
        {
            name: "Rating",
            selector: (row: any) => row.rating || "N/A",
            sortable: true,
            style: {
                maxWidth: "80px",
                textAlign: "center",
            },
        },
        {
            name: "Review",
            selector: (row: any) => row.comment || "No Comment",
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <button
                    onClick={() => handleDeleteReview(row.id)}
                    className="bg-red-600 text-white px-3 py-3 rounded-md shadow-md hover:bg-red-700 transition"
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <>
        <AdminNavbar />
        <div className={`flex-1 transition-all duration-300 p-6`}>
            <h1 className="text-4xl text-center font-bold mb-6 text-primary">Manage Reviews</h1>
            <p className="text-center text-primary mb-6">Here you can moderate or delete user reviews.</p>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <DataTable
                    columns={columns}
                    data={reviews}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    responsive
                    customStyles={{
                        headCells: {
                            style: {
                                fontSize: '1.2rem',
                                backgroundColor: '#131044',
                                color: 'white',
                                padding: '12px',
                            },
                        },
                        rows: {
                            style: {
                                fontSize: '1rem',
                                padding: '10px',
                                backgroundColor: '#f9fafb',
                                borderBottom: '2px solid #e5e7eb',
                            },
                        },
                    }}
                />
            </div>
        </div>
        </>
    );
}
