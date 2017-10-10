/**
 * Created by Nisali Kularatne on 10/09/2017.
 */
import * as api from '../utils/api'
import {guid} from '../utils/helpers'
import  { fetchCategories } from '../actions/category_action'
import  { addPost } from '../actions/post_action'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
class CreatePost extends Component {
    fetchCategories() {
        api.fetchAllCategories().then(categories => {
            this.props.loadCategories(categories);
        })
    }
    componentDidMount() {
        this.fetchCategories()

    }
    handleEvent = (e) => {
        e.preventDefault()
        const post = {
            id: guid(),
            title: e.target.title.value,
            body: e.target.body.value,
            author: e.target.author.value,
            category: e.target.category.value,
            timestamp: Date.now(),
            voteScore:1
        }
           api.createPost(post)
        this.props.addPost(post, this.props.history.push('/'))

    }
    render() {

        const {categories} = this.props
        return (
            <div>
                <a  href='/' className='close'> back </a><br/><br/>
                <form  onSubmit={this.handleEvent} className='create-post-form'>
                    <div className='create-post-details'>
                        <input type='text' name='title' placeholder='title' />
                        <br/>
                        <input type='text' name='body' placeholder='body'/>
                        <br/>
                        <input type='text' name='author' placeholder='author'/>
                        <br/>

                        <select name='category' >
                            {categories.map((category)=>(<option value={category.name}>{category.name}</option>))}

                                ))
                            }
                        </select>
                        <script type="text/javascript">
                            document.getElementById('timestamp').value=Date.now();
                        </script>
                        <button>Create Post</button>
                    </div>
                </form>
            </div>
    )
    }
}
function mapStateToProps(state) {
    return {
        categories: state.categories,
        posts:state.posts
    };
}
function mapDispatchToProps (dispatch) {
    return {
        loadCategories: (data) => dispatch(fetchCategories(data)),
        addPost:(data)=>dispatch(addPost(data))

    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CreatePost))
