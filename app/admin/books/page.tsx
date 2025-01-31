"use client";

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import API from "@/utils/api";
import Sidebar from "@/components/Sidebar";
import Adminlayout from "@/components/layouts/Adminlayout";

export default function ManageBooks() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);  
    const [isOpen, setIsOpen] = useState(true);

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
                        className="bg-yellow-500 text-white px-4 py-2 font-bold rounded-md shadow-md hover:bg-yellow-600 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-600 text-white px-4 py-2 font-bold rounded-md shadow-md hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <Adminlayout>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        
        <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-60" : "ml-20"} p-6`}>
            <h1 className="text-4xl text-center font-bold mb-4 text-primary">Manage Books</h1>
            
            <div className="flex justify-end mb-3">
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
        </Adminlayout>
    );
}
