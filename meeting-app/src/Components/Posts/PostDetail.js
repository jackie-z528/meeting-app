import React, { Component }from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deletePost } from '../../Store/Actions/postActions'
import { NavLink } from 'react-router-dom'
import { PostTopic } from "./PostTopic";
import AutoScrollContainer from "auto-scroll-container";
import styled from "styled-components";
import { MessageInput } from './MessageInput'
import { Message } from './Message'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

class PostDetail extends Component {

    messagesEndRef = React.createRef()

    handleClick = (e) => {
        console.log('deleted post');
        this.props.deletePost(this.props);
        this.props.history.push('/');
    }
    scrollToBottom = () => {
        this.messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        const { post, auth, id, topics, messages } = this.props;
        topics.reverse();
        console.log(topics);
        if (!auth.uid) return <Redirect to='/signin'/>;

        if (post) {
            return (
                <Container className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{post.title}</span>
                            {topics && 
                            <div>
                                {topics.map((topic) => { return <PostTopic topic={topic} key={topic.id}/> })}
                            </div>}
                        </div>
                        <div className="card-action grey-lighten-4 grey-text">
                        <div>{post.authorFirstName} {post.authorLastName}
                        {(auth.uid === post.authorId) ? <button onClick={this.handleClick}className="btn orange lighten-1 z-depth-0 ralign">Delete Meeting</button> : null}
                        <NavLink to={`/post/${id}/createTopic`} className="btn orange lighten-1 z-depth-0 ralign" style={{marginRight: "1rem"}}>Add Topic</NavLink>
                        </div>
                        <div>{moment(post.createdAt.toDate()).fromNow()} 
                        </div>
                        </div>
                    </div>
                    <div>
                        <div className="card z-depth-0" style={{height: "500px", overflow: "auto", textAlign: "justify", marginBottom: "-5px"}}>
                            {messages.length != 0 ? 
                                messages.map((message) => <Message message={message}/>) 
                                : <div style={{padding: "0.5rem"}}>No messages yet</div>
                            }
                            <div ref={this.messagesEndRef}></div>
                        </div>
                        <MessageInput postId={id}/>
                    </div>
                </Container>
            )
        } else {
            return ( 
                <div className="container center"><p className="orange-text lighten-1">Loading Meeting...</p></div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null;
    const topics = state.firestore.data.postTopics;
    const messages = state.firestore.data.messages;
    const topicsAsArray = [];
    topics && Object.keys(topics).forEach((topicKey) => {
        if (topics[topicKey]?.postId === id) topicsAsArray.push({...topics[topicKey], id: topicKey})
    });
    const messagesAsArray = [];
    messages && Object.keys(messages).forEach((messageKey) => {
        if (messages[messageKey]?.postId === id) messagesAsArray.push({...messages[messageKey], id: messageKey})
    });
    return {
        post,
        auth: state.firebase.auth,
        id,
        topics: topicsAsArray,
        messages: messagesAsArray
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
        { collection: 'posts' },
        { collection: 'postTopics', orderBy: ['createdAt', 'desc']},
        { collection: 'messages', orderBy:['createdAt', 'asc']}
    ])
)(PostDetail)
