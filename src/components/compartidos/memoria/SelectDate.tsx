import { createContext, useReducer, ReactNode, Dispatch } from "react";

// Definir el tipo para el estado y la acción
type Estado = string;
type Action = { tipo: string; value: string };
type Enviar = Dispatch<Action>;

// Definir el tipo para el contexto
type ContextType = { estado: Estado; enviar: Enviar };

// Crear el contexto con el tipo correcto
export const ActualDate = createContext<ContextType | undefined>(undefined);

type Date = {
  children: ReactNode;
};

const dateSelected: string = "";

// Reductor para manejar el estado
const reductor = (estado: Estado, accion: Action): Estado => {
  switch (accion.tipo) {
    case "update":
      return accion.value;
    default:
      return estado;
  }
};

function SelectDate({ children }: Date) {
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
