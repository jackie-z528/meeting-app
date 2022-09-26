const initState = {
    posts: [
        {id: '1', title: 'i want to win', content: 'this is crazy'},
        {id: '2', title: 'i need to get to the store', content: 'blah blah blah'},
        {id: '3', title: 'how long until i get home', content: 'blah blah blah'}
    ]

}

const postReducer = (state = initState, action) => {
    
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'CREATE_POST':
            console.log('created post', action.post);
            return state;
        case 'CREATE_POST_ERR':
            console.log('create post error', action.err);
            return state;
        case 'CREATE_POST_TOPIC':
            console.log('created post topic', action.postTopic);
            return state;
        case 'CREATE_POST_TOPIC_ERR':
            console.log('create post topic error', action.err)
            return state;
        case 'EDIT_POST_TOPIC':
            console.log('edited post topic', action.postTopic);
            return state;
        case 'EDIT_POST_TOPIC_ERR':
            console.log('edit post topic error', action.err);
            return state;
        case 'DELETE_POST':
            console.log('deleted post');
            return state;
        case 'DELETE_POST_ERR':
            console.log('delete post error', action.err);
            return state;
        case 'SEND_MESSAGE':
            console.log('sent message', action.message);
            return state;
        case 'SEND_MESSAGE_ERR':
            console.log('send message error', action.err);
            return state;
        default: 
            return state;
        
    }
}

export default postReducer