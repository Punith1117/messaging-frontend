import { useState } from "react"

const SendMessage = ({
    status,
    statusUpdatedBy,
    handleSend,
    handleStatusChange,
    loggedInUserId
}) => {
    const [message, setMessage] = useState('')

    if (status === 404 || status === 'accepted') {
        return (
            <div>
                <input 
                    type="text" 
                    placeholder={
                        (status === 404) ?
                        "Send your first message as an invitation. Good luck :)":
                        "Type a message"
                    }
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button onClick={() => {
                    if (!message.trim()) return
                    handleSend(message)
                    setMessage('')
                }}>Send</button>
                {status === 'accepted' && <button onClick={() => handleStatusChange('blocked')}>Block</button>}
            </div>
        )
    } else if (status === 'blocked') {
        if (loggedInUserId === statusUpdatedBy) {
            return (
                <div>
                    <button onClick={() => handleStatusChange('accepted')}>Unblock</button>
                </div>
            )
        } else {
            return (
                <div>
                    <p>You are blocked</p>
                </div>
            )
        }
    } else { // 'pending' state
        if (loggedInUserId === statusUpdatedBy) {
            return (
                <div>
                    <p>Chat invitation is yet to be accepted</p>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={() => handleStatusChange('accepted')} >Accept</button>
                    <button onClick={() => handleStatusChange('blocked')} >Reject</button>
                </div>
            )
        }
    }
}

export default SendMessage