import React, { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function CarrouselImg({ imagens }) {
  const [contador, setContador] = useState(0);
  
  const imgParce = JSON.parse(imagens)

  console.log(imgParce[0])

  const avançar = () => {
    setContador((prevContador) => (prevContador + 1) % imgParce.length);
  };

  const voltar = () => {
    setContador(
      (prevContador) => (prevContador - 1 + imgParce.length) % imgParce.length
    );
  };

  return (
    <div
      style={{
        width: `20rem`,
        maxWidth: `30rem`,
        height: `20rem`,
        position: "relative",
        overflow: "hidden",
      }}
      className="rounded-xl mx-auto"
    >
      <img
        src={imgParce[contador]}
        alt="Imagem"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: `20rem`,
          padding: "1rem",
          position: "relative",
        }}
      >
        <div onClick={voltar} className="bg-white rounded-full p-2">
          <GrFormPrevious size={30} />
        </div>
        <div onClick={avançar} className="bg-white rounded-full p-2">
          <GrFormNext size={30} />
        </div>
      </div>
    </div>
  );
}
