/**
 * Created by Nisali Kularatne on 14/09/2017.
 */


export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
const api = "http://localhost:5001";
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};



export function fetchComments({comments}){
    return{
        type: FETCH_COMMENTS,
        comments
    }
}
export const fetchCommentsById =(postId) => {
    return (dispatch) => {
        fetch(`${api}/posts/${postId}/comments`, { headers })
            .then(res => res.json())
            .then(comments => {
                dispatch({type: FETCH_COMMENTS, postId, comments })
            })
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

export function voteComment(updatedComment,parentId,commentId) {
    return {
        type : VOTE_COMMENT,
        updatedComment,
        parentId,
        commentId
    }
}
export function deleteComment(comment_id) {
    return {
        type: DELETE_COMMENT,
        comment_id
    };
}




