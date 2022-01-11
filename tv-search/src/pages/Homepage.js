import { useState, useContext } from "react";
import useTVContext from '../utils/GlobalState'
import axios from 'axios';



function Homepage() {
    const [search, setSearch] = useState("");
    const [tvdata, setTvData] = useState("")

    const handleSearch = async e => {
        e.preventDefault();

     axios.get(`http://api.tvmaze.com/search/shows?q=${search}`).then(function (response) {
         console.log(response.data);
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
        <div className="results">
            <div className="result">
            <h3> {} </h3>
            <p> {}</p>
            <a href="#">More</a>
            </div>
        </div> 
    </div>
    );
}

export default Homepage;