import styled from "styled-components"
import { sendMessage } from "../../Store/Actions/postActions"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const MessageInput = ({ postId }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState( {text: "", postId} );
    const handleChange = (e) => {
        setMessage({
            [e.target.id]: e.target.value,
            postId
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        message.text && dispatch(sendMessage(message))
        setMessage({ text: "", postId})
        document.getElementById("message").reset()
    }

    return (
        <form onSubmit={handleSubmit} className="white" id="message" style={{display: "flex", alignItems: "stretch", marginTop: "0"}}>
            <input type="text" id="text" onChange={handleChange}/>
            <button className="btn orange lighten-1 z-depth-0">Send</button>
        </form>
    )
}