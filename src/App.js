import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import AddBook from './Pages/AddBook';
import EditBook from './Pages/EditBook';
import ViewBook from './Pages/ViewBook';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Function to fetch books from the backend
  const fetchBooks = async () => {
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
    }
  };

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (bookData) => {
    try {
      // Add book to the backend
      const response = await fetch('http://127.0.0.1:8000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const newBook = await response.json();
        const updatedBooks = [...books, newBook];
        setBooks(updatedBooks);
        navigate('/');
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (id, updatedData) => {
    try {
      // Update book in the backend
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedBooks = books.map((book) =>
          book.id === parseInt(id) ? updatedData : book
        );
        setBooks(updatedBooks);
        navigate('/');
      } else {
        console.error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home books={books} setBooks={setBooks} fetchBooks={fetchBooks} />} />
      <Route path="/add" element={<AddBook onAdd={handleAddBook} />} />
      <Route path="/edit/:id" element={<EditBook books={books} onUpdate={handleUpdateBook} />} />
      <Route path="/view/:id" element={<ViewBook books={books} />} />
    </Routes>
  );
};

export default App;
