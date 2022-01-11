import { useState, useContext } from "react";
import useTVContext from '../utils/GlobalState'
import axios from 'axios';



function Homepage() {
    const [search, setSearch] = useState("");
    const [tvdata, setTvData] = useState([]);

    const handleSearch = async e => {
        e.preventDefault();

     axios.get(`http://api.tvmaze.com/search/shows?q=${search}`).then(function (response) {
         console.log(response);
         setTvData(response.data);
     })
     .catch(function (err)
     {
         console.log(err);
     })
      
    }


    return(
        <div className="header">
        <header>
            <h1>Search</h1>
            <form className="search-box" onSubmit={handleSearch}>
                <input type="search" placeholder="Search Here" value={search} onChange={e => setSearch(e.target.value)} />
                <button className='searchBtn' onClick=
                {handleSearch}>
                    Search!
                </button>
            </form>
       </header>
       {tvdata.map((show, i) => (
           <div key={`div_results${i}`}className="results">
           <div key={`div_results2${i}`}className="result">
            <img src={show.show.image.medium} alt=''></img>
           <h3> {show.show.name} </h3>
           <p> {show.show.summary?.replace(/[<>]/g,'')}</p>
           <a href={`#Show${show.show.id}`}>More</a>
           </div>
       </div> 
       ))}
        
    </div>
    );
}

export default Homepage;