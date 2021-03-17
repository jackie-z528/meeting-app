import React, { Component }from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deletePost } from '../../Store/Actions/postActions'

class PostDetail extends Component {

    handleClick = (e) => {
        console.log('deleted post');
        console.log(this.props);
        this.props.deletePost(this.props);
        this.props.history.push('/');
    }
    

    render() {
        console.log(this.props)
        const { post, auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>;

        if (post) {
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{post.title}</span>
                            <p>{post.content}</p>
                        </div>
                        <div className="card-action grey-lighten-4 grey-text">
                        <div>{post.authorFirstName} {post.authorLastName}
                        {(auth.uid === post.authorId) ? <button onClick={this.handleClick}className="btn orange lighten-1 z-depth-0 ralign">Delete Post</button> : null}
                        </div>
                        <div>{moment(post.createdAt.toDate()).fromNow()} 
                        </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return ( 
                <div className="container center"><p className="orange-text lighten-1">Loading Post...</p></div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null
    return {
        post: post,
        auth: state.firebase.auth,
        id: id
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (post) => dispatch(deletePost(post))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(PostDetail)
