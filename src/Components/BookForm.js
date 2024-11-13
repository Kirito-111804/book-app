import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define validation schema using yup
const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    genre: yup.string().required('Genre is required'),
});

const BookForm = ({ onSubmit, initialData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData || {}
    });

    // Function to handle form submission
    const onFormSubmit = async (data) => {
        try {
            // Perform a fetch request to submit the form data to the server
            const response = await fetch('http://127.0.0.1:8000/api/books', {
                method: 'POST', // Assuming you're adding a new book
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the form data as a JSON object
            });

            if (!response.ok) {
                throw new Error('Failed to submit the book');
            }

            const result = await response.json();
            onSubmit(result); // Call the parent component's onSubmit with the response data

            alert('Book added successfully!'); // You can add more feedback logic here
        } catch (error) {
            console.error(error);
            alert('There was an error submitting the form.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
                <label>Title</label>
                <input {...register("title")} />
                {errors.title && <p>{errors.title.message}</p>}
            </div>
            <div>
                <label>Author</label>
                <input {...register("author")} />
                {errors.author && <p>{errors.author.message}</p>}
            </div>
            <div>
                <label>Genre</label>
                <input {...register("genre")} />
                {errors.genre && <p>{errors.genre.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookForm;
