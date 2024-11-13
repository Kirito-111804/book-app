import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header'; // Adjusted path to Header
import { BsCaretLeftFill } from 'react-icons/bs'; // Import the icon

const ViewBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
                if (!response.ok) {
                    throw new Error('Book not found');
                }
                const data = await response.json();
                setBook(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return (
            <div>
                <Header />
                <p className="text-center text-warning">Loading book details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <p className="text-center text-danger">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Header /> {/* Header at the top */}
            <div className="container my-5 " >
                <div className="mb-3">
                <h2 className="text-left text-warning mb-4">View Book</h2>
                    <BsCaretLeftFill
                        style={{ fontSize: '3rem', marginLeft: '40px', cursor: 'pointer' }}
                        onClick={() => navigate(-1)}
                    />
                </div>
                <h2 className="text-center text-warning mb-4">{book.title}</h2>
                <div className="bg-light p-4 rounded shadow-sm" >
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Published Year:</strong> {book.published_year}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewBook;
