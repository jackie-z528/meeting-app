import React, { Component } from 'react' 
import Notifs from './Notifs'
import Posts from '../Posts/Posts'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render () {
        
        const { posts, auth, notifs } = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>;

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <Posts posts={posts}/>
                    </div>

                    <div className="col s12 m5 offset-m1">
                        <Notifs notifs={notifs}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth,
        notifs: state.firestore.ordered.notifications,
        
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(Dashboard);