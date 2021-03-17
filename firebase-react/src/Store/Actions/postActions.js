

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
            dispatch({type: 'CREATE_PPOST_ERR', err})
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
    }
}