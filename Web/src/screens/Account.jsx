import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionLogin } from '../context/SessionLogin'

export default function Account() {

  const { isLoggedIn, setisLoggedIn, dataUser, setDataUser } = useSessionLogin()
  const navigate = useNavigate()

  console.log(isLoggedIn)


  


  const data = []

  useEffect(()=>{

    if(!isLoggedIn){
      setTimeout(()=>{
        navigate('/')

      },3000)
    } else {
     data.push(dataUser.user.emailDatabase.name)
     data.push(dataUser.user.emailDatabase.email)
     data.push(dataUser.token)
     const token = dataUser.token
     localStorage.setItem("authToken",token)
     console.log(data)
    }

  },[isLoggedIn])

  return (
    <div className='text-3xl p-8'>
      {
        isLoggedIn ? (
          <>
            <h1>Wlcome : {dataUser.user.emailDatabase.name}</h1>
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
