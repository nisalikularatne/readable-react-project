/**
 * Created by Nisali Kularatne on 1/09/2017.
 */
import { FETCH_CATEGORIES } from '../actions/category_action'
function categories(state = [], action){
    switch (action.type) {
        case FETCH_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
};
export default categories