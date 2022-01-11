import { useState, useContext } from "react";
import useTVContext from '../utils/GlobalState'
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";
import CommentBox from "../components/CommentBox"



function Homepage() {
    const [search, setSearch] = useState("");
    const [tvdata, setTvData] = useState([]);
    const [modalShow, setModalShow] = useState(false)
    const [comments, setComments] = useState([])

    const handleModalShow = () => {
        setModalShow(!modalShow)
    }

    const handleSearch = async e => {
        e.preventDefault();

        axios.get(`http://api.tvmaze.com/search/shows?q=${search}`).then(function (response) {
            console.log(response);
            setTvData(response.data);
        })
            .catch(function (err) {
                console.log(err);
            })

    }

    const getComments =()=>{
        //tretireve all comments

        //axios.get('/api/comment').then....
        // store in setComment state

    }

    const handleNewCommentSubmit = (e)=>{
        e.preventDefault()
        const comment=document.getElementById("newComment").textContent

        const newCommentdata ={
            //comment user id

        }

        //post api


    }


    return (
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
                <div key={`div_results${i}`} className="results">
                    <div key={`div_results2${i}`} className="result">
                        {show.show.image?.medium !== null ? <img src={show.show.image?.medium} alt=''></img> : "img not available"}
                        <h3> {show.show.name} </h3>
                        <p> {show.show.summary?.replace(/[<>]/g, '')}</p>
                        <a href="#">More</a>
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Comment
                        </button>
                    </div>
                </div>
            ))}



            {/* <!-- Modal --> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {comments.length<1 || comments===null? "No Comments":comments.map(comment=> (<p>{comment.commentBody}</p>)) }

                            <div>

                            <textarea id="newCommment">

                            </textarea>
                            <button type="button" class="btn btn-info" onClick={handleNewCommentSubmit}>submit comment</button>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Homepage;