import React, {useContext, useEffect, useState} from 'react'

import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Authcontext } from '../contects/AuthProvider';


const myBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const {user} = useContext(Authcontext);
    

    useEffect(() => {
        fetch("https://mern-backend-qvrj.onrender.com/all-clientbooks").then(res => res.json()).then(data => setAllBooks(data))
    },[])


    //delete books
    const handleDelete = (id) =>{
        console.log(id);
        fetch(`https://mern-backend-qvrj.onrender.com/clientbook/${id}`,{
            method:"DELETE",
        }).then(res => res.json()).then(data => {
            alert("Book is deleted Successfully")
            //setAllBooks(data);
        })
    }


     

    



    return(
        <div className='mt-28 px-4 lg:px-24 py-6'>
             <h2 className='text-5xl font-bold text-center'>My Bookshelves</h2>

              
          {/* table for book data*/}

              <Table className='lg:w-[1200px]  my-12 '>
        <Table.Head>
        <Table.HeadCell>No.</Table.HeadCell>
        <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>User</Table.HeadCell>
          
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
            allBooks.map((book, index) => <Table.Body className="divide-y" key={book._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                 {index+1}
            </Table.Cell>
            <Table.Cell><img src={book.imageURL} alt="" width="60px"/></Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {book.bookTitle}
            </Table.Cell>
            <Table.Cell>{book.authorName}</Table.Cell>
            <Table.Cell>{book.category}</Table.Cell>
            <Table.Cell>{book.user}</Table.Cell>
            
            <Table.Cell>
              
              <button onClick={() => handleDelete(book._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm 
              hover:bg-sky-600'>Remove</button>
            </Table.Cell>
          </Table.Row>
            </Table.Body>)
        }
       
      </Table>

      

        </div>
    )
}

export default myBooks