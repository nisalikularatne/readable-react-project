/**
 * Created by Nisali Kularatne on 14/09/2017.
 */
import  {FETCH_COMMENTS} from '../actions/comments_action'
import  {EDIT_COMMENT,CREATE_COMMENT,VOTE_COMMENT,DELETE_COMMENT} from '../actions/comments_action'
export function comments (state={}, action) {
    const { parentId,commentId,updatedComment} = action
    switch (action.type) {

        case FETCH_COMMENTS:// eslint-disable-next-line
            comments = state == null ? {} : state;
            if (Array.isArray(action.comments) && action.comments.length > 0) {
                for (let comment of action.comments) {
                    comments[comment.id] = comment
                }
                return comments
            }

        // eslint-disable-next-line
        case EDIT_COMMENT:  // eslint-disable-next-line
            comments = state == null ? {} : state;
            if(Array.isArray(action.comments) && action.comments.length > 0) {
                for(let comment of action.comments) {
                    comments[ comment.id ] = comment
                }

            }
            return comments
        case CREATE_COMMENT:
            return Object.assign({}, state.comments, {[parentId]: comments})
        case VOTE_COMMENT:
            if(Array.isArray(action.comments) && action.comments.length > 0) {
                for(let comment of action.comments) {
                    if (comment.id === commentId) {
                        comment = updatedComment
                    }
    return comment
                }
                }
// eslint-disable-next-line
        case DELETE_COMMENT:
            return state
        default:
            return state
    }
}
