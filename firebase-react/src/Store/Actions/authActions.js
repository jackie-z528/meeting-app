export const signIn = (creds) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            creds.email,
            creds.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERR', err})
        });

    }

}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase})  => {
        const firebase = getFirebase();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firebase.firestore().collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            });
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'SIGNUP_ERR', err})
        })
    }
}