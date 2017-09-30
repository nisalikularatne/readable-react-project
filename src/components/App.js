import React, { Component } from 'react';
import '../css/App.css';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import Post from './Post'
import PostsByCategory from './PostsByCategory'
import PostDetail from './PostDetail'
import PostEdit from './PostEdit'
import CreatePost from './CreatePost'
import CommentEdit from './CommentEdit'
import CommentSubmitForm from './CommentSubmitForm'
import  { fetchPosts } from '../actions/post_action'
import  { fetchCategories } from '../actions/category_action'
import {Switch,Route,withRouter,Link } from 'react-router-dom'

class App extends Component {

    FetchPosts() {
        api.getAllPosts().then(posts => {
            this.props.loadPosts({posts});
        })
    }

    fetchCategories() {
            api.fetchAllCategories().then(categories => {
                this.props.loadCategories(categories);
            })
    }

    componentDidMount() {
        this.FetchPosts();
        this.fetchCategories()

    }




    render() {

        return (
            <div>
            {this.props.categories.map((category) => (


                <Link key={category.name} to={`/${category.path}`}>
                    <h3>{category.name}</h3>
                </Link>


            ))}

                 <div className="app-wrapper">
                     <Switch>
                         <Route exact path="/" component={Post}/>)}/>
                         <Route name="CreatePage" exact path='/post/create' component={CreatePost}/>)}/>
                         <Route name="PostDetails"  exact path='/:category/:postId' component={PostDetail}/>)}/>
                         <Route exact path="/:category/:postId/comment" component={CommentSubmitForm}/>
                         <Route name="categorybypage"  exact path='/:category' component={PostsByCategory}/>)}/>
                         <Route name="PostEdits"  exact path='/:category/:postId/edit' component={PostEdit}/>)}/>
                         <Route name="CommentEdits"  exact path='/:postId/comment/:commentId/edit' component={CommentEdit}/>)}/>

                    </Switch>
                        </div>
                </div>
                );
            }

    }

function mapStateToProps(state) {
    return {
        posts: state.posts,
        categories: state.categories,
    };
}
function mapDispatchToProps (dispatch) {
    return {
        loadPosts: (data) => dispatch(fetchPosts(data)),
        loadCategories: (data) => dispatch(fetchCategories(data)),



    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
//name