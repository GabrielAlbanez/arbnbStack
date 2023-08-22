import React, { useEffect } from "react";
import logo from "../../assets/imgs/Airbnb-Logo-768x279.png";
import { IoIosClose } from 'react-icons/io';

export default function Toaster({ mensagem, hasClose, visible }) {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        hasClose(); 
      }, 2000);
    }
  }, [visible]);

  return (
    <div
    className={`fixed bottom-0 right-0 p-1 mb-5 transform  z-50
    } transition-transform duration-500 ease-in-out bg-red-400`}
  >
      <div className="bg-white z-50 text-black px-4 py-4 rounded flex flex-col items-center justify-center w-[50vh] h-[100%]">
        <header className="border-b-[1px] w-[100%] flex items-center justify-between h-[20%]">
           <div><img src={logo} alt="" width={90} height={90} /></div>
           <div><IoIosClose size={28} onClick={hasClose} className="cursor-pointer" /></div>
        </header>
        <main className="h-[80%] text-xl flex items-center justify-center w-[100%]">
           {mensagem}
        </main>
      </div>
    </div>
  );
}
