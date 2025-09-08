import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const storedUser = JSON.parse(sessionStorage.getItem('user'))
        console.log(`while refreshing: ${storedUser}`)
        if(storedUser){
            setUser(storedUser)
            setIsLoggedIn(true)
        }
        setLoading(false)
    },[])

    const login = (userData) => {
        setIsLoggedIn(true)
        setUser(userData)
        sessionStorage.setItem("user",JSON.stringify(userData))
    }

    const logout = () => {
        setIsLoggedIn(false)
        setUser(null)
        sessionStorage.removeItem("user")
    }

    return (
        <SessionContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
            {children}
        </SessionContext.Provider>
    )
}