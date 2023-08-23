import React, { useEffect, useState } from "react";
import logo from "../../assets/imgs/Airbnb-Logo-768x279.png";
import { IoMdClose } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import Toaster from "../Toaster/Toaster";
import { useSessionRegister } from "../../context/SessionRegister";

export default function ModalPerfil({ handleClose, children }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      });

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <>
      <div
        className={`absolute z-50  inset-0 flex items-center justify-center bg-black bg-opacity-50  transform ${
          visible ? "scale-0" : "scale-100"
        } transition-transform duration-500`}
      >
        <div className="bg-white w-[60vh] h-[70vh] rounded-md">
          <header className="h-[10%] flex flex-row items-center border-b-[1px] justify-between px-10 ">
            <div className=" ">
              <img src={logo} alt="" height={100} width={100} />
            </div>
            <div className="text-xl cursor-pointer" onClick={handleClose}>
              <IoMdClose />
            </div>
          </header>
          <main className=" h-[88%]  ">
            <div className="text-2xl flex items-end justify-center pt-7  h-[10%]">
              <p>
                <BsPerson size={40} color="gray" />
              </p>
            </div>
            <div className="flex items-center justify-center">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
