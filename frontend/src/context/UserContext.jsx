import React from "react";
import { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);

    return (
        <UserContext.Provider
            value={{
                user,
                isLogin,
                setUser,
                setIsLogin
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };