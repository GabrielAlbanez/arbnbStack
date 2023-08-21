import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import Nabar from "../components/Nabar";
import Contatos from "../screens/Contatos";
import Account from "../screens/Account";
import Produtos from "../screens/Produtos";
import CasaFIltrada from "../components/CasaFiltrada/CasaFIltrada";



export default function Rotas() {
  const [tema,setTema] = useState('escuro')
  return (
    <BrowserRouter >
      <Nabar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/produtos" element={<Produtos/>}/>
        <Route path="/contatos" element={<Contatos/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/casa/:id" element={<CasaFIltrada/>}/>
      </Routes>
    </BrowserRouter>
  );
}
