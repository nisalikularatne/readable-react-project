import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as api from '../utils/api'
import  {deletePosts,votePost} from '../actions/post_action'


class PostsListDetail extends Component {
    deletePost(postId,history) {
        api.deletePost(postId).then(data => {
            if (data.status === 200) {
                this.props.deletePosts(postId)
                if (history) {
                    history.push('/')
                }
            }


    })
    }
    votePost(postId,isUp){
        api.votePostAPI(postId, isUp).then(data => {
            this.props.votePostDispatch(data)
        })
    }

    render() {
        const {post, fromList, history} = this.props
        console.log(this.props)

        return (
            <div>
                <h2>{'Title: ' + post.title}</h2>
                <Link to={`/${post.category}`}>{post.category}</Link>
                { !fromList && (<p>Body: {post.body}</p>)}
                <p>{'timestamp: ' +new Date(post.timestamp).toString().substr(0,16)}</p>
                <p>{'Vote score: ' + post.voteScore}</p>
                <p>{'Author: ' + post.author}</p>

                <div className='inner'>
                    <Link to={`/post/${post.id}/edit`}><button>Edit Post</button></Link>
                    <button onClick={()=>this.deletePost(post.id, fromList?undefined: history)} >Delete</button>
                    <button onClick={()=>this.votePost(post.id, true)}>Vote Up</button>
                    <button onClick={()=>this.votePost(post.id, false)} >Vote Down</button>
                </div>
                <br/> <br/> <br/> <br/>
            </div>


        )
    }
}
function mapStateToProps(state) {
    return {
        posts:state.posts
    };
}
function mapDispatchToProps(dispatch) {
    return {
        deletePosts: (data) => dispatch(deletePosts(data)),
        votePostDispatch:(data)=> dispatch(votePost(data))
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostsListDetail))