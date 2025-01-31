"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import API from "@/utils/api";
import Image from "next/image";
import SecondaryNavbar from "@/components/SecondaryNavbar";

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
    return <div className="text-center text-lg p-6 font-semibold">Loading...</div>;
  }

  return (
    <>
      <SecondaryNavbar />
      <div className="p-6 max-w-6xl mx-auto">
        {/* Book Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10 items-center">
          {/* Book Cover Image */}
          <div className="relative w-full flex justify-center">
            <Image
              src={book.cover_image || "/placeholder.png"}
              alt={book.title}
              width={400} // Adjust width for better display
              height={550} // Maintain aspect ratio
              className="rounded-lg shadow-md object-contain"
            />
          </div>

          {/* Book Information */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4 text-primary">{book.title}</h1>

            <p className="text-xl font-semibold text-gray-700 mb-2">
              <span className="text-black">Author:</span> {book.author}
            </p>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              <span className="text-black">Genre:</span> {book.genre}
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">{book.description}</p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white px-6 py-3 mt-6 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Add Review
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <h2 className="text-center text-3xl font-bold text-primary mb-6">Reviews</h2>

          {/* If No Reviews */}
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">No reviews yet. Be the first to review this book!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border p-6 rounded-lg shadow-md bg-white">
                  {/* Display Star Rating */}
                  <p className="text-lg font-semibold flex items-center mb-2">
                    Rating:{" "}
                    <span className="text-yellow-500 ml-2">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                  </p>
                  <p className="text-gray-600 italic">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Adding Review */}
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
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
