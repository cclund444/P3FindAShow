import { useState } from "react";


function Homepage() {
   const [users, setUsers] = useState([])

   const fetchData = e => {
       const query = e.target.value;
       fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
   .then(response => {
    return response.json()
  })
  .then(data => {
    setUsers(data)
  })
}



   

    return(
        <div className="header">
        <header>
            <h1>Search</h1>
            <form className="search-box">
                <input onChange={fetchData} lebel="search" placeholder="Search Here" />
            </form>
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
export default Homepage;