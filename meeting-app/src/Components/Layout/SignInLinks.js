import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../Store/Actions/authActions'

const SignInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/create'>New Post</NavLink></li>
            <li><a onClick={props.signOut}>Sign Out</a></li>
            <li><NavLink to='/' className='btn btn-floating orange lighten-1'>{props.profile.initials}</NavLink></li>
        </ul>    
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(SignInLinks);