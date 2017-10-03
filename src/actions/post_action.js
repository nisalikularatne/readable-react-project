/**
 * Created by Nisali Kularatne on 31/08/2017.
 */
export const FETCH_POSTS='FETCH_POSTS'
export const FETCH_POST='FETCH_POST'
export const ADD_POST='ADD_POST'
export const DELETE_POST='DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SORT_AESC_BY_TIMESTAMP = 'SORT_AESC_BY_TIMESTAMP'
export const SORT_DESC_BY_TIMESTAMP = 'SORT_DESC_BY_TIMESTAMP'
export const SORT_AESC_BY_VOTESCORE = 'SORT_AESC_BY_VOTESCORE'
export const SORT_DESC_BY_VOTESCORE = 'SORT_DESC_BY_VOTESCORE'
export const VOTE_POST = 'VOTE_POST'

export function addPost(post){
    return {
        type : ADD_POST,
        post
    }
}
export function deletePosts(postId) {
    return {
        type : DELETE_POST,
        postId
    }
}
export function fetchPost(postId) {
    return {
        type : FETCH_POST,
        postId
    }
}
export function updatePost(post) {
    return {
        type : UPDATE_POST,
        post
    }
}
export function sortAescByVoteScore() {
    return {
        type : SORT_AESC_BY_VOTESCORE
    }
}
export function sortDescByVoteScore() {
    return {
        type : SORT_DESC_BY_VOTESCORE
    }
}

export function sortAescByTimestamp() {
    return {
        type : SORT_AESC_BY_TIMESTAMP
    }
}

export function sortDescByTimestamp() {
    return {
        type : SORT_DESC_BY_TIMESTAMP
    }
}
export function votePost(post) {
    return {
        type : VOTE_POST,
        post
    }
}
