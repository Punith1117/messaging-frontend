import { useEffect, useState } from "react"
import { getAvailableMoods, getMyDetails, saveMyDetails } from "../api/userQueries"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import editIcon from "../assets/edit.png"

const Profile = () => {
    const [editMode, setEditMode] = useState(false)
    const [details, setDetails] = useState({})
    const [newCasual, setNewCasual] = useState('')
    const [newMood, setNewMood] = useState('')
    const [availableMoods, setAvailableMoods] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await saveMyDetails(newCasual, newMood)

        if (res === 401) {
            navigate('/login', {replace: true})
        }
        setEditMode(false)
        getDetails()
    }

    const getDetails = async () => {
        setLoading(true)
        let res = await getAvailableMoods()
        setAvailableMoods(res)
        res = await getMyDetails()
        if (res === 401) {
            navigate('/login', {replace: true})
            return
        }
        setDetails(res)
        setNewCasual(res.casualName ?? '')
        setNewMood(res.mood ?? '')
        setLoading(false)
    }
    useEffect(() => {
        getDetails()
    }, [])

    if (loading) return <Wrapper>Loading...</Wrapper>

    return (
        <Wrapper>
            <h2>My Details</h2>
            <div className="content">
                <div className="row">
                    <p className="label">Username:</p>
                    <p className="value">{details.username}</p>
                </div>
                <div>
                    {
                        editMode ?
                        <form onSubmit={handleSubmit} className="details-section">
                            <div>
                                <p className="label">Casual Name:</p>
                                <input
                                    className="value" 
                                    type="text" 
                                    placeholder="$" 
                                    value={newCasual} 
                                    onChange={e => setNewCasual(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="label">Mood:</p>
                                <select
                                    className="value"
                                    value={newMood}
                                    onChange={(e) => setNewMood(e.target.value)}
                                >
                                    {
                                        availableMoods.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="buttons">
                                <button type="submit" className="save-btn">Save</button>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setNewCasual(details.casualName)
                                        setNewMood(details.mood)
                                        setEditMode(false)
                                    }} 
                                    className="cancel-btn"
                                >Cancel</button>
                            </div>
                        </form>
                        :
                        <div className="details-section">
                            <div>
                                <p className="label">Casual Name:</p>
                                {details.casualName ? <p className="value">{details.casualName}</p> : <p>_________</p>}
                            </div>
                            <div>
                                <p className="label">Mood:</p>
                                <p className="value">{details.mood}</p>
                            </div>
                            <button onClick={() => setEditMode(true)} className="edit-btn">Edit</button>
                        </div>
                    }
                </div>
            </div>
        </Wrapper>
    )
}

export default Profile

const Wrapper = styled.div`
    width: 50%;
    height: 100%;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-left: 1px solid #cacaca;

    @media (max-width: 1200px) {
        width: 60%;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        min-height: 65vh;
        border-left: none;
        border-top: 1px solid #cacaca;
    }

    .content {
        margin-top: 10rem;
    }

    h2 {
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: 20px;
        position: absolute;
        top: 40px;
        left: 40px;
        border-bottom: 1px solid #cacaca;
    }

    .row {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
    }

    .label {
        font-size: 16px;
        font-weight: 400;
        opacity: 0.7;
    }

    .value {
        font-size: 16px;
        font-weight: 500;
    }

    .details-section {
        background-color: #eee;
        padding: 16px;
        position: relative;
        width: 20rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        border-radius: 10px;
        border: 2px solid #cacaca;
    }

    input,
    select {
        width: 100%;
        padding: 6px 8px;
        margin-top: 4px;
        border-radius: 10px;
        border: 2px solid #cacaca;
    }

    .edit-btn {
        position: absolute;
        bottom: 12px;
        right: 12px;
        padding: 6px 10px 6px 30px;
        background-color: transparent;
        border: 1px solid #999;
        cursor: pointer;

        background-image: url(${editIcon});
        background-repeat: no-repeat;
        background-size: 14px 14px;
        background-position: 8px center;
    }

    .save-btn {
        background-color: #9be59b;
        color: #000;
        border: none;
        padding: 6px 12px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 6px;
    }

    .cancel-btn {
        background-color: #e57373;
        color: #fff;
        border: none;
        padding: 6px 12px;
        cursor: pointer;
        border-radius: 6px;
    }

    .buttons {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    p {
        margin: 0;
    }
`
