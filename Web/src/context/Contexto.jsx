import { createContext, useState , useContext} from "react";

const Tema = createContext();

export default function PaisProvider({ children }) {
  const [paisSelecioanaod, setPaisSelecioanado] = useState(null);
  const [showModalPerfil, setShowModalPeril] = useState(false)
  return (
    <Tema.Provider value={{ paisSelecioanaod, setPaisSelecioanado,showModalPerfil,setShowModalPeril }}>{children}</Tema.Provider>
  );


}

  export function useTema(){
    return useContext(Tema)
  }
