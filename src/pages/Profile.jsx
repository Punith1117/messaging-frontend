import { useEffect, useState } from "react"
import { getAvailableMoods, getMyDetails, saveMyDetails } from "../api/userQueries"
import { useNavigate } from "react-router-dom"

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

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div>
                <p>username:</p>
                <p>{details.username}</p>
            </div>
            <div>
                {
                    editMode ?
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>Casual Name:</p>
                            <input 
                                type="text" 
                                placeholder="$" 
                                value={newCasual} 
                                onChange={e => setNewCasual(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Mood:</p>
                            <select
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
                        <button type="submit">Save</button>
                        <button 
                            type="button"
                            onClick={() => {
                                setNewCasual(details.casualName)
                                setNewMood(details.mood)
                                setEditMode(false)
                            }} 
                        >Cancel</button>
                    </form>
                    :
                    <div>
                        <div>
                            <p>Casual Name:</p>
                            {details.casualName ? <p>{details.casualName}</p> : <p>_________</p>}
                        </div>
                        <div>
                            <p>Mood:</p>
                            <p>{details.mood}</p>
                        </div>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile