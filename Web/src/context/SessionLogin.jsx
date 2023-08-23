import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';


const SessionLogin = createContext()


export default function LoginProvider({ children }) {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [dataUser, setDataUser] = useState(null)


  useEffect(() => {
    // Verificar se os cookies "name" e "email" existem
    const name = Cookies.get("name");
    const email = Cookies.get("email");

    // Se ambos os cookies existirem, definir isLoggedIn como true
    if (name || email) {

      setisLoggedIn(true);
    }
  }, []);


  useEffect(() => {
    // Atualizar o localStorage quando isLoggedIn muda
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    // Obter o valor do localStorage e atualizar isLoggedIn
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setisLoggedIn(storedIsLoggedIn);
    }
  }, []);







  return (
    <SessionLogin.Provider value={{ isLoggedIn, setisLoggedIn, dataUser, setDataUser }}>
      {children}
    </SessionLogin.Provider>
  )
}

export function useSessionLogin() {
  return useContext(SessionLogin)
}