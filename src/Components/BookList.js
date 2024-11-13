import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';

const BookList = () => {
    const [books, setBooks] = useState([]); // State to store the list of books

    // Function to fetch the books from the server
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books'); // Use the full API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data); // Set the books data to state
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // useEffect to fetch books on mount and set interval for refresh
    useEffect(() => {
        fetchBooks(); // Initial fetch on component mount

        const interval = setInterval(() => {
            fetchBooks(); // Refresh every 2 seconds
        }, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once when the component mounts

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the book');
            }

            // Update the state by filtering out the deleted book
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error); // Handle any errors during deletion
        }
    };

    return (
        <Container>
            <h2 className="my-4">Book List</h2> {/* Added margin for spacing */}
            <ListGroup>
                {books.map((book) => (
                    <ListGroup.Item
                        key={book.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>{book.title}</strong> - {book.author}
                        </div>
                        <div className="ms-auto">
                            <Link to={`/view/${book.id}`} className="btn btn-primary btn-sm me-2">
                                View
                            </Link>
                            <Link to={`/edit/${book.id}`} className="btn btn-secondary btn-sm me-2">
                                Edit
                            </Link>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(book.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default BookList;
