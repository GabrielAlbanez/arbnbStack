import React, { useEffect, useState } from "react";
import CarrouselImg from "../components/CarrouselImg";
import { AiOutlineUndo } from "react-icons/ai";
import { IoMdPin } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import FilterBar from "../components/FilterBar";
import { useTema } from "../context/Contexto";
import { Link } from "react-router-dom";

import ModalLogin from "../components/Modal/ModalLogin";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { paisSelecioanaod } = useTema();
  const [visible, setVisible] = useState(true);

  const fetchData = () => {
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:8080/casas", {
          cache: "default",
        });
        if (!response.ok) {
          throw new Error("Erro ao obter os dados.");
        }
        const responseData = await response.json();
        const homes = responseData;
        setData(homes);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro na requisição:", error);
        setIsLoading(false);
      }
    }, [2000]);
  };

  const dataFiltrado = data.filter((casas) => casas.pais === paisSelecioanaod);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      });

      return () => clearTimeout(timer);
    }
  }, [visible]);

  console.log(data);
  console.log(paisSelecioanaod);

  return (
    <div
      className={`w-screen pt-10  transform ${
        visible ? "scale-0" : "scale-100"
      } transition-transform duration-1000`}
    >


      <FilterBar />
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center  flex-col h-[70vh] gap-2">
            <h1>Loading</h1>
            <button className="pl-4">
              <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                <AiOutlineUndo size={20} />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-10 pt-10 flex-wrap items-center justify-center  w-screen py-10">
            {paisSelecioanaod === null ? (
              <>
                {data.map((casas) => (
                  <div
                    key={casas.id}
                    className="shadow-2xl aspect-square rounded-xl bg-center  "
                  >
                    {/* <div>
                <img src={casas.imagens.img1} alt="" height={400} width={400} className="rounded-md" />
              </div> */}
                    <div>
                      {/* <Link to={`/casas/${casas.id}`}> */}
                      <CarrouselImg id={casas.id} imagens={casas.imagens} />
                      {/* </Link> */}
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                      <div className="text-lg">
                        <p>${casas.price} por noite</p>
                      </div>
                      <div className="text-lg flex flex-row items-center">
                        <IoMdPin size={18} />
                        {casas.Local}
                      </div>
                      <div className="text-lg">{casas.pais}</div>
                      <Link to={`/casa/${casas.id}`}>
                        <div className="text-lg flex gap-2 items-center">
                          {" "}
                          <BsEyeFill /> ver mais..
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {dataFiltrado.map((casas) => (
                  <div
                    key={casas.id}
                    className="shadow-2xl aspect-square rounded-xl bg-center "
                  >
                    {/* <div>
                <img src={casas.imagens.img1} alt="" height={400} width={400} className="rounded-md" />
              </div> */}
                    <div>
                      {/* <Link to={`/casas/${casas.id}`}> */}
                      <CarrouselImg id={casas.id} imagens={casas.imagens} />
                      {/* </Link> */}
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                      <div className="text-lg">
                        <p>${casas.price} por noite</p>
                      </div>
                      <div className="text-lg flex flex-row items-center">
                        <IoMdPin size={20} />
                        {casas.Local}
                      </div>
                      <div className="text-lg">{casas.pais}</div>
                      <Link to={`/casa/${casas.id}`}>
                        <div className="text-lg flex gap-2 items-center">
                          {" "}
                          <BsEyeFill /> ver mais...
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
