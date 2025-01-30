"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import API from "@/utils/api";
import Image from "next/image";

export default function BookPage() {
    const [book, setBook] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState(""); // Submission message
    const router = useRouter();
    const params = useParams();

    // Refresh token function
    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refresh_token");
    
            console.log("🔄 Attempting to refresh token using refresh_token:", refreshToken);
    
            if (!refreshToken) {
                console.error("🚨 No refresh token found. Redirecting to login...");
                router.push("/login");
                return null;
            }
    
            const response = await API.post("/token/refresh/", { refresh: refreshToken });
    
            console.log("✅ Token refresh successful. New Access Token:", response.data.access);
    
            const newAccessToken = response.data.access;
            localStorage.setItem("access_token", newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("❌ Error refreshing token:", error.response?.data || error.message);
            router.push("/login"); // Redirect to login if refresh fails
            return null;
        }
    };
    
    

    // Fetch book details and reviews
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookResponse = await API.get(`/books/${params.id}/`);
                setBook(bookResponse.data);

                const reviewsResponse = await API.get(`/books/${params.id}/reviews/`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [params.id]);

    // Submit a new review
    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
    
        let token = localStorage.getItem("access_token");
    
        // ✅ If token is missing, try refreshing
        if (!token) {
            console.log("⚠️ Token missing, trying refresh...");
            token = await refreshAccessToken();
            if (!token) {
                alert("Session expired. Please log in again.");
                router.push("/login");
                return;
            }
        }
    
        console.log("📤 Sending request with Token:", token);
    
        try {
            const response = await API.post(
                "/reviews/",
                {
                    book: params.id, // ✅ Do NOT send 'user' manually
                    rating,
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Send token properly
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log("✅ Review Submitted Successfully:", response.data);
            setReviews([...reviews, response.data]); // Update state
            setRating(0);
            setComment("");
            setMessage("Review submitted successfully!");
        } catch (error: any) {
            console.error("❌ Error submitting review:", error);
    
            if (error.response) {
                console.error("🔍 Full error response:", error.response.data);
                console.error("🔍 Status:", error.response.status);
    
                // ✅ If 401 Unauthorized, refresh token and retry
                if (error.response.status === 401) {
                    console.log("⚠️ Token expired, attempting refresh...");
                    token = await refreshAccessToken();
    
                    if (token) {
                        console.log("🔄 Retrying request with new token...");
                        return handleSubmitReview(e); // Retry submission
                    } else {
                        alert("Session expired. Please log in again.");
                        router.push("/login");
                    }
                }
            }
        }
    };
    
    
    
    
       

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            {/* Book Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="relative w-full h-96">
                    <Image
                        src={book.cover_image || "/placeholder.png"}
                        alt={book.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
                    <p className="text-xl text-gray-700 mb-2">Author: {book.author}</p>
                    <p className="text-lg text-gray-600 mb-2">Genre: {book.genre}</p>
                    <p className="text-gray-500">{book.description}</p>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b py-4">
                            <p className="text-lg font-semibold">Rating: {review.rating}/5</p>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Write a Review Section */}
            <div>
                <h2 className="text-3xl font-bold mb-4">Write a Review</h2>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Rating</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="block w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="block w-full px-4 py-2 border rounded"
                            rows={4}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                </form>
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </div>
        </div>
    );
}
