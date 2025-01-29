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
    const [editingBookId, setEditingBookId] = useState<number | null>(null);

    // Fetch books from the backend
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

    const isValidURL = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Handle adding or editing a book
    const handleSaveBook = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the cover image URL
        if (coverImage && !isValidURL(coverImage)) {
            console.error("Invalid cover image URL");
            alert("Please enter a valid URL for the cover image.");
            return;
        }

        try {
            if (editingBookId) {
                // Edit book
                const response = await API.put(`/books/${editingBookId}/`, {
                    title,
                    author,
                    genre,
                    description,
                    cover_image: coverImage,
                });
                setBooks(books.map((book) => (book.id === editingBookId ? response.data : book)));
                setEditingBookId(null); // Exit editing mode
            } else {
                // Add book
                const response = await API.post("/books/", {
                    title,
                    author,
                    genre,
                    description,
                    cover_image: coverImage,
                });
                setBooks([...books, response.data]); // Update the books list
            }
            // Clear form
            setTitle("");
            setAuthor("");
            setGenre("");
            setDescription("");
            setCoverImage("");
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    // Handle deleting a book
    const handleDeleteBook = async (id: number) => {
        try {
            await API.delete(`/books/${id}/`);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    // Handle editing a book
    const handleEditBook = (book: any) => {
        setEditingBookId(book.id);
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setDescription(book.description);
        setCoverImage(book.cover_image || "");
    };

    // Define columns for the data table
    const columns = [
        {
            name: "Title",
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: "Author",
            selector: (row: any) => row.author,
            sortable: true,
        },
        {
            name: "Genre",
            selector: (row: any) => row.genre,
        },
        {
            name: "Description",
            selector: (row: any) => row.description,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditBook(row)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteBook(row.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">Manage Books</h1>

            {/* Add/Edit Book Form */}
            <form onSubmit={handleSaveBook} className="mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full px-4 py-2 mb-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="block w-full px-4 py-2 mb-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="block w-full px-4 py-2 mb-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full px-4 py-2 mb-2 border rounded"
                ></textarea>
                <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="block w-full px-4 py-2 mb-4 border rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {editingBookId ? "Update Book" : "Add Book"}
                </button>
            </form>

            {/* Books Data Table */}
            <DataTable columns={columns} data={books} pagination highlightOnHover />
        </div>
    );
}
