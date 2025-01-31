"use client";

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import API from "@/utils/api";
import AdminNavbar from "@/components/AdminNavbar";

export default function ManageBooks() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await API.get("/books/");
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    const handleSaveBook = async (e) => {
        e.preventDefault();
    
        // Get the JWT access token from localStorage
        const token = localStorage.getItem("access_token");
    
        if (!token) {
            alert("You need to be logged in to perform this action.");
            return;
        }
    
        try {
            if (editingBook) {
                // Update book if editing
                const response = await API.put(`/books/${editingBook.id}/`, {
                    title,
                    author,
                    genre,
                    description,
                    cover_image: coverImage,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,  // ✅ Include JWT token
                        "Content-Type": "application/json",
                    },
                });
    
                const updatedBooks = books.map((book) =>
                    book.id === editingBook.id ? response.data : book
                );
                setBooks(updatedBooks);
                setEditingBook(null);
            } else {
                // Add new book
                const response = await API.post("/books/", {
                    title,
                    author,
                    genre,
                    description,
                    cover_image: coverImage,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,  // ✅ Include JWT token
                        "Content-Type": "application/json",
                    },
                });
    
                setBooks([...books, response.data]);
            }
            setIsModalOpen(false);
            setTitle(""), setAuthor(""), setGenre(""), setDescription(""), setCoverImage("");
        } catch (error) {
            console.error("❌ Error saving book:", error.response?.data || error.message);
            alert("Error: " + (error.response?.data?.detail || "Could not save book."));
        }
    };
    

    const handleEdit = (book) => {
        setEditingBook(book);
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setDescription(book.description);
        setCoverImage(book.cover_image);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return; // If user cancels, do nothing
    
        // Get JWT token from localStorage
        const token = localStorage.getItem("access_token");
    
        if (!token) {
            alert("You need to be logged in to delete books.");
            return;
        }
    
        try {
            await API.delete(`/books/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,  // ✅ Include JWT token
                },
            });
    
            setBooks(books.filter((book) => book.id !== id));
            alert("Book deleted successfully!");
        } catch (error) {
            console.error("❌ Error deleting book:", error.response?.data || error.message);
            alert("Error: " + (error.response?.data?.detail || "Could not delete book."));
        }
    };

    const columns = [
        { name: "Title", selector: (row) => row.title, sortable: true, width: "250px" },
        { name: "Author", selector: (row) => row.author, sortable: true, width: "250px" },
        { name: "Genre", selector: (row) => row.genre, width: "300px" },
        { name: "Description", selector: (row) => row.description, width: "460px" },
        {
            name: "Actions",
            width: "200px",
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="bg-yellow-500 text-white px-4 py-2 text-sm font-bold rounded-md shadow-md hover:bg-yellow-600 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-600 text-white px-4 py-2 text-sm font-bold rounded-md shadow-md hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <AdminNavbar />
            <div className="p-6">
                <h1 className="text-4xl text-center font-bold mb-6 text-primary">Manage Books</h1>
                
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        + Add Book
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <DataTable
                        columns={columns}
                        data={books}
                        pagination
                        highlightOnHover
                        customStyles={{
                            headCells: {
                                style: {
                                    fontSize: "1rem",
                                    backgroundColor: "#131044",
                                    color: "white",
                                    padding: "10px",
                                    textAlign: "center",
                                },
                            },
                            rows: {
                                style: {
                                    fontSize: "0.9rem",
                                    padding: "8px",
                                    backgroundColor: "#f9fafb",
                                    borderBottom: "1px solid #e5e7eb",
                                    textAlign: "center",
                                },
                            },
                        }}
                    />
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-2xl font-semibold mb-4 text-primary">
                                {editingBook ? "Edit Book" : "Add New Book"}
                            </h2>
                            <form onSubmit={handleSaveBook} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full px-4 py-2 font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="w-full px-4 py-2 font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Cover Image URL"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    className="w-full px-4 py-2 font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition"
                                    >
                                        Cancel
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
