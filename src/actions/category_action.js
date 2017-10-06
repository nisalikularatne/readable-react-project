/**
 * Created by Nisali Kularatne on 31/08/2017.
 */

import * as api from '../utils/api'


export const FETCH_CATEGORIES='FETCH_CATEGORIES'
export const getCategories = () => dispatch => {
    return api.fetchAllCategories().then(categories => {
        dispatch(fetchCategories(categories));
    })
        .catch(function(err) {
            console.log('fetch err: ' + err.message)
        })
}
export function fetchCategories({categories}){
    return{
        type: FETCH_CATEGORIES,
        categories,
    }
}