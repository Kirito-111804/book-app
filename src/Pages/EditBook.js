import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCaretLeftFill } from "react-icons/bs";
import Header from '../Components/Header';

const EditBook = ({ books, onUpdate }) => {
    const { id } = useParams();
    const book = books.find((book) => book.id === parseInt(id));
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setPublishedYear(book.published_year);
            setGenre(book.genre);
            setDescription(book.description);
        }
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBook = {
            ...book,
            title,
            author,
            published_year: parseInt(publishedYear, 10),
            genre,
            description,
        };

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update book');
            }

            const data = await response.json();
            onUpdate(id, data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    if (!book) {
        return (
            <div>
                <Header />
                <p className="text-center text-danger">Book not found!</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <h2 className="text-left text-warning mb-4">Edit Book</h2>
                <BsCaretLeftFill
                    style={{ fontSize: '3rem', marginLeft: '40px', cursor: 'pointer' }}
                    className='mb-3'
                    onClick={handleBackClick}
                />

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="p-4 rounded shadow-lg" style={{ backgroundColor: '#F8E71C', color: '#000' }}>
                    <form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="title" className="form-label text-light">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="form-control bg-dark text-light border-secondary"
                                    
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="author" className="form-label text-light">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required
                                    className="form-control bg-dark text-light border-secondary"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="publishedYear" className="form-label text-light">Published Year</label>
                                <input
                                    type="number"
                                    id="publishedYear"
                                    value={publishedYear}
                                    onChange={(e) => setPublishedYear(e.target.value)}
                                    required
                                    className="form-control bg-dark text-light border-secondary"
                                    min="1000"
                                    max={new Date().getFullYear()}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="genre" className="form-label text-light">Genre</label>
                                <input
                                    type="text"
                                    id="genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    required
                                    className="form-control bg-dark text-light border-secondary"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label text-light">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="form-control bg-dark text-light border-secondary"
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-warning btn-lg"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Book'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBook;
