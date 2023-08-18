import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineUndo } from "react-icons/ai";
import { AiTwotoneStar } from "react-icons/ai";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./casaFiltrada.css";

export default function CasaFIltrada() {
  const { id } = useParams();
  const [click, setClick] = useState(false);

  const handleClickIcon = () => {
    setClick((click) => !click);
  };

  const [dataById, setDataById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHomeByid = async () => {
    try {
      const url = `http://localhost:3333/home/${id}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setDataById(responseData);
      setIsLoading(false);
    } catch (error) {
      console.log("erro ao obter dados");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHomeByid();
  }, []);

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
          <div className="border-[1px] h-[100vh] w-[60%] pt-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl ">{dataById.local}</h1>
              <div className="flex items-center gap-3 pr-5">
                <div className="flex flex-row items-center gap-3 w-[40%]">
                  <div className="flex gap-1 ">
                    <p>
                      <AiTwotoneStar size={20} />
                    </p>
                    {/*esse numero de avalição vai ser passado pelo json*/}
                    <p>4,99</p>
                  </div>
                  {/*esse numero de comentarios vai ser passado pelo json*/}
                  <p>109 comentarios</p>
                  <p>{dataById.pais}</p>
                </div>
                <div className=" w-[60%] flex items-center justify-end">
                  <div className="flex gap-2 items-center">
                    <p>Salvar</p>
                    <div onClick={handleClickIcon} >
                      {click === false ? (
                        <AiOutlineHeart size={25} />
                      ) : (
                        <AiFillHeart size={25} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-[1px] h-[60vh]">
                <img src={dataById.imagens.img1} alt=""  className="rounded-md h-[60vh] w-[60vh] object-cover"/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
