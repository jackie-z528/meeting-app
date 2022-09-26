import React from "react";
import { useDispatch } from "react-redux";
import { deletePostTopic } from "../../Store/Actions/postActions";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const TopicContainer = styled.div`
    border: 2px;
    border-color: lightgrey;
    border-style: solid;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`


export const PostTopic = ({ topic }) => {
    const { id, title, postId, timeEstimate, description } = topic;
    const dispatch = useDispatch();
    const handleClick = (topic) => (e) => {
        e.preventDefault();
        dispatch(deletePostTopic(topic));
    }
    return (
        <TopicContainer>
            <div>
                <div style={{wordWrap: "break-word", fontWeight: "bold"}}>{title}</div>
                {timeEstimate && <div className="grey-text">Time Estimate: {timeEstimate}</div>}
                {description && <div className="grey-text">Description: {description}</div>}
            </div>
            <div>
            <NavLink to={`/post/${postId}/editTopic/${id}`} className="btn orange lighten-1 z-depth-1" style={{marginRight: "1rem"}}>Edit Topic</NavLink>
            <button className="btn orange lighten-1 z-depth-1" onClick={handleClick(topic)}>Delete Topic</button>
            </div>
        </TopicContainer>
    )
}