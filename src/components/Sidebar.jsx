import ChatList from "./ChatList"
import Header from "./Header"
import Searchbar from "./Searchbar"

const Sidebar = () => {
    return (
        <div>
            <Header />
            <Searchbar />
            <ChatList />
        </div>
    )
}

export default Sidebar