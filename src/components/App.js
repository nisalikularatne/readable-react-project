import React, { Component } from 'react';
import '../css/App.css';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import Post from './Post'
import PostsByCategory from './PostsByCategory'
import PostDetail from './PostDetail'
import PostEdit from './PostEdit'
import CreatePost from './CreatePost'
import  { fetchPosts } from '../actions/post_action'
import  { fetchCategories } from '../actions/category_action'
import {Switch,Route,withRouter } from 'react-router-dom'

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

    }




    render() {

        return (

                 <div className="app-wrapper">
                     <Switch>
                         <Route exact path="/" component={Post}/>)}/>
                         <Route name="categorybypage"  exact path='/:category' component={PostsByCategory}/>)}/>
                         <Route name="CreatePage" exact path='/post/create' component={CreatePost}/>)}/>
                         <Route name="PostDetails"  exact path='/post/:postId' component={PostDetail}/>)}/>
                         <Route name="PostEdits"  exact path='/post/:postId/edit' component={PostEdit}/>)}/>

                    </Switch>
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