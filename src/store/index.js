/**
 * Created by Nisali Kularatne on 21/08/2017.
 */
import { createStore, applyMiddleware,compose } from 'redux';
import  { fetchPosts } from '../actions/post_action'
import thunk from 'redux-thunk';
import reducer from '../reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
));
store.dispatch(fetchPosts())
export default store