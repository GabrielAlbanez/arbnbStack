import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSessionLogin } from '../context/SessionLogin'
import { useTema } from '../context/Contexto'

export default function Account() {
  
  const { isLoggedIn, setisLoggedIn, dataUser, setDataUser } = useSessionLogin()
  const navigate = useNavigate()
  const {showModalPerfil, setShowModalPeril} = useTema()
  const local = useLocation()
  console.log(local.pathname)



   
 





  useEffect(()=>{

    if(!name && !email){
        navigate('/')
    } else {

      setDataUser({
        name : Cookies.get('name'),
        email : Cookies.get('email')
      })
      setisLoggedIn(true)
        
    }

    
  console.log(isLoggedIn)

  },[isLoggedIn])

  useEffect(()=>{
    if(local.pathname == '/account'){
      setShowModalPeril(false)
    }

  },[])


  const name = Cookies.get("name");
  const email = Cookies.get("email");

  return (
    <div className='text-3xl p-8'>
      {
        name && email ? (
          <>
            <h1>Welcome : {dataUser?.name}</h1>
            <h1>email : {dataUser?.email}</h1>
          </>
        ) : (
          <>
          <h1>vc n esta logado para acessar essa pagina</h1>
          </>
        )
      }
    </div>
  )
}
