"use client";

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import API from "@/utils/api";

export default function ManageBooks() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);  // For editing

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
        try {
            if (editingBook) {
                // Update book if editing
                const response = await API.put(`/books/${editingBook.id}/`, {
                    title,
                    author,
                    genre,
                    description,
                    cover_image: coverImage,
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
                });
                setBooks([...books, response.data]);
            }
            setIsModalOpen(false);
            setTitle(""), setAuthor(""), setGenre(""), setDescription(""), setCoverImage("");
        } catch (error) {
            console.error("Error saving book:", error);
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
        try {
            await API.delete(`/books/${id}/`);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const columns = [
        { name: "Title", selector: (row) => row.title, sortable: true },
        { name: "Author", selector: (row) => row.author, sortable: true },
        { name: "Genre", selector: (row) => row.genre },
        { name: "Description", selector: (row) => row.description },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="bg-yellow-500 text-white px-3 py-3 font-bold rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-600 text-white px-3 py-13 font-bold rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-4xl text-center font-bold mb-6">Manage Books</h1>
            
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Book
                </button>
            </div>

            <DataTable
                columns={columns}
                data={books}
                pagination
                highlightOnHover
                customStyles={{
                    headCells: {
                        style: {
                            fontSize: '1.5rem',
                        },
                    },
                }}
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-semibold mb-4">
                            {editingBook ? "Edit Book" : "Add New Book"}
                        </h2>
                        <form onSubmit={handleSaveBook}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Cover Image URL"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
