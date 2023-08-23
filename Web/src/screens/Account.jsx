import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionLogin } from '../context/SessionLogin'

export default function Account() {

  const { isLoggedIn, setisLoggedIn, dataUser, setDataUser } = useSessionLogin()
  const navigate = useNavigate()

  console.log(isLoggedIn)


  



  useEffect(()=>{

    if(!isLoggedIn){
      setTimeout(()=>{
        navigate('/')

      })
    } else {
        
    }

  },[isLoggedIn])
  console.log(dataUser)
  return (
    <div className='text-3xl p-8'>
      {
        isLoggedIn ? (
          <>
            <h1>Welcome : {dataUser?.user?.emailDatabase?.name}</h1>
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
