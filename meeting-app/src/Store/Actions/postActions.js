

export const createPost = (post) => {
    return (dispatch, getState, { getFirebase }) => {

        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('posts').add({
            ...post,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_POST', post: post});
        }).catch( (err) => {
            dispatch({type: 'CREATE_POST_ERR', err})
        })
    }
};

export const deletePost = (post) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        firestore.collection('posts').doc(post.id).delete().then(() => {
            dispatch({type: 'DELETE_POST', post});
        }).catch((err) => {
            dispatch({type: 'DELETE_POST_ERR', err})
        })
        firestore.collection('postTopics').where('postId', '==', post.id).get()
        .then((snapshot) => {
            snapshot.forEach((topic) => {
                topic.ref.delete().then(() => {
                    dispatch({type: 'DELETE_POST_TOPIC'});
                }).catch((err) => {
                    dispatch({type: 'DELETE_POST_TOPIC_ERR', err});
                })
            })
        })
        firestore.collection('messages').where('postId', '==', post.id).get()
        .then((snapshot) => {
            snapshot.forEach((message) => {
                console.log("ref: ", message.ref)
                message.ref.delete().then(() => {
                    dispatch({type: 'DELETE_MESSAGE_TOPIC'});
                }).catch((err) => {
                    dispatch({type: 'DELETE_MESSAGE_TOPIC_ERR', err});
                })
            })
        })
    }
}

export const createPostTopic = (topic) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('postTopics').add({
            ...topic,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_POST_TOPIC', postTopic: topic});
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERR', err});
        });
    }
}

export const deletePostTopic = (topic) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        firestore.collection('postTopics').doc(topic.id).delete().then(() => {
            dispatch({type: 'DELETE_POST_TOPIC', postTopic: topic});
        }).catch((err) => {
            dispatch({type: 'DELETE_POST_TOPIC_ERR', err});
        });
    }
}

export const sendMessage = (message) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('messages').add({
            ...message,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'SEND_MESSAGE', message});
        }).catch((err) => {
            dispatch({type: 'SEND_MESSAGE_ERR', err});
        })
    }
}