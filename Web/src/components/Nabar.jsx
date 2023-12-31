import logo from "../assets/imgs/Airbnb-Logo-768x279.png";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import LinkPersonalizado from "./Link";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import { useSessionRegister } from "../context/SessionRegister";
import Toaster from "./Toaster/Toaster";
import { useSessionLogin } from "../context/SessionLogin";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import ModalPerfil from "./Modal/ModalPerfil";
import { useTema } from "../context/Contexto";
import "./navbar.css"
export default function Nabar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModalLogin, setShowModalViewLogin] = useState(false);
  const [showModalRegister, setShowModalViewRegister] = useState(false);
  const { showModalPerfil, setShowModalPeril } = useTema()
  const [visible, setVisible] = useState(true);
  const [showToas, setshowToas] = useState(true);
  const { isLoggedIn, setisLoggedIn, imgCliente, setImgCliente } = useSessionLogin();


  const closeToaster = () => {
    setshowToas(false);
  };

  const { isRegisterIn, setisRegisterIn } = useSessionRegister();

  const openMeu = () => {
    setIsOpen((valor) => !valor);
  };

  const handleOpenModal = (name) => {
    name === "Login"
      ? setShowModalViewLogin(true)
      : setShowModalViewRegister(true);
  };

  const handleCloseModal = (name) => {
    name === "Login"
      ? setShowModalViewLogin(false)
      : setShowModalViewRegister(false);
  };

  const setCokies = () => {
    Cookies.remove("name");
    Cookies.remove("email");
    setisLoggedIn(false);
    window.location.reload();


  };
  const name = Cookies.get("name");
  const email = Cookies.get("email");


  const getImgPerfil = async () => {


    try {
      const data = { email };
      const dataJson = JSON.stringify(data)
      const response = await fetch("http://localhost:8080/imgPerfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson, 
      });

      const responseData = await response.json()
       setImgCliente(responseData)
      console.log(responseData)
    } catch (error) {
      console.log(error);
    }
  };








  useEffect(() => {
    if(name && email){
      getImgPerfil()
    }

  }, [imgCliente])


  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      });

      return () => clearTimeout(timer);
    }
  }, [visible]);


  useEffect(() => {
    if (showModalLogin || showModalPerfil || showModalRegister) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showModalLogin,showModalPerfil,showModalRegister]);





  


  return (
    <div>
      <div
        className={`w-screen border-b-[1px] h-[9vh] flex items-center justify-between p-8 transform ${visible ? "scale-0" : "scale-100"
          } transition-transform duration-1000`}
      >
        <LinkPersonalizado caminho={"/"}>
          {" "}
          <img src={logo} alt="" height={130} width={130} />{" "}
        </LinkPersonalizado>

      
        {name && email ? (
          <>
            <div className="flex gap-4 items-center rounded-full border-[1px] py-2 px-2 shadow-md cursor-pointer transition hover:shadow-xl hover:shadow-zinc-300 ">
              {imgCliente?.img ? (
                <img src={imgCliente.img}  className="object-cover w-[50px] h-[50px] rounded-full " onClick={() => setShowModalPeril(true)}/>
              ) : (
                <BsPerson size={30} onClick={() => setShowModalPeril(true)} />
              )}


            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="">
              <div className="flex flex-row gap-10 items-center">
                <div onClick={openMeu} className="flex  gap-12">
                  <button
                    onClick={() => handleOpenModal("Login")}
                    className="border-rose-500 border-[1px] rounded-md w-[10vh] h-[4vh]  transition shadow-md  hover:shadow-xl"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleOpenModal("Registro")}
                    className="border-rose-500 border-[1px] rounded-md w-[10vh] h-[4vh]  transition  shadow-md  hover:shadow-xl"
                  >
                    Registro
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {showModalPerfil && (
        <>
          {" "}
          <ModalPerfil handleClose={() => setShowModalPeril(false)}>
            <div className="flex items-center flex-col">
              <div className="flex flex-col items-center h-[45vh] justify-center gap-32">
                <div><Link to={`/Favorite/${email}`}><p className="text-xl">Your Favorite</p></Link></div>
                <div><Link to={'/account'}><p className="text-xl">conta</p></Link></div>
              </div>
              <div className="w-[60vh] border-t-[1px] flex items-center justify-center h-[10vh]">
                <button
                  onClick={setCokies}
                  className="border-rose-500 border-[1px] rounded-md w-[10vh] h-[4vh]  transition  shadow-md  hover:shadow-xl"
                >
                  Logout
                </button>
              </div>
            </div>
          </ModalPerfil>
        </>
      )}

      {showModalLogin && (
   
          <ModalLogin
            close={showModalLogin}
            setClose={setShowModalViewLogin}
            handleClose={() => handleCloseModal("Login")}
          />

      )}

      {showModalRegister && (
        <>
          <ModalRegister handleClose={() => handleCloseModal("Registro")} />
        </>
      )}

      {isRegisterIn && (
        <div className="h-1/2 w-screen">
          {showToas && (
            <Toaster
              setVisible={setshowToas}
              visible={showToas}
              hasClose={closeToaster}
              mensagem={"Registro realizado com sucesso"}
            />
          )}

          <ModalLogin
            handleClose={() => {
              setisRegisterIn(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
