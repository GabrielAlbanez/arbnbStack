import logo from "../assets/imgs/Airbnb-Logo-768x279.png";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import LinkPersonalizado from "./Link";
import ModalRegister from "./Modal/ModalRegister";
import ModalLogin from "./Modal/ModalLogin";
import { useSessionRegister } from "../context/SessionRegister";
import Toaster from "./Toaster/Toaster";
import { useSessionLogin } from "../context/SessionLogin";
export default function Nabar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModalLogin, setShowModalViewLogin] = useState(false);
  const [showModalRegister, setShowModalViewRegister] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showToas, setshowToas] = useState(true);
  const { isLoggedIn } = useSessionLogin();
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

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      });

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div>
      <div
        className={`w-screen border-b-[1px] h-[9vh] flex items-center justify-between p-8 transform ${
          visible ? "scale-0" : "scale-100"
        } transition-transform duration-1000`}
      >
        <LinkPersonalizado caminho={"/"}>
          {" "}
          <img src={logo} alt="" height={130} width={130} />{" "}
        </LinkPersonalizado>

        <div className="hidden sm:block pl-16">
          <div
            className=" flex items-center justify-between w-[35vh] 
      h-[4vh] px-4 shadow-md transition hover:shadow-xl border-[1px] rounded-full"
          >
            <div className="flex flex-row items-center justify-between w-[100%] cursor-pointer">
              <p className="">comece sua busca</p>
              <div className="rounded-full flex items-center">
                <CiSearch size={23} className="bg-white" />
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn ? (
          <>
            <h1>conta</h1>
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
      {showModalLogin && (
        <>
          <ModalLogin
            close={showModalLogin}
            setClose={setShowModalViewLogin}
            handleClose={() => handleCloseModal("Login")}
          />
        </>
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
