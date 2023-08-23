import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionLogin } from '../context/SessionLogin'

export default function Account() {

  const { isLoggedIn, setisLoggedIn, dataUser, setDataUser } = useSessionLogin()
  const navigate = useNavigate()


   
 





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
