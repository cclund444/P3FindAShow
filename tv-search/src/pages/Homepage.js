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

    function showInfo() {
        
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
       <div className="results">
       {tvdata.map((show, i) => (

           <div key={`div_results2${i}`}className="result">
           {show.show.image?.medium !== null ? <img src={show.show.image?.medium} alt=''></img>:"img not available"}
           <h3> {show.show.name} </h3>
           <p> {show.show.summary?.replace(/[<>]/g,'')}</p>
           <div className="more-info">
               <p> {show.show.premiered} </p>
           </div>
           <button onClick={showInfo} type="button" className='more-btn'>More</button>
           </div>
 
       
       ))}
        </div>
    </div>
    );
}

export default Homepage;