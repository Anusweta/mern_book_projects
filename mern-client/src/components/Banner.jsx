import React,{useState, useEffect} from 'react'
import BannerCard from '../home/BannerCard';
import { Link } from 'react-router-dom';


const Banner = () => {
    const [data, setData] = useState([]);

    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    


    
    useEffect(() => {
        fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setData(data))
    },[])


    const  handleSearch = () => {
        const searchinput = data.filter(item => item.bookTitle.includes(query));
        setFilteredData(searchinput);
      };
    



   
    
    return(
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
            <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
                {/* left side */}
                <div className='md:w-1/2 space-y-8 h-full'>
                     <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell Your Books <span className='text-blue-700'>for the Best Price</span></h2>
                     <p className='md-4/5'>A paragraph is a part of a speech or writing that develops a point of a subject or gives the words of a speaker.
                         It can also be a short written article that is complete in one section.</p>
                     <div><input type="search" name="search" id="search" placeholder='Search a book' value={query}
        onChange={e => setQuery(e.target.value)}  className='py-2
                     px-2 rounded-s-sm outline-none'/>
                    
                     <button onClick={handleSearch} className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black
                      transition-all ease-in duration-200'>Search</button>
                      <ul>
        {filteredData.map(item => (
          <li key={item.id}><Link to={`/book/${item._id}`}>{item.bookTitle}</Link></li>
        ))}
      </ul>

                </div>  
                </div>
                 {/* right side */}<div><BannerCard></BannerCard></div>
            </div>
            
        </div>
    )
}

export default Banner