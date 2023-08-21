import { createContext,useContext,useState } from "react";


const SessionLogin = createContext()


export default function LoginProvider({children}){
  const [isLoggedIn,setisLoggedIn] = useState(false)
    
  return (
    <SessionLogin.Provider value={{isLoggedIn,setisLoggedIn}}>
         {children}
    </SessionLogin.Provider>
  )
}

export function useSessionLogin(){
    return useContext(SessionLogin)
}