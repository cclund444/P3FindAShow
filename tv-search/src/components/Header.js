import { useState } from "react";


function Header() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [searchInfo, setSearchInfo] = useState({});

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
        
        setResults(json.query.search);
        setSearchInfo(json.query.searchInfo);
    }


    return(
        <div className="header">
        <header>
            <h1>TV-Show Search</h1>
            <form className="search-box" onSubmit={handleSearch}>
                <input type="search" placeholder="Search Here" value={search} onChange={e => setSearch(e.target.value)} />
            </form>
            {(searchInfo.totalhits) ? <p>Search Results: {searchInfo.totalhits}</p> :'' }
       </header>
        <div className="results">
            <div className="result">
            <h3>Title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adip</p>
            <a href="#">More</a>
            </div>
        </div> 
    </div>
    );
}

export default Header;