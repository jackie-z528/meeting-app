import React from 'react';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom'

const Posts = ({ posts }) => {
    return (
        <div className="project-list section">
            { posts && posts.map(post => {
                return (
                    <Link to={'/post/' + post.id} key={post.id}>
                    <PostSummary post={post} />
                    </Link>
                )
            })}
            {!posts ? <p className="orange-text lighten-1">There are currently no posts.</p> : null}
        </div>
    )
}

export default Posts;