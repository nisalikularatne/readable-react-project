import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as api from '../utils/api'
import  {deletePosts,votePost} from '../actions/post_action'
import  {fetchCommentsById} from '../actions/comments_action'
import  {fetchCategories} from '../actions/category_action'
import _ from 'lodash'
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
    fetchCategories() {
        api.fetchAllCategories().then(categories => {
            this.props.loadCategories(categories);
        })
    }



    votePost(postId,isUp){
        api.votePostAPI(postId, isUp).then(data => {
            this.props.votePostDispatch(data)
        })
    }
    FetchComments(postId) {

        this.props.loadComments(postId);
    }
    componentWillMount() {

        const {post}=this.props
        this.FetchComments(post.id)

    }






    render() {
        const {post, fromList, history,categories} = this.props
        console.log(categories)



        return (

            <div>
                <div className='categry-list' >


                <Link to={`/${post.category}/${post.id}`}><h2>{'Title: ' + post.title}</h2></Link>
                <Link to={`/${post.category}`}>{post.category}</Link>
                { !fromList && (<p>Body: {post.body}</p>)}
                <p>{'timestamp: ' +new Date(post.timestamp).toString().substr(0,16)}</p>
                <p>{'Vote score: ' + post.voteScore}</p>
               <p>{'Author: ' + post.author}</p>


                    <div className='inner'>
                    <Link to={`/${post.category}/${post.id}/edit`}><button>Edit Post</button></Link>
                    <button onClick={()=>this.deletePost(post.id, fromList?undefined: history)} >Delete</button>
                    <button onClick={()=>this.votePost(post.id, true)}>Vote Up</button>
                    <button onClick={()=>this.votePost(post.id, false)} >Vote Down</button>
                </div>
                <br/> <br/> <br/> <br/>
            </div>
                </div>


        )
    }
}
function mapStateToProps(state,{post}) {

    return {
        posts:state.posts,
        comments:_.filter(state.comments, comment => comment.parentId === post.id && !comment.deleted && !comment.parentDeleted),
        categories:state.categories
}

}
function mapDispatchToProps(dispatch) {
    return {
        deletePosts: (data) => dispatch(deletePosts(data)),
        votePostDispatch:(data)=> dispatch(votePost(data)),
        loadCategories: (data) => dispatch(fetchCategories(data)),
        loadComments: (data) => dispatch(fetchCommentsById(data))




    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostsListDetail))