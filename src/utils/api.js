/**
 * Created by Nisali Kularatne on 21/08/2017.
 */

const api = "http://localhost:5001";
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export const getAllPosts = () =>
    fetch(`${api}/posts/`, { headers })
        .then(res => res.json())

export const fetchAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())

export const createPost = (body) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

export const updatePostAPI = (post) => {
    return fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post),
        timestamp: JSON.stringify(post)
    }).then(res => res.json())
}
export const updateCommentAPI = (comment) => {
    return fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment),
    }).then(res => res.json())
}
export const createComment = (comment) => {
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)})
        .then(res => res.json())
}
export const deletePost = (postId) =>{
    return fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers
    })
}
export const deleteComment = (commentId) =>{
    return fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers
    })
}

export const votePostAPI = (postId, isUp) => {
    const body = {option: isUp ? 'upVote':'downVote'}
    return fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}
export const voteCommentAPI = (commentId,parentId, isUp) => {
    const body = {option: isUp ? 'upVote':'downVote'}
    return fetch(`${api}/comments/${commentId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}
export const fetchCommentsAPI = (postId) =>{
    return fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
}
export const fetchCommentsbyId = (postId) =>{
    return fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
}
export const fetchpost = (postId) =>{
    return fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())
}
