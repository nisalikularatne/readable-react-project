import React, { Component } from 'react';

import { connect }  from 'react-redux'
import { createComment } from '../actions/comments_action'
import { guid }  from '../utils/helpers'
import * as api from '../utils/api'

class CommentSubmitForm extends Component {
    FetchComments(postId) {
        api.fetchCommentsAPI(postId).then(comments => {
            this.props.fetchComments({comments});
        })
    }



    handleSubmit = (e) => {
        e.preventDefault()
        const postId = this.props.match.params.postId
        const category = this.props.match.params.category
        const submitComment = {
            id: guid(),
            parentId: postId,
            timestamp: Date.now(),
            body: e.target.body.value,
            author: e.target.author.value
        }
        console.log(submitComment)

        api.createComment(submitComment)
        this.props.addComment(submitComment, this.props.history.push(`/${category}/${postId}`))

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="create-post-form">
                <h1>Create New Comment</h1>
                <input type='text' name='body' placeholder='body'/>
                <br/>
                <input type='text' name='author' placeholder='author'/>
                <br/>
                    <button>Submit Comment</button>

            </form>

        )
    }
}

function mapStateToProps(state) {

    return {
        posts: state.posts,
        categories: state.categories,
    }
}
function mapDispatchToProps(dispatch) {

    return {
       addComment :(data) => dispatch(createComment(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentSubmitForm)