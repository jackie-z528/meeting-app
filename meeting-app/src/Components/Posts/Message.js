import styled from "styled-components";

const MessageContainer = styled.div`
    border: 1px;
    display: flex;
    align-items: left;
    padding: 0.5rem;
`

export const Message = ({message}) => {
    return (
        <MessageContainer>
            {message.authorFirstName} {message.authorLastName}: {message.text}
        </MessageContainer>
    )
}