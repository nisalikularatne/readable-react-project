/**
 * Created by Nisali Kularatne on 27/09/2017.
 */
import React, { Component } from 'react';

import { connect }  from 'react-redux'
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import { createComment } from '../actions/comments_action'
import { editComment } from '../actions/comments_action'
import  {fetchComments} from '../actions/comments_action'
import * as api from '../utils/api'
// TODO: http://redux-form.com/6.7.0/docs/faq/HowToConnect.md/
class CommentEdit extends Component {
    FetchComments(postId) {
        api.fetchCommentsAPI(postId).then(comments => {
            this.props.fetchComments({comments});
        })
    }
    componentDidMount() {
        const postId = this.props.match.params.postId
        this.FetchComments(postId);

    }




    handleEvent = (e) => {
        e.preventDefault()
        console.log('hi')
        const {comment}=this.props

        const comment1 = {
            id: comment.id,
            body: e.target.body.value,
            author: e.target.author.value,
            timestamp: Date.now(),
            voteScore:0
        }
        console.log(comment1)




            comment.body = comment1.body
            comment.timestamp = comment1.timestamp
            comment.author = comment1.author
            api.updateCommentAPI(comment)
            this.props.editComment({comment},this.props.history.goBack())




    }
    render() {
        const {comment}=this.props
        console.log(comment)

        return (
            <form onSubmit={this.handleEvent} className="create-post-form">
                <h1>Modify Comment</h1>
                <input type='text' name='body' defaultValue={comment && comment.body}  />
                <br/>

                <input type='text' name='author'  defaultValue={comment && comment.author}/>
                <br/>

                <br/>
                <button>Submit Comment</button>

            </form>

        )
    }
}


function mapDispatchToProps(dispatch) {

    return {
        addComment :(data) => dispatch(createComment(data)),
        fetchComments:(data)=>dispatch(fetchComments(data)),
        editComment:(data)=>dispatch(editComment(data)),

    }
}
function mapStateToProps(state,{match}) {

    return {
        comment: _.find(state.comments, {id: match.params.commentId }),
        posts: state.posts,
        categories: state.categories,
        comments:state.comments

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CommentEdit))