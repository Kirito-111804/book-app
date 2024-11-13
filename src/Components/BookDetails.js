import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null); // Store book data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch the book data based on the ID from the URL
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data = await response.json();
                setBook(data); // Set the book data in state
            } catch (error) {
                setError(error.message); // Set error state if fetch fails
            } finally {
                setLoading(false); // Set loading to false once the fetch is done
            }
        };

        fetchBook(); // Call the fetch function when the component mounts
    }, [id]); // The effect depends on the book ID

    if (loading) {
        return <p>Loading...</p>; // Show loading message while fetching
    }

    if (error) {
        return <p>Error: {error}</p>; // Show error message if fetch fails
    }

    return book ? (
        <div>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Description:</strong> {book.description}</p>
        </div>
    ) : (
        <p>Book not found</p> // Show if the book is not found in the database
    );
};

export default BookDetails;
