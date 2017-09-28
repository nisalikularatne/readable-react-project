/**
 * Created by Nisali Kularatne on 21/09/2017.
 */
import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  {voteComment,deleteComment} from '../actions/comments_action'
import  {editComment} from '../actions/comments_action'
import {arrayFromObject} from '../utils/helpers'
import * as api from '../utils/api'
import Modal from 'react-modal'
class Comment extends Component {

    state = {
        commentModalOpen: false,
    }
    openCommentModal = () => {
        this.setState(() => ({
            commentModalOpen: true,
        }))
    }
    closeCommentModal = () => {
        this.setState(() => ({
            commentModalOpen: false,
        }))
    }
    voteComment(commentId,parentId,isUp){
        api.voteCommentAPI(commentId,parentId, isUp).then(data => {
            this.props.voteCommentDispatch(data)
        })
    }


    getCurComment() {
        const commentsArray = arrayFromObject(this.props.comments, 'id');
        const comment=this.props
        if (comment.id !== undefined) {
            const newComment = commentsArray.filter((c) => {
                return comment.id === c.id
            })
            if (newComment.length > 0) {
                return newComment[0]
            }
        }
        return undefined
    }

    deleteComment(commentId,history) {
        api.deleteComment(commentId).then(data => {
            if (data.status === 200) {
                this.props.deleteComment(commentId)
                if (history) {
                    history.push('/')
                }
            }


        })
    }


    generateModal(comment) {

        return (
            <Modal
                className='modal'
                isOpen={this.state.commentModalOpen}
                onRequestClose={this.closeCommentModal}
                contentLabel="Edit Comment"

                >
                <h1>Edit Comment</h1>
                <form  onSubmit={this.handleEvent} className='create-post-form'>
                    <div className='create-post-details'>
                        <input type='text' name='body' defaultValue={comment && comment.body}  />
                        <br/>

                        <input type='text' name='author'  defaultValue={ comment && comment.author}/>
                        <br/>

                        <script type="text/javascript">
                            document.getElementById('timestamp').value=Date.now();
                        </script>
                        <button>Edit Comments</button>
                    </div>
                </form>

            </Modal>
        )

    }


    render() {
        const {comment} = this.props
        const {postId}=this.props.match.params.postId

        return (
            <div className="comment__specs">
                <h4 className="commet__spec comment__body">Body: {comment.body}</h4>
                <time className="comment__spec comment__timestamp timestamp">
                    TimeStamp: {new Date(comment.timestamp).toString().substr(0, 16)}</time>
                <br/>
                <div className="comment__spec comment__vote-count vote-count">Vote
                    Score: {comment.voteScore}</div>
                <div className="comment__spec comment__author">Author: {comment.author}</div>
                <div className='inner'>
                    <Link to={`/${postId}/comment/${comment.id}/edit`}><button>Edit Post</button></Link>
                    <button onClick={()=>this.deleteComment(comment.id)}>Delete</button>
                    <button  onClick={()=>this.voteComment(comment.id,postId, true)}>Vote Up</button>
                    <button onClick={()=>this.voteComment(comment.id,postId, false)} >Vote Down</button>
                    {this.generateModal(comment)}
                </div>

                <br/><br/>
            </div>
        )


    };

}

function mapStateToProps(state,{match}) {
    const postId = match.params.postId
    return {
        posts: state.posts.filter(post => post.id === postId),
       comments:state.comments
           };
}
function mapDispatchToProps(dispatch) {

    return {
        editComment:(data)=>dispatch(editComment(data)),
        voteCommentDispatch:(data)=> dispatch(voteComment(data)),
        deleteComment:(data)=> dispatch(deleteComment(data))

    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Comment));

