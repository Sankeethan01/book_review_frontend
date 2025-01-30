"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/api";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Books() {
  const [books, setBooks] = useState([]); // State to store books
  const router = useRouter();

  // Check for token and fetch books
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Redirect to login if no token is found
      router.push("/login");
    } else {
      // Fetch books from the backend
      const fetchBooks = async () => {
        try {
          const response = await API.get("/books/", {
            headers: {
              Authorization: `Bearer ${token}`, // Add token in Authorization header
            },
          });
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books:", error);
          if (error.response?.status === 401) {
            alert("Session expired. Please log in again.");
            router.push("/login"); // Redirect to login on 401
          }
        }
      };

      fetchBooks();
    }
  }, [router]);

  return (
    <>
    
    
    <div className="p-6">
      <h1 className="text-4xl text-center text-blue-900 font-bold text- mb-6">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book: any) => (
          <div
            key={book.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/books/${book.id}`)} // Redirect to book page
          >
            {book.cover_image && (
              <div className="relative w-full h-60"> {/* Set a consistent height */}
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  layout="fill" // Ensures the image fills the container
                  objectFit="cover" // Maintains aspect ratio and crops if needed
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="font-bold text-gray-700">Author: {book.author}</p>
              <p className="font-bold text-gray-600">Genre: {book.genre}</p>
              <p className="text-gray-500 mt-2">
                {book.description.slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
