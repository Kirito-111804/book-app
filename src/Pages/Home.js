// src/Pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header'; // Adjusted path to Header

const Home = ({ books = [], setBooks }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setBooks]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
          alert('Book deleted successfully!');
        } else {
          alert('Failed to delete the book');
        }
      } catch (error) {
        alert('An error occurred while deleting the book');
      }
    }
  };

  const onView = (id) => {
    navigate(`/view/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <Header /> {/* Header at the top */}
      <div className="container-fluid home-container">
        <h1 className="page-title">Home</h1>
        <div className="add-book-button">
          <Link to="/add">
            <button style={{ marginLeft: '40px' }} className="btn btn-primary mb-3">
              Add Book
            </button>
          </Link>
        </div>

        {/* Add Book List header here */}
        <h3 className="text-center my-4">Book List</h3>

        {loading ? (
          <p className="text-center text-primary">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-danger">No books available. Please add some books.</p>
        ) : (
          <BookList books={books} onView={onView} onEdit={onEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

const BookList = ({ books, onView, onEdit, onDelete }) => (
  <div className="book-list">
    {books.map((book) => (
      <div key={book.id} className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title text-warning">{book.title}</h5>
              <p className="card-text text-muted">{book.author}</p>
            </div>
            <div>
              <button onClick={() => onView(book.id)} className="btn btn-warning mx-2">
                View
              </button>
              <button onClick={() => onEdit(book.id)} className="btn btn-warning mx-2">
                Edit
              </button>
              <button onClick={() => onDelete(book.id)} className="btn btn-danger mx-2">
                Delete
              </button>
            </div>
          </div>
          <p className="card-text text-white">{book.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Home;
