import React, { useState, useEffect } from "react";
import logo from "../../assets/imgs/Airbnb-Logo-768x279.png"
import { IoIosClose } from 'react-icons/io';


export default function Toaster({ mensagem, hasClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }); // Tempo em milissegundos para o toaster desaparecer após 5 segundos

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div
      className={`fixed inset-0 flex w-screen h-screen items-center justify-center backdrop-blur transform ${
        visible ? "scale-0" : "scale-100"
      } transition-transform duration-500`}
    >
      <div className="bg-white z-50  text-black px-4  rounded flex flex-col items-center justify-center w-[30%] h-[40vh]">
        <header className="border-b-[1px] w-[100%] flex items-center justify-between  h-[20%] ">
           <div><img src={logo} alt=""  width={110} height={110}/></div>
           <div><IoIosClose size={28} onClick={()=>{hasClose(false)}} className="cursor-pointer"/></div>
        </header>
        <main className="h-[80%]  text-xl flex items-center justify-center  w-[100%]">
           {mensagem}
        </main>
      </div>
    </div>
  );
}
