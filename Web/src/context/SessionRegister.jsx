import { createContext,useContext,useState } from "react";


const SessionRegister = createContext()


export default function RegisetrProvider({children}){
  const [isRegisterIn,setisRegisterIn] = useState(false)
    
  return (
    <SessionRegister.Provider value={{isRegisterIn,setisRegisterIn}}>
         {children}
    </SessionRegister.Provider>
  )
}

export function useSessionRegister(){
    return useContext(SessionRegister)
}