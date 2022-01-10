import { useState } from "react";


function Homepage() {
    const [search, setSearch] = useState("");

    const handleSearch = async e => {
        e.preventDefault();
        if (search == '') return;

        const endpoint =`https://api.tvmaze.com/search/shows?q=${search}`;

        const response = await fetch(endpoint);
        console.log(response);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
    
    }


    return(
        <div className="header">
        <header>
            <h1>Search</h1>
            <form className="search-box" onSubmit={handleSearch}>
                <input type="search" placeholder="Search Here" value={search} onChange={e => setSearch(e.target.value)} />
            </form>
       </header>
        <div className="results">
            <div className="result">
            <h3>Title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur</p>
            <a href="#">More</a>
            </div>
        </div> 
    </div>
    );
}

export default Homepage;