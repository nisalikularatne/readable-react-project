/**
 * Created by Nisali Kularatne on 22/08/2017.
 */
/**
 * Created by Nisali Kularatne on 21/08/2017.
 */
import React, {Component} from 'react';
import { withRouter,Link } from 'react-router-dom'
import { connect } from 'react-redux'
class PostsByCategory extends Component {
    componentDidMount() {
        console.log(this.props)

    }

    render() {
        const {posts} = this.props
        console.log(this.props)
        return (
            <div className="books-grid">
                {posts.map((post) =>

                    <div className="post">
                        <div className="container">
                            <header className="post__header">
                                <Link to={`/${post.category}/${post.id}`}><h1>{'Title: ' + post.title}</h1></Link>
                                <div className="post__specs">
                                    <time className="post__spec post__timestamp timestamp">{new Date(post.timestamp).toString().substr(0,16)}</time><br/>
                                    <div className="post__spec post__vote-count vote-count">{post.voteScore}</div>
                                    <div className="post__spec post__author">{post.author}</div>
                                </div>
                            </header>
                            <div className="post__content">
                                <div className="post__spec post__vbody">{post.body}</div>
                                  </div>
                        </div>
                    </div>

                )}
            </div>);
    }
}

function mapStateToProps(state,{match}) {
    const category = match.params.category
    return {
        posts: state.posts.filter(post => post.category === category)
    };
}


export default withRouter(connect(mapStateToProps)(PostsByCategory));
