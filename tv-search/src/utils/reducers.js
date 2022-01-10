import { useReducer } from "react";
import {
    FIND_SINGLE_SHOW,
    ALL_SHOWS
} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case FIND_SINGLE_SHOW:
            return{
                ...state,
            };

        case ALL_SHOWS:
            return {
                ...state,
                shows: action.payload
            };
    }
};

export function useTVReducer(initialState) {
    return useReducer(reducer, initialState)
}