import { createContext, useState , useContext} from "react";

const Tema = createContext();

export default function PaisProvider({ children }) {
  const [paisSelecioanaod, setPaisSelecioanado] = useState(null);
  return (
    <Tema.Provider value={{ paisSelecioanaod, setPaisSelecioanado }}>{children}</Tema.Provider>
  );


}

  export function useTema(){
    return useContext(Tema)
  }
