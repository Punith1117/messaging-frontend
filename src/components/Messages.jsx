import styled from "styled-components"
import { getUserIdFromToken } from "../utils"

const Messages = ({
  handleScroll,
  messages,
  messagesRef,
  loading
}) => {
    const hasMessages = Array.isArray(messages) && messages.length > 0
    const userId = getUserIdFromToken()

    return (
        <Wrapper
            ref={messagesRef}
            onScroll={handleScroll}
        >
            {/* Initial loading */}
            {loading && messages === null && (
                <div>Loading...</div>
            )}

            {/* Loading older messages */}
            {loading && hasMessages && (
                <div>Loading older messages...</div>
            )}

            {/* Messages */}
            {hasMessages &&
                messages.map(message => {
                    const isOwnMessage = message.fromId === userId

                    return (<Message key={message.id} isOwn={isOwnMessage}>
                        {message.content}
                    </Message>)
                })}

            {/* Empty state */}
            {!loading && !hasMessages && (
                <div
                    style={{
                        color: '#696969',
                        fontWeight: '600',
                        alignSelf: 'center'
                    }}
                >No messages yet</div>
            )}
        </Wrapper>
  )
}

export default Messages

const Wrapper = styled.div`
    width: 100%;
    height: 90%;
    border-top: 1px solid #cacaca;
    border-bottom: 1px solid #cacaca;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    padding: 8px;
`;

const Message = styled.div`
    max-width: 70%;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 12px;
    word-break: break-word;

    align-self: ${({ isOwn }) => (isOwn ? "flex-end" : "flex-start")};
    background-color: ${({ isOwn }) => (isOwn ? "#615EF0" : "#f1f1f1")};
    color: ${({ isOwn }) => (isOwn ? "#ffffff" : "#000000")};
`;
