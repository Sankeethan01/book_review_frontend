"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/api";
import Image from "next/image";
import SecondaryNavbar from "@/components/SecondaryNavbar";

export default function Books() {
  const [books, setBooks] = useState([]); // State to store books
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const router = useRouter();

  // Check for token and fetch books
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      const fetchBooks = async () => {
        try {
          const response = await API.get("/books/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books:", error);
          if (error.response?.status === 401) {
            alert("Session expired. Please log in again.");
            router.push("/login");
          }
        }
      };
      fetchBooks();
    }
  }, [router]);

  // Filter books based on search query
  const filteredBooks = books.filter((book: any) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SecondaryNavbar />
      <div className="p-6">
        {/* Heading & Search Bar in One Row */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl text-blue-900 font-bold font-poppins">Books</h1>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
          />
        </div>

        {/* Book List */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book: any) => (
              <div
                key={book.id}
                className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/books/${book.id}`)}
              >
                {book.cover_image && (
                  <div className="relative w-full h-60">
                    <Image
                      src={book.cover_image}
                      alt={book.title}
                      layout="fill"
                      objectFit="cover"
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
        ) : (
          <p className="text-center text-xl text-gray-700 mt-6">No such book found</p>
        )}
      </div>
    </>
  );
}
