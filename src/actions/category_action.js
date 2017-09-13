/**
 * Created by Nisali Kularatne on 31/08/2017.
 */
export const FETCH_CATEGORIES='FETCH_CATEGORIES'
export function fetchCategories({categories}){
    return{
        type: FETCH_CATEGORIES,
        categories,
    }
}