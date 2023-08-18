import React, { useState } from "react";
import { useTema } from "../context/Contexto";

export default function FilterBar({ children }) {


    const {paisSelecioanaod,setPaisSelecioanado} = useTema()

    const handleSetCor = (pais) => {
        setPaisSelecioanado(pais)
    }

    return (
        <div className="w-screen items-center justify-center">
            <div className="flex flex-row gap-5 items-center justify-center ">
                <div className="flex flex-row  items-center gap-5 border-[1px] px-12  sm:w-[60vh] xl:w-[100vh] justify-between h-[6vh] rounded-full text-lg shadow-md transition hover:shadow-xl cursor-pointer">
                    <div onClick={()=>handleSetCor("Brazil")} className={`
                    ${paisSelecioanaod === "Brazil" ? 'text-rose-500' : ""}
                    `}>Brasil</div>
                    <div>|</div>
                    <div onClick={()=>handleSetCor("Estados Unidos")} className={`
                    ${paisSelecioanaod === "Estados Unidos" ? 'text-rose-500' : ""}
                    `}>Estados Unidos</div>
                    <div>|</div>
                    <div onClick={()=>handleSetCor("Canada")} className={`
                    ${paisSelecioanaod === "Canada" ? 'text-rose-500' : ""}
                    `}> Canada</div>
                    <div>|</div>
                    <div onClick={()=>handleSetCor("Inglaterra")}  className={`
                    ${paisSelecioanaod === "Inglaterra" ? 'text-rose-500' : ""}
                    `}>Inglaterra</div>
                </div>
            </div>
        </div>
    )
}