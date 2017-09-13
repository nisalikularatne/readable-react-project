import React, {Component} from 'react'
import { guid } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {sortDescByVoteScore} from '../actions/post_action'
import {sortAescByVoteScore} from '../actions/post_action'
import {sortAescByTimestamp} from '../actions/post_action'
import {sortDescByTimestamp} from '../actions/post_action'
import PostsListDetail from './PostsListDetail'

class PostList extends Component {

    sortOrder = (event) => {
        const value = event.target.value
        value.startsWith('vote_score') ? (value.endsWith('desc')? this.props.sortDescByVoteScore() : this.props.sortAescByVoteScore()) : (value.endsWith('desc') ? this.props.sortDescByTimestamp() : this.props.sortAescByTimestamp())
    }

    render(){


        return (
            <div>
                <h1>Posts</h1>
                sortBy:<select id='vote-score-selector' name='voteScore' onChange={this.sortOrder}>
                <option value="" disabled="disabled" selected="selected">Please select sorting </option>
                <option value='vote_score_aesc' >vote_score_aesc</option>
                <option value='vote_score_desc' >vote_score_desc</option>
                <option value='timestamp_aesc' >timestamp_aesc</option>
                <option value='timestamp_desc' >timestamp_desc</option>

            </select>
                <br/><br/> <br/> <br/>

                <div className='post-list'>
                    {this.props.posts.map((post) => (
                        <div key={post.id + guid()} >
                            <Link to={`/post/${post.id}`}>Post Details</Link>
                            <PostsListDetail post={post}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {postSort} = state
    return {
        postSort,
        posts:state.posts
    }
}
function mapDispatchToProps (dispatch) {
    return {
        sortDescByVoteScore: () => dispatch(sortDescByVoteScore()),
        sortAescByVoteScore: () => dispatch(sortAescByVoteScore()),
        sortDescByTimestamp: () => dispatch(sortDescByTimestamp()),
        sortAescByTimestamp: () => dispatch(sortAescByTimestamp())


    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))