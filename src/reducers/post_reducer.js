/**
 * Created by Nisali Kularatne on 1/09/2017.
 */
import { FETCH_POSTS,SORT_AESC_BY_TIMESTAMP,SORT_AESC_BY_VOTESCORE,ADD_POST,
SORT_DESC_BY_TIMESTAMP,SORT_DESC_BY_VOTESCORE,DELETE_POST,UPDATE_POST,VOTE_POST} from '../actions/post_action'

function sortingState(state, sortOrder) {

    state.sort(sortOrder)
    return state
}

export function posts(state = [], action){
    switch (action.type) {
        case FETCH_POSTS:
            return action.posts.filter(post=> post.deleted === false)
        case ADD_POST:
            return state.concat(action.post)
        case DELETE_POST:
            return state.filter((post) => {
                return post.id !== action.postId
            })
        case UPDATE_POST:
            return state.map((post) => {
                const curPost = action.post
                return curPost.id === post.id ? curPost : post
            })
        case SORT_AESC_BY_VOTESCORE:
            return sortingState(state, (postA, postB)=> {return postA.voteScore - postB.voteScore})
        case SORT_DESC_BY_VOTESCORE:
            return sortingState(state, (postA, postB)=> {return postB.voteScore - postA.voteScore})
        case SORT_AESC_BY_TIMESTAMP:
            return sortingState(state, (postA, postB)=> {return postA.timestamp - postB.timestamp})
        case SORT_DESC_BY_TIMESTAMP:
            return sortingState(state, (postA, postB)=> {return postB.timestamp - postA.timestamp})
        case VOTE_POST:
            return state.map(post => {
                if (post.id === action.post.id) {
                    return action.post
                }
                return post
            })

        default:
            return state;
    }
};




export function postSort(state={sort:'vote_score_desc'}, action) {
    switch (action.type) {
        case SORT_AESC_BY_VOTESCORE:
            return {sort : 'vote_score_aesc'}
        case SORT_DESC_BY_VOTESCORE:
            return {sort : 'vote_score_desc'}
        case SORT_AESC_BY_TIMESTAMP:
            return {sort : 'timestamp_aesc'}
        case SORT_DESC_BY_TIMESTAMP:
            return {sort : 'timestamp_desc'}
        default:
            return state
    }
}