const Messages = ({
  handleScroll,
  messages,
  messagesRef,
  loading
}) => {
  const hasMessages = Array.isArray(messages) && messages.length > 0

    return (
        <div
            ref={messagesRef}
            onScroll={handleScroll}
            style={{
                height: '300px',
                overflowY: 'auto'
            }}
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
                messages.map(message => (
                <div key={message.id}>
                    {message.content}
                </div>
                ))}

            {/* Empty state */}
            {!loading && !hasMessages && (
                <div>No messages yet</div>
            )}
        </div>
  )
}

export default Messages
