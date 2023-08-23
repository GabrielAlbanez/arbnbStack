import React, { useState, useEffect } from 'react'
import logo from "../../assets/imgs/Airbnb-Logo-768x279.png"
import { IoMdClose } from 'react-icons/io';
import Toaster from '../Toaster/Toaster';
import { useSessionLogin } from '../../context/SessionLogin';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function ModalLogin({ handleClose }) {

    

    const [visible, setVisible] = useState(true);
    const [showToas, setshowToas] = useState(false);
    const [toasterMessage, setToasterMEssage] = useState('')
    const {setisLoggedIn,setDataUser,dataUser} = useSessionLogin()
    const navigate = useNavigate()


    const [dataLogin, setDataLogin] = useState({
        email: "",
        senha: ""
    })


    const hanleInputChange = (e) => {
        const { name, value } = e.target;
        setDataLogin((data) => ({
            ...dataLogin,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:8080/Login", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataLogin),
                credentials : 'include'
            });

            const responseData = await response.json()
            setDataLogin({
                email: "",
                senha: ""
            })

            if ("error" in responseData) {
                setshowToas(true)
                setToasterMEssage(responseData.error)
            } else {
                setisLoggedIn(true)
                Cookies.set('name',decodeURIComponent(responseData.user.emailDatabase.name))
                Cookies.set('email',decodeURIComponent(responseData.user.emailDatabase.email))
                handleClose()
                navigate('/account')
            }
            console.log(responseData)
            
        }
        catch (error) {
            console.log(error)
        }
    }





    const closeToaster = () => {
        setshowToas(false)
    }

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            },);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <div className={`absolute z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50  transform ${visible ? "scale-0" : "scale-100"
            } transition-transform duration-500`}>
            <div className='bg-white w-[60vh] h-[70vh] rounded-md'>
                <header className='h-[10%] flex flex-row items-center border-b-[1px] justify-between px-10 '>
                    <div className=' '><img src={logo} alt="" height={100} width={100} /></div>
                    <div className='text-xl cursor-pointer' onClick={
                        handleClose

                    }  >
                        <IoMdClose />
                    </div>

                </header>
                <main className=' h-[88%]  '>
                    <div className='text-2xl flex items-end justify-center pt-7  h-[20%]'>Login</div>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-evenly  py-14 items-center w-[100%] h-[68%]'>

                        <div className='flex flex-col gap-2'>
                            <div><label htmlFor="ip1">E-Mail:</label></div>
                            <div className='w-[40vh] border-rose-500 border-[1px] flex items-center justify-center h-[50%] rounded-full transition shadow-rose-200 shadow-md hover:shadow-lg hover:shadow-rose-400 '><input name='email' value={dataLogin.email} onChange={hanleInputChange} type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>

                        </div>
                        <div className='flex flex-col gap-2'>
                            <div><label htmlFor="ip1">Password:</label></div>
                            <div className='w-[40vh] border-rose-500 border-[1px] flex items-center justify-center h-[50%] rounded-full transition shadow-rose-200 shadow-md hover:shadow-lg hover:shadow-rose-400 '><input name='senha' value={dataLogin.senha} onChange={hanleInputChange} type="password" placeholder='insira sua senha..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>

                        </div>

                        <div className='flex justify-between px-4 text-[14px] w-[70%] '>
                            <div>Lembrar</div>
                            <div>Esqueci minha Senha</div>
                        </div>
                        <div className='flex flex-col gap-2 pt-10 '>
                            <button type='submit' className='border-rose-500 rounded-full border-[1px] h-[4vh] w-[20vh] transition hover:text-white hover:bg-rose-500'>Logar</button>
                        </div>
                    </form>
                </main>

            </div>
            {showToas && (
                <Toaster
                    setVisible={setshowToas}
                    visible={showToas}
                    hasClose={closeToaster}
                    mensagem={toasterMessage}
                />
            )}
        </div>
    )
}




