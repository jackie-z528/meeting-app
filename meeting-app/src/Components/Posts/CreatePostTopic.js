import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPostTopic } from '../../Store/Actions/postActions'
import { Redirect, } from 'react-router-dom'

class CreatePostTopic extends Component {
    state = {
        topic: "",
        postId: ""
    }

    handleChange = (id) => (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            postId: id
        })
    }
    
    handleSubmit = (id) => (e) => {
        e.preventDefault();
        this.props.createPostTopic(this.state);
        this.props.history.push(`/post/${id}`);
    }
    
    render() {
        const { auth, id } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit(id)} className="white">
                    <h5 className="grey-text text-darken-3">Meeting Topic</h5>
                    <div className="input-field">
                        <input type="text" id="topic" required onChange={this.handleChange(id)}/>
                    </div>
                    <div className="input-field">
                        <button className="btn orange lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPostTopic: (topic) => dispatch(createPostTopic(topic))
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostTopic)