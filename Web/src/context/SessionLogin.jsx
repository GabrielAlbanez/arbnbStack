import { useEffect } from "react";
import { createContext,useContext,useState } from "react";


const SessionLogin = createContext()


export default function LoginProvider({children}){
  const [isLoggedIn,setisLoggedIn] = useState(false)
  const [dataUser,setDataUser] = useState(null)



  



    
  return (
    <SessionLogin.Provider value={{isLoggedIn,setisLoggedIn,dataUser,setDataUser}}>
         {children}
    </SessionLogin.Provider>
  )
}

export function useSessionLogin(){
    return useContext(SessionLogin)
}