import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserDetails } from "../api/userQueries"
import sadIcon from "../assets/sad.png"
import angryIcon from "../assets/angry.png"
import happyIcon from "../assets/happy.png"
import neutralIcon from "../assets/neutral.png"
import styled from "styled-components"

const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            setLoading(true)
            const data = await getUserDetails(userId)
            if (data === 401) {
                navigate('/login', {replace: true})
                return                
            } else if (data === 404) {
                navigate('/') // page not found
                return
            }
            setUser(data)
        } catch (err) {
            navigate('/login', {replace: true})
            return                
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [userId])

    if (loading) return <Wrapper>Loading user details...</Wrapper>
    if (!user) return <Wrapper>User not found</Wrapper>

    return (
        <Wrapper>
            <LeftColumn>
                <p className="username">{user.username}</p>
                {user.casualName && (
                    <p className="casual-name">{user.casualName}</p>
                )}
            </LeftColumn>

            {user.mood && (
                <Mood $mood={user.mood} >{user.mood}</Mood>
            )}
        </Wrapper>
    )
}

export default UserDetails

const moodBgMap = {
    sad: sadIcon,
    angry: angryIcon,
    happy: happyIcon,
    neutral: neutralIcon,
}

const Wrapper = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
        margin: 0;
    }

    .username {
        font-size: 20px;
        font-weight: 600;
    }

    .casual-name {
        font-weight: 600;
        color: #8f8f8f;
    }
`;

const Mood = styled.div`
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    color: transparent;
    background-image: ${({ $mood }) =>
        $mood ? `url(${$mood && moodBgMap[$mood]})` : "none"};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50px 50px;

    background-color: #f7e3ff;
`;