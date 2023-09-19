import React, { useEffect, useState } from "react";
import logo from "../../assets/imgs/Airbnb-Logo-768x279.png";
import { IoMdClose } from "react-icons/io";
import Toaster from "../Toaster/Toaster";
import { useSessionRegister } from "../../context/SessionRegister";


export default function ModalLogin({ handleClose }) {
  const [visible, setVisible] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    cpf: "",
    name: "",
  });
  const [isRegister, setIsregister] = useState(false);
  const [showToas, setshowToas] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const { setisRegisterIn } = useSessionRegister();
  const closeToaster = () => {
    setshowToas(false);
  };

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      });

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/userC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      setFormData({
        email: "",
        senha: "",
        cpf: "",
        name: "",
      });
      if ("error" in responseData) {
        setshowToas(true);
        setToasterMessage(responseData.error);
      } else {
        handleClose();

        setisRegisterIn(true);
      }
      console.log(responseData);
      console.log(formData);
      console.log(isRegister);
    } catch (error) {
      console.log(error);
    }
  };

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
              Registro
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-evenly  gap-3 items-center w-[100%] h-[88%]"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="ip1">E-Mail:</label>
                </div>
                <div className="w-[40vh] border-rose-500 border-[1px] flex items-center justify-center h-[50%] rounded-full transition shadow-rose-200 shadow-md hover:shadow-lg hover:shadow-rose-400 ">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="ip1">Password:</label>
                </div>
                <div className="w-[40vh] border-rose-500 border-[1px] flex items-center justify-center h-[50%] rounded-full transition shadow-rose-200 shadow-md hover:shadow-lg hover:shadow-rose-400 ">
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="insira sua senha.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="ip1">cpf:</label>
                </div>
                <div className="w-[40vh] border-rose-500 border-[1px] flex items-center justify-center h-[50%] rounded-full transition shadow-rose-200 shadow-md hover:shadow-lg hover:shadow-rose-400 ">
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="insira sua senha.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="ip1">Name:</label>
                </div>
                <div className="w-[40vh] border-rose-500 border-[1px] flex items-center justify-center h-[50%] rounded-full transition shadow-rose-200 shadow-md hover:shadow-lg hover:shadow-rose-400 ">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="insira sua senha.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt- ">
                <button
                  type="submit"
                  className="border-rose-500 rounded-full border-[1px] h-[4vh] w-[20vh] transition hover:text-white hover:bg-rose-500"
                >
                  Registrar
                </button>
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
    </>
  );
}
