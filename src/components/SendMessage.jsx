import { useState } from "react"
import styled from "styled-components"
import sendIcon from "../assets/send.png"

const SendMessage = ({
    status,
    statusUpdatedBy,
    handleSend,
    handleStatusChange,
    loggedInUserId,
    loading
}) => {
    const [message, setMessage] = useState('')
    
    if (loading && !status)
        return <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '8%'
        }}>Loading...</div>

    if (status === 404 || status === 'accepted') {
        return (
            <AcceptedNotFound>
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
                }}
                    className="send"
                >Send</button>
                {status === 'accepted' && <button onClick={() => handleStatusChange('blocked')} className="block">Block</button>}
            </AcceptedNotFound>
        )
    } else if (status === 'blocked') {
        if (loggedInUserId === statusUpdatedBy) {
            return (
                <Blocked>
                    <button onClick={() => handleStatusChange('accepted')}>Unblock</button>
                </Blocked>
            )
        } else {
            return (
                <Blocked>
                    <p>You are blocked</p>
                </Blocked>
            )
        }
    } else { // 'pending' state
        if (loggedInUserId === statusUpdatedBy) {
            return (
                <Pending>
                    <p>Chat invitation is yet to be accepted</p>
                </Pending>
            )
        } else {
            return (
                <Pending>
                    <button onClick={() => handleStatusChange('accepted')} >Accept</button>
                    <button onClick={() => handleStatusChange('blocked')} className="reject">Reject</button>
                </Pending>
            )
        }
    }
}

export default SendMessage

const AcceptedNotFound = styled.div`
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    input {
        width: 80%;
        height: 50%;
        border-radius: 1rem;
        border: 2px solid #dadada;
        padding: 5px;
        font-size: 14px;
    }

    .send {
        position: absolute;
        right: 12%;
        border: 0;
        color: transparent;
        width: 5rem;
        height: 2rem;
        border-radius: 4px;
        
        background-image: url(${sendIcon});
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;

        &:hover {
            cursor: pointer;
            filter: brightness(0.9);
        }
    }

    .block {
        position: absolute;
        right: 3px;
        font-size: 15px;
        padding: 10px;
        border-radius: 5px;
        border: 0;
        color: white;
        background-color: #FF706D;

        &:hover {
            cursor: pointer;
            filter: brightness(0.8);
        }
    }
`

const Blocked = styled.div`
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(#ffffff13,#FF706D);
    color: #FF706D;
    font-size: 30px;
    font-weight: 600;
    
    button {
        color: white;
        width: 10%;
        height: 40%;
        border-radius: 5px;
        border: 0;
        background-color: #2dd117;
        font-weight: 600;
        box-shadow: 0px 5px 5px green;

        &:hover {
            cursor: pointer;
            filter: brightness(0.8);
        }
    }
`

const Pending = styled.div`
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(#ffffff13,#FFF36D);
    color: #c4b300;
    font-size: 30px;

    button {
        margin: 20px;
        color: white;
        width: 10%;
        height: 40%;
        border-radius: 5px;
        border: 0;
        background-color: #2dd117;
        font-weight: 600;
        box-shadow: 0px 5px 5px green;

        &:hover {
            cursor: pointer;
            filter: brightness(0.8);
        }
    }

    .reject {
        background-color: #FF706D;
        box-shadow: 0px 5px 5px #c00300;
    }
`