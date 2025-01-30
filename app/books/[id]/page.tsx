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
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const router = useRouter();
    const params = useParams();

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
        if (!token) {
            alert("Session expired. Please log in again.");
            router.push("/login");
            return;
        }

        const reviewData = {
            book: params.id,
            rating,
            comment,
        };

        try {
            const response = await API.post("/reviews/", reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setReviews([...reviews, response.data]);
            setRating(0);
            setComment("");
            setMessage("Review submitted successfully!");
            setIsModalOpen(false); // Close modal after submission
        } catch (error: any) {
            console.error("Error submitting review:", error);
            if (error.response?.status === 401) {
                alert("Your session has expired. Please log in again.");
                router.push("/login");
            }
        }
    };

    if (!book) {
        return <div className="text-center text-lg p-6">Loading...</div>;
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
                <div className="bg-gray-50 py-16 px-4">
                    <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
    
                    {/* Author & Genre with Different Colors */}
                    <p className="text-xl font-bold text-black-800 mb-2">
                        Author: <span className="text-gery">{book.author}</span>
                    </p>
                    <p className="text-lg font-bold text-black mb-2">
                        Genre: <span className="text-grey">{book.genre}</span>
                    </p>

                    <p className="text-gray-500 mt-3">{book.description}</p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white px-4 py-2 mt-6 rounded hover:bg-blue-700 transition duration-300">
                        Add Review
                    </button>
                </div>

                
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
                {/* <h2 className="text-3xl font-bold mb-4">Reviews</h2> */}

                {/* Add Review Button */}
                

                {/* Modal for Review Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
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
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Reviews List */}
                    {reviews.length === 0 ? (
                        <p className="text-primary mt-4">No reviews yet. Be the first to review this book!</p>
                    ) : (
                        <div className="mt-6 space-y-4">
                            <p className="font-bold text-primary text-3xl">Reviews</p>
                            {reviews.map((review) => (
                                <div key={review.id} className="border p-4 rounded-lg shadow">
                                    {/* Display Star Rating */}
                                    <p className="text-lg font-semibold flex items-center">
                                        Rating: 
                                        <span className="text-yellow-500 ml-2">
                                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                        </span>
                                    </p>
                                    <p className="text-gray-600">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}

            </div>
        </div>
    );
}
