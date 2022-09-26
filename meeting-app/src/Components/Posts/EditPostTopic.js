import React, { Component }from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deletePost } from '../../Store/Actions/postActions'
import { NavLink } from 'react-router-dom'
import { PostTopic } from "./PostTopic";
import styled from "styled-components";
import { MessageInput } from './MessageInput'
import { Message } from './Message'
import { editPostTopic } from "../../Store/Actions/postActions"
class EditPostTopic extends Component {
    state = {
        title: "",
        timeEstimate: "",
        description: ""
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        })
    }
    
    handleSubmit = (id, topicId) => (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
        });
        this.props.editPostTopic(this.state, topicId);
        this.props.history.push(`/post/${id}`);
    }
    
    handleCancel = (id) => (e) => {
        e.preventDefault();
        this.props.history.push(`/post/${id}`)
    }

    render() {
        const { auth, id, topic, topicId } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;
        return (
            <div className="container white">
                <form onSubmit={this.handleSubmit(id, topicId)} className="white">
                    <h5 className="grey-text text-darken-3">Meeting Topic</h5>
                    <div className="input-field">
                        <label htmlFor="title">New title</label>
                        <input type="text" id="title" required onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="timeEstimate">New time estimate</label>
                        <input type="text" id="timeEstimate" required onChange={this.handleChange}/>
                    </div>
                    <div classname="input-field">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                    <button className="btn orange lighten-1 z-depth-0" style={{marginRight: "1rem"}}>Edit</button>
                    <button className="btn orange lighten-1 z-depth-0" type="button" onClick={this.handleCancel(id)}>Cancel</button>
                </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const topicId = ownProps.match.params.topicId;    
    const id = ownProps.match.params.id;
    const topics = state.firestore.data.postTopics;
    const topic = topics ? topics[topicId] : null;
    return {
        topic,
        topicId,
        id,
        auth: state.firebase.auth
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        editPostTopic: (topic, id) => dispatch(editPostTopic(topic, id))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: 'posts'}]))(EditPostTopic)
