import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineUndo } from "react-icons/ai";
import { AiTwotoneStar } from "react-icons/ai";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./casaFiltrada.css";
import { useSessionLogin } from "../../context/SessionLogin";
import Toaster from "../Toaster/Toaster";
import Cookies from "js-cookie";


export default function CasaFIltrada() {
  const { id } = useParams();
  localStorage.setItem('clik', false)
  const [click, setClick] = useState(false);
  const [showToas, setshowToas] = useState(false);
  const closeToaster = () => {
    setshowToas(false);
  };

  const name = Cookies.get("name");
  const email = Cookies.get("email");

  const verifyLogin = () => {
    if (name && email) {
      setClick((click) => !click);
    } else {
      setshowToas(true);

      console.log(showToas);
    }
  };

  const [dataById, setDataById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHomeByid = async () => {
    try {
      const url = `http://localhost:8080/casa/${id}`;
      const response = await fetch(url, {
        cache: "no-store",
      });
      const responseData = await response.json();
      const homeFilter = responseData;
      setDataById(homeFilter);
      setIsLoading(false);
    } catch (error) {
      console.log("erro ao obter dados");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHomeByid();
  }, []);


  const markFavorite = async () => {
    try {
      const response = await fetch("http://localhost:8080/MarkFavorite", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, id }),
      });

      const responseData = await response.json()
      // setClick(true)

    }
    catch (error) {
      console.log(error)
    }
    setshowToas(true)
  }

  const imagensArray = dataById.data ? JSON.parse(dataById.data.imagens) : [];

  return (
    <div>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center  flex-col h-[70vh] gap-2  ">
            <h1>Loading</h1>
            <button className="pl-4">
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              >
                <AiOutlineUndo size={20} />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <div
          className="w-screen h-[100vh] flex justify-center "
          style={{ animation: "slideOutToTop 0.8s " }}
        >
          <div className="h-[100vh] w-[80%] pt-10">
            {showToas && (
              <Toaster
                setVisible={setshowToas}
                visible={showToas}
                hasClose={closeToaster} // Usar a função closeToaster para fechar o Toaster
                mensagem={'Você precisa estar logado'}
              />
            )}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl ">{dataById.data.Local}</h1>
              <div className="flex items-center gap-3 pr-5">
                <div className="flex flex-row items-center gap-3 w-[40%]">
                  <div className="flex gap-1 ">
                    <p>
                      <AiTwotoneStar size={20} />
                    </p>
                    {/*esse numero de avalição vai ser passado pelo json*/}
                    <p>{dataById.data.avaiation}</p>
                  </div>
                  {/*esse numero de comentarios vai ser passado pelo json*/}
                  <p>109 comentarios</p>
                  <p>{dataById.data.pais}</p>
                </div>
                <div className=" w-[60%] flex items-center justify-end">
                  <div className="flex gap-2 items-center">
                    <p>Salvar</p>
                    <div onClick={verifyLogin} className="cursor-pointer">
                      {!click ? (

                        <AiOutlineHeart onClick={markFavorite} size={25} />

                      ) : (
                        <AiFillHeart size={25} />

                      )}
                
                    </div>
                    {showToas && (
              <Toaster
                setVisible={setshowToas}
                visible={showToas}
                hasClose={closeToaster} // Usar a função closeToaster para fechar o Toaster
                mensagem={'Casa Favoritada'}
              />
            )}
                  </div>
                </div>
              </div>
              <div className=" h-[60vh] flex gap-2">
                <img
                  src={imagensArray[0]}
                  alt=""
                  className="rounded-md h-[60vh] w-[80vh] object-cover"
                />
                <div className="flex gap-2">
                  <img
                    src={imagensArray[1]}
                    alt=""
                    className="rounded-md h-[60vh] w-[37vh] object-cover"
                  />
                  <img
                    src={imagensArray[2]}
                    alt=""
                    className="rounded-md h-[60vh] w-[37vh] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
