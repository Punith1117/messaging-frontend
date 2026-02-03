import styled from "styled-components"

const AppDetails = () => {
    return (
        <Wrapper>
            <div className="content">
                <h1>Messaging</h1>
                <ul>
                    <li>Search for users through username</li>
                    <li>Start a conversation by sending a chat invite</li>
                    <li>Block/Unblock conversation</li>
                    <li>Customize your profile - Casual name, Mood</li>
                </ul>
                <a 
                    href="https://github.com/Punith1117/messaging-frontend" 
                    target="_blank"
                    rel="noopener noreferrer"
                >by Punith1117</a>
            </div>
        </Wrapper>
    )
}

export default AppDetails

const Wrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: linear-gradient(#745ef058, #8F5EF0, #685EF0);
    color: white;

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
    }

    h1 {
        font-size: 40px;
    }

    ul {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 20px; 
    }

    a {
        color: white;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        min-height: 40vh;
        padding: 1rem;
    }
`