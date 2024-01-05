import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Authcontext } from '../contects/AuthProvider';
import StarRatings from 'react-star-ratings';

const MyBooks = () => {
  const [userBooks, setUserBooks] = useState([]);
  const { user } = useContext(Authcontext);

  

  useEffect(() => {
    if (user && user.email) {
      fetch("https://mern-backend-qvrj.onrender.com/all-clientbooks")
        .then(res => res.json())
        .then(data => {
          // Filter books based on the logged-in user's email
          const booksForCurrentUser = data.filter(book => book.user === user.email);
          setUserBooks(booksForCurrentUser);
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [user?.email]);



//review


const handleReviewSubmit = async (bookId, rating, comment) => {
  try {
    const response = await fetch('https://mern-backend-qvrj.onrender.com/upload-clientbooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        userId: user?.email || '',
        rating,
        comment,
      }),
    });

    if (response.ok) {
      console.log('Review submitted successfully!');
      // You might want to update the UI to reflect the new review
      alert('Review submitted successfully!');
    } else {
      console.error('Failed to submit review');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};








  // delete books
  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://mern-backend-qvrj.onrender.com/clientbook/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        alert("Book is deleted Successfully");
        // Refresh the user's books after deletion
        setUserBooks(books => books.filter(book => book._id !== id));
      })
      .catch(error => console.error("Error deleting book:", error));
  };

  return (
    <div className='mt-28 px-4 lg:px-24 py-6'>
      <h2 className='text-5xl font-bold text-center'>My Bookshelves</h2>
 
      {/* table for book data*/}
      <Table className='lg:w-[1200px]  my-12 '>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell style={{ textAlign: 'center' }}>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell style={{ textAlign: 'center' }}>Reviews</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {userBooks.map((book, index) => (
          <Table.Body className="divide-y" key={book._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell><img src={book.imageURL} alt="" width="60px" /></Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.bookTitle}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>
              <ReviewForm
                  bookId={book._id}
                  onSubmit={(rating, comment) => handleReviewSubmit(book._id, rating, comment)}
                />
                              </Table.Cell>

              <Table.Cell>
                <button onClick={() => handleDelete(book._id)} className='bg-red-600 px-6 py-2 font-semibold text-white rounded-sm 
              hover:bg-sky-600'>Remove</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>


      
    </div>
  );
};

const ReviewForm = ({ bookId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          changeRating={handleRatingChange}
          numberOfStars={5}
          name='rating'
        />
      </div>
      <div>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          rows="4"
          cols="50"
          placeholder="Write your review..."
        />
      </div>
      <button type="submit" className='bg-sky-600 px-6 py-2 font-semibold text-white rounded-sm 
              hover:bg-sky-800'>Share</button>
    </form>
  );
};

export default MyBooks;
