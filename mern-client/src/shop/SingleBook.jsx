import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import React, {useContext, useEffect, useState } from 'react'
import BookCards from '../components/BookCards'
import { Card } from 'flowbite-react';
import { Button,  Label, TextInput } from 'flowbite-react';
import { Authcontext } from '../contects/AuthProvider';



const SingleBook = () => {
    const {_id, bookTitle, imageURL,authorName, bookDescription, category, bookPDFURL, price } = useLoaderData();
    const [books,setBooks] = useState([]);
    const {user} = useContext(Authcontext);
    const navigate = useNavigate();
    

    useEffect ( () => {
        fetch("https://mern-backend-qvrj.onrender.com/all-books").then(res => res.json()).then(data => setBooks(data))
    }, [])

    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Mistery",
        "Programming",
        "Science Fiction",
        "Fantasy",
        "Horror",
        "Bibliography",
        "Autobiographic",
        "Historical",
        "Self-help",
        "Memoir",
        "Business",
        "Children Books",
        "Travel",
        "Religion",
        "Art and Desgin"
    ]

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0])

    const handleChangeSelectedValue = (event) => {
        console.log(event.target.value);
        setSelectedBookCategory(event.target.value);
    }



   //handle book submission
   const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    const price = form.price.value;
    const user = form.user.value;

    


    const bookObj = {
          bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price,user  
    }

    console.log(bookObj)

    //send data to a database

    fetch("https://mern-backend-qvrj.onrender.com/upload-clientbooks", {
     method:"POST",
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
       //console.log(data)
       alert("Book uploaded successfully!!!")
       navigate('/mybooks')
       form.reset();
    })
}

    


    return(
        <div>
        <div className='mt-15 px-4 lg:px-24  my-20 flex flex-col md:flex-row justify-between items-center gap-7'>
        <div className='md:w-1/3'>
               <img src={imageURL} alt="" className='rounded md:w-12/12' />
        </div>

        <div className='md:w-2/3 space-x-6 space-y-6' >
                  <h2 className='text-5xl font-bold my-2 md:w-3/4 leading-snug'>{bookTitle} <br/> <span className='text-blue-700'>{authorName}</span></h2>
                  <h3 className='text-3xl font-bold my-2 md:w-3/4 leading-snug'>{category}</h3>
                  <p className='mb-10 text-lg md:w-5/6 '>{bookDescription}</p>
                
                 
                  <form onSubmit={handleBookSubmit} >
            {/* first row*/}
            <div className='flex gap-8' style={{display:'none'}}>
              <div className='lg:w-1/2'>
                  <div className="mb-2 block">
                      <Label htmlFor="bookTitle" value="Book Title" />
                  </div>
                     <TextInput id="bookTitle"  name='bookTitle' type="text"  value={bookTitle} required />
             </div>


             {/* authorName */}
             <div className='lg:w-1/2'style={{display:'none'}}>
                  <div className="mb-2 block">
                     <Label htmlFor="authorName" value="Author Name" />
                  </div>
                     <TextInput id="authorName"  name='authorName' type="text"  value={authorName} required />
             </div>
             </div>


            {/* 2nd row*/}
             <div className='flex gap-8' style={{display:'none'}}>
              <div className='lg:w-1/2'>
                  <div className="mb-2 block">
                     <Label htmlFor="imageURL" value="Book Image URL" />
                  </div>
                     <TextInput id="imageURL"  name='imageURL' type="text" value={imageURL} required />
             </div>


             {/* category */}
             <div className='lg:w-1/2' style={{display:'none'}}>
             <div className="mb-2 block">
                     <Label htmlFor="inputState" value="Book Category" />
                  </div>
                  <TextInput id="inputState"  name='categoryName' type="text" value={category} required />             </div>
             </div>



            {/* bookDescription*/}
             <div style={{display:'none'}}>
                <div className="mb-2 block" >
                    <Label htmlFor="bookDescription" value="Book Description" />
                </div>
                <TextInput id="bookDescription" name="bookDescription" value={bookDescription} required/>
             </div>



            {/* bookPDFURL*/}
              <div style={{display:'none'}}>
                <div className="mb-2 block">
                    <Label htmlFor="bookPDFURL" value="Book PDF URL" />
              </div>
                    <TextInput id="bookPDFURL" type="text" name="bookPDFURL" value={bookPDFURL} required />
              </div>
          
               {/* price */}
              <div style={{display:'none'}}>
                <div className="mb-2 block">
                    <Label htmlFor="price" value="price" />
              </div>
                    <TextInput id="price" type="number" name="price" value={price} required />
              </div>

              <div style={{display:'none'}}>
                <div className="mb-2 block">
                
              </div>
                    <TextInput id="user" type="text" name="price" value= {
            user?.email ||"Demo User"
          }  required />
              </div>




              <Button type="submit" className='mt-5 font-semiboldbg-blue-700 text-white font-semibold px-7 py-4 rounded
                  hover:bg-black transition-all duration-300'>Want to read</Button>



        </form>

        



        




                 
        </div>
  </div>

       <hr/>
       <div>
            <BookCards books={books} headline="Other Books"/>
        </div>
  </div>
    


        
    )
}

export default SingleBook