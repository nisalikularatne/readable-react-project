/**
 * Created by Nisali Kularatne on 21/09/2017.
 */
import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  {voteComment,deleteComment} from '../actions/comments_action'
import  {editComment} from '../actions/comments_action'
import * as api from '../utils/api'
class Comment extends Component {



    voteComment(commentId,parentId,isUp){
        api.voteCommentAPI(commentId,parentId, isUp).then(data => {
            this.props.voteCommentDispatch(data)
        })
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



    render() {
        const {comment} = this.props
        const {postId}=this.props.match.params.postId
        console.log(postId)
        return (
            <div className="comment__specs">
                <h4 className="comment__spec comment__body">Body: {comment.body}</h4>
                <time className="comment__spec comment__timestamp timestamp">
                    TimeStamp: {new Date(comment.timestamp).toString().substr(0, 16)}</time>
                <br/>
                <div className="comment__spec comment__vote-count vote-count">Vote
                    Score: {comment.voteScore}</div>
                <div className="comment__spec comment__author">Author: {comment.author}</div>

                    <Link to={`/${postId}/comment/${comment.id}/edit`}><button>Edit comment</button></Link>
                    <button onClick={()=>this.deleteComment(comment.id)}>Delete</button>
                    <button  onClick={()=>this.voteComment(comment.id,postId, true)}>Vote Up</button>
                    <button onClick={()=>this.voteComment(comment.id,postId, false)} >Vote Down</button>


                <br/><br/>
            </div>
        )


    };

}

function mapStateToProps(state,{match}) {
    const postId = match.params.postId
    return {
        posts: state.posts.filter(post => post.id === postId),
       comments:state.comments,

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

