import React, {useState} from 'react'

import { Button,  Label, TextInput, Select, Textarea } from 'flowbite-react';


const UploadBook = () => {
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
           const price = form.bookPDFURL.price;
           const amazonURL = form.amazonURL.price;


           const bookObj = {
                 bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price, amazonURL
           }

           console.log(bookObj)

           //send data to a database

           fetch("https://mern-backend-qvrj.onrender.com/upload-book", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookObj)
           }).then(res => res.json()).then(data => {
              //console.log(data)
              alert("Book uploaded successfully!!!")
              form.reset();
           })
    }

    
    return(
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>


         <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
            {/* first row*/}
              <div className='flex gap-8'>
              <div className='lg:w-1/2'>
                  <div className="mb-2 block">
                     <Label htmlFor="bookTitle" value="Book Title" />
                  </div>
                     <TextInput id="bookTitle"  name='bookTitle' type="text" placeholder="Book Name" required />
             </div>


             {/* authorName */}
             <div className='lg:w-1/2'>
                  <div className="mb-2 block">
                     <Label htmlFor="authorName" value="Author Name" />
                  </div>
                     <TextInput id="authorName"  name='authorName' type="text" placeholder="Author Name" required />
             </div>
             </div>


            {/* 2nd row*/}
             <div className='flex gap-8'>
              <div className='lg:w-1/2'>
                  <div className="mb-2 block">
                     <Label htmlFor="imageURL" value="Book Image URL" />
                  </div>
                     <TextInput id="imageURL"  name='imageURL' type="text" placeholder="Book Image URL" required />
             </div>


             {/* category */}
             <div className='lg:w-1/2'>
             <div className="mb-2 block">
                     <Label htmlFor="inputState" value="Book Category" />
                  </div>

                  <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory}
                  onChange={handleChangeSelectedValue}>
                    {
                        bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
                    }
                  </Select>
             </div>
             </div>

             <div className='flex gap-8'>
              <div className='lg:w-1/2'>
                  <div className="mb-2 block">
                     <Label htmlFor="price" value="price" />
                  </div>
                     <TextInput id="price"  name='price' type="number" placeholder="Price" required />
             </div>


             {/* amazonURL */}
             <div className='lg:w-1/2'>
                  <div className="mb-2 block">
                     <Label htmlFor="amazonURL" value="amazonURL" />
                  </div>
                     <TextInput id="amazonURL"  name='amazonURL' type="text" placeholder="amazonURL" required />
             </div>
             </div>




            {/* bookDescription*/}
             <div>
                <div className="mb-2 block">
                    <Label htmlFor="bookDescription" value="Book Description" />
                </div>
                <Textarea id="bookDescription" name="bookDescription" placeholder="Write Your book description..." required
                 rows={5} />
             </div>



            {/* bookPDFURL*/}
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="bookPDFURL" value="Book PDF URL" />
              </div>
                    <TextInput id="bookPDFURL" type="text" name="bookPDFURL" placeholder="book pdf url" required />
              </div>
          
               


              <Button type="submit" className='mt-5 font-semibold'>Upload Book</Button>



        </form>

        </div>
    )
}

export default UploadBook