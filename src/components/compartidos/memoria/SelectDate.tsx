import { createContext, useReducer } from "react";
import { childrenContext, ContextDate, Estado, Action } from "../../../interfaces";


// Crear el contexto con el tipo correcto
export const ActualDate = createContext<ContextDate | undefined>(undefined);

const dateSelected: string = "";

// Reductor para manejar el estado
const reductor = (estado: Estado, action: Action): Estado => {
  switch (action.tipo) {
    case "update":
      return action.value;
    default:
      return estado;
  }
};

function SelectDate({ children }: childrenContext) {
  // Usar useReducer para manejar el estado
  const [estado, enviar] = useReducer(reductor, dateSelected);

  return (
    <>
      {/* Proveedor de contexto con el valor correcto */}
      <ActualDate.Provider value={{ estado, enviar }}>
        {children}
      </ActualDate.Provider>
    </>
  );
}

export default SelectDate;
