/**
 * Created by Nisali Kularatne on 22/08/2017.
 */
/**
 * Created by Nisali Kularatne on 21/08/2017.
 */
import React, {Component} from 'react';
import _ from 'lodash';
import { guid } from '../utils/helpers'
import { withRouter ,Link} from 'react-router-dom'
import { connect } from 'react-redux'
import  {fetchComments} from '../actions/comments_action'
import * as api from '../utils/api'

import Comment from './Comment'

class PostDetail extends Component {


    FetchComments(postId) {
        api.fetchCommentsAPI(postId).then(comments => {
            this.props.loadComments({comments});
        })
    }


    componentDidMount() {
        const postId = this.props.match.params.postId
        this.FetchComments(postId)

    }

    render() {
        const {posts} = this.props
        const postId = this.props.match.params.postId
        console.log(this.props)
        if (this.props.posts.length === 0) {
            return (
                <div>
                    <Link to='/' className='close'/>
                    <p>{'404 error, no such post for id ' + postId}</p>
                </div>
            )
        }

        return (
            <div className="books-grid">
                {posts.map((post) =>

                    <div className="post" key={post.id}>
                        <div className="container">
                            <header className="post__header">
                                <h1 className="post__title title">Title :{post.title}</h1>
                                <div className="post__specs">
                                    <time className="post__spec post__timestamp timestamp">Date: {new Date(post.timestamp).toString().substr(0,16)}</time><br/>
                                    <div className="post__spec post__vote-count vote-count">VoteScore: {post.voteScore}</div>
                                    <div className="post__spec post__author">Author: {post.author}</div>
                                    <div className="comment_number">Comment Length: {this.props.comments.length}</div>
                                </div>
                            </header>
                            <div className="post__content">
                                <p>{post.body}</p>
                         </div>
                            <h2>Comments</h2>

                                {this.props.comments.map((comment) =>
                                    (<div key={comment.id + guid()}>
                                        <Comment comment={comment}/>
                                        </div>
                                    ))
                                }

                            <Link to={`/${post.category}/${postId}/comment`}>Create New Comment</Link>
                        </div>

                    </div>


                    )}



            </div>);
    }
}

function mapStateToProps(state,{match}) {
    const postId = match.params.postId
    return {
        posts: state.posts.filter(post => post.id === postId),
        comments:_.filter(state.comments, comment => comment.parentId === postId),
        post: _.find(state.posts, {id: match.params.postId })
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadComments: (data) => dispatch(fetchComments(data)),

    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail));
