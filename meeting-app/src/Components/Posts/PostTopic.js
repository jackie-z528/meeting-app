import React from "react";
import { useDispatch } from "react-redux";
import { deletePostTopic } from "../../Store/Actions/postActions";
import styled from "styled-components";

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
    const { id, topic: title } = topic;
    const dispatch = useDispatch();
    const handleClick = (topic) => (e) => {
        e.preventDefault();
        dispatch(deletePostTopic(topic));
    }
    return (
        <TopicContainer>
            <div style={{width: "50%", wordWrap: "break-word"}}>{title}</div><button className="btn orange lighten-1 z-depth-1" onClick={handleClick(topic)}>Delete Topic</button>
        </TopicContainer>
    )
}