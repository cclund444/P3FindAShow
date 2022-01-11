import axios from 'axios';
import React, { useState } from 'react'

function Show() {


await axios.get(`http://api.tvmaze.com/shows/${id}`)


    return(
        <div>
            Single Page
        </div>
    )
}

export default Show;