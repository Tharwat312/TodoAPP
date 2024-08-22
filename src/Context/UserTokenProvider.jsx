import React, { createContext, useEffect, useState } from 'react'
export const UserToken = createContext("");
const UserTokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const localToken = localStorage.getItem("UserToken");
    useEffect(() => {
        localToken !== null && setToken(localToken);
        setToken(localToken);
    }, []);
    return <>
        <UserToken.Provider value={{ token, setToken }}>
            {children}
        </UserToken.Provider>
    </>
}

export default UserTokenProvider