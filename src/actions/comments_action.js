/**
 * Created by Nisali Kularatne on 14/09/2017.
 */


export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export function fetchComments({comments}){
    return{
        type: FETCH_COMMENTS,
        comments
    }
}

export function editComment ({ comment,id, timestamp, body, author, parentId }) {
    return {
        type: EDIT_COMMENT,
        id,
        timestamp,
        body,
        author,
        parentId,
        comment
    }
}
export function createComment ({comment, parentId}){
    return{
        type: CREATE_COMMENT,
            parentId,
            comment
    }
}
export function deleteComment(commentId) {
    return {
        type : DELETE_COMMENT,
        commentId
    }
}
export function voteComment(updatedComment,parentId,commentId) {
    return {
        type : VOTE_COMMENT,
        updatedComment,
        parentId,
        commentId
    }
}





