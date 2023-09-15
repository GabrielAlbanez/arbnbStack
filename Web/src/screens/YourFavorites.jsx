import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTema } from "../context/Contexto";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "../hooks/query";
import CarrouselImg from "../components/CarrouselImg";
import { IoMdPin } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";

export default function YourFavorites() {
  const name = Cookies.get("name");
  const emaill = Cookies.get("email");
  const navigate = useNavigate();
  const { showModalPerfil, setShowModalPeril } = useTema();
  const local = useLocation();
  const [favorite, setFavorite] = useState([]);

  const { email } = useParams();

  console.log(email);

  useEffect(() => {
    if (!name && !emaill) {
      navigate("/");
    }



    if (local.pathname == `/Favorite/${email}`) {
      setShowModalPeril(false);
    }
  }, []);

  useEffect(() => {
    const fechtFavorites = async () => {
      try {
        const response = await fetch(
          `http://10.53.49.43:8080/userFavorite/${email}`,
          {
            cache: "no-store",
            method: "GET",
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setFavorite(responseData);
          console.log(favorite);
         // Aqui o estado já foi atualizado corretamente
        } else {
          console.log("Erro na requisição");
        }
      } catch (error) {
        console.log("erro ao obter dados");
      }
    };
    fechtFavorites();
  }, [favorite]);

  return (
    <>
      {name && emaill && (
        <div className="flex flex-col gap-10 pt-10 flex-wrap items-center justify-center  w-screen py-10">
          <h1 className="text-2xl p-10 flex flex-row items-center gap-4">
            Your Favoites <AiOutlineHeart size={30} color="red" />
          </h1>
          <div className="flex gap-10 flex-wrap">
            {favorite.map((casas) => (
              <div
                key={casas.id}
                className="shadow-2xl  aspect-square rounded-xl bg-center   "
              >
                {/* <div>
          <img src={casas.imagens.img1} alt="" height={400} width={400} className="rounded-md" />
        </div> */}
                <div
                  className="flex justify-start items-start flex-col
               "
                >
                  <CarrouselImg id={casas.id} imagens={casas.imagens} />
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
                  <Link to={`/favoriteHome/${casas.id}`}>
                    <div className="text-lg flex gap-2 items-center">
                      {" "}
                      <BsEyeFill /> ver mais..
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
