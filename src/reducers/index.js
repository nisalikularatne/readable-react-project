/**
 * Created by Nisali Kularatne on 21/08/2017.
 */
import { combineReducers } from "redux";
import {posts,postSort} from './post_reducer';
import {comments} from './comments_reducer';


import categories from './category_reducer'
export default combineReducers({
    posts,categories,postSort,comments

})
