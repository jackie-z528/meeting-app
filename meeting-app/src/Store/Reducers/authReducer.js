const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN_ERR':
            console.log('login error');
            return {
                ...state, 
                authErr: 'Login Failed'
            };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authErr: null
            };
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authErr: null
            };
        case 'SIGNUP_ERR':
            console.log('signup failed')
            return {
                ...state,
                authErr: action.err.message
            };
        default: 
            return state;
    }
}

export default authReducer