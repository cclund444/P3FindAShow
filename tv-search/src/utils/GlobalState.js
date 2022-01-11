
import React, { createContext, useContext } from 'react';
import { ALL_SHOWS } from './actions';
import { useTVReducer } from './reducers';
import axios from 'axios'

const TVContext = createContext();
const { Provider } = TVContext;

const TVProvider = ({...props}) => {
    const [state, dispatch] = useTVReducer({
        show: {},
        shows: []
    });

const search = async (searchName) => {
    
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchName}`)
    
    dispatch({
        type: ALL_SHOWS,
        payload: data
    })
}

    return <Provider value={[state, dispatch], search} {...props} />;
};

const useTVContext = () => {
    return useContext(TVContext);
}

export { TVProvider, useTVContext };

