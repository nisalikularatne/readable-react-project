import _ from 'lodash'
import * as api from '../utils/api'
import  { fetchPosts } from '../actions/post_action'
import  { updatePost } from '../actions/post_action'
import  { fetchCategories } from '../actions/category_action'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'

class PostEdit extends Component {
    fetchCategories() {
        api.fetchAllCategories().then(categories => {
            this.props.loadCategories(categories);
        })
    }
    FetchPosts() {
        api.getAllPosts().then(posts => {
            this.props.loadPosts({posts});
        })
    }
    getCurPost() {

        const postId = this.props.match.params.postId
        if (postId !== undefined) {
            const newPosts = this.props.posts.filter((post) => {
                return post.id === postId
            })
            if (newPosts.length > 0) {
                return newPosts[0]
            }
        }
        return undefined
    }
    componentDidMount() {
        this.FetchPosts()
        this.fetchCategories()

    }
    handleEvent = (e) => {
        e.preventDefault()
        const post = {
            id: this.props.post.id,
            title: e.target.title.value,
            body: e.target.body.value,
            author: e.target.author.value,
            category: e.target.category.value,
            timestamp: Date.now(),
            voteScore:0
        }
        const curPost = this.getCurPost()
        if (curPost) {
            curPost.title = post.title
            curPost.body = post.body
            curPost.category = post.category
            curPost.timestamp = post.timestamp
            api.updatePostAPI(curPost)
            this.props.updatePosts(curPost,this.props.history.push('/'))
        }

    }
    render() {

        const {categories} = this.props
        const {post} =this.props
        console.log(post)
        return (
            <div>
                <a  href='/' className='close'> back </a><br/><br/>
                <form  onSubmit={this.handleEvent} className='create-post-form'>
                    <div className='create-post-details'>
                        <input type='text' name='title' defaultValue={post && post.title}  />
                        <br/>
                        <input type='text' name='body'  defaultValue={ post && post.body}/>
                        <br/>
                        <input type='text' name='author'  defaultValue={ post && post.author}/>
                        <br/>

                        <select name='category' defaultValue={ post && post.category}>
                            {categories.map((category)=>(<option value={category.name}>{category.name}</option>))}

                            ))
                            }
                        </select>
                        <script type="text/javascript">
                            document.getElementById('timestamp').value=Date.now();
                        </script>
                        <button>Edit Post</button>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state,{match}) {
    return {
        post: _.find(state.posts, {id: match.params.postId }),
        categories: state.categories,
        posts:state.posts
    };
}
function mapDispatchToProps (dispatch) {
    return {
        loadPosts: (data) => dispatch(fetchPosts(data)),
        updatePosts:(data)=>dispatch(updatePost(data)),
        loadCategories: (data) => dispatch(fetchCategories(data))

    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostEdit))
