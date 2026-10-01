import { useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

function App() {
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    return (
        <div className="app">
            <div hidden={selectedUser !== null}>
                <SearchBox
                    query={query}
                    onQueryChange={setQuery}
                />

                <UserList
                    query={query}
                    onSelectUser={setSelectedUser}
                />
            </div>

            {selectedUser && (
                <UserProfile
                    username={selectedUser}
                    onBack={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}



export default App;